import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { defineString } from "firebase-functions/params";
import type { PaymentRequestData } from "./payment.model";
import { logger } from "firebase-functions";
import { getFirestore } from "firebase-admin/firestore";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";

const siteUrl = defineString("SITE_URL");
const webhookUrl = defineString("MERCADOPAGO_WEBHOOK_URL");
const secretsClient = new SecretManagerServiceClient();

function resolveProjectId(): string {
  return process.env["GCLOUD_PROJECT"] || process.env["GOOGLE_CLOUD_PROJECT"] || "";
}

let cachedAccessToken: string | null = null;

async function resolveAccessTokenFromSecret(secretName: string): Promise<string> {
  if (cachedAccessToken) return cachedAccessToken;
  const projectId = resolveProjectId();
  if (!projectId) {
    throw new Error("No se pudo resolver el proyecto para leer Secret Manager.");
  }

  try {
    const [version] = await secretsClient.accessSecretVersion({
      name: `projects/${projectId}/secrets/${secretName}/versions/latest`,
    });
    cachedAccessToken = version.payload?.data?.toString().trim() || "";
    return cachedAccessToken;
  } catch (error) {
    logger.warn(`No se pudo leer el secreto ${secretName} de Secret Manager. Se intentará usar fallback:`, error);
    return "";
  }
}

async function getMercadoPagoRuntimeConfig(tenantId?: string): Promise<{ accessToken: string; webhook: string }> {
  const db = getFirestore();

  // Multi-tenant path: tenants/{tenantId}/configuracion/store
  // Legacy/fallback path: settings/storeConfig
  let mpConfig: Record<string, any> | undefined;

  if (tenantId) {
    const tenantConfigSnap = await db
      .collection("tenants")
      .doc(tenantId)
      .collection("configuracion")
      .doc("store")
      .get();
    const tenantData = tenantConfigSnap.exists ? (tenantConfigSnap.data() as Record<string, any>) : null;
    mpConfig = tenantData?.["payments"]?.["mercadoPago"] as Record<string, any> | undefined;

    if (!mpConfig) {
      // Fallback: try legacy configuracion/store (for dedicated-project stores)
      const legacySnap = await db.collection("configuracion").doc("store").get();
      const legacyData = legacySnap.exists ? (legacySnap.data() as Record<string, any>) : null;
      mpConfig = legacyData?.["payments"]?.["mercadoPago"] as Record<string, any> | undefined;
    }
  } else {
    // Legacy fallback for backwards compatibility
    const configSnap = await db.collection("settings").doc("storeConfig").get();
    const data = configSnap.exists ? configSnap.data() as Record<string, any> : null;
    mpConfig = data?.["payments"]?.["mercadoPago"] as Record<string, any> | undefined;
  }

  const secretName = String(mpConfig?.["accessTokenSecret"] || "").trim();
  const tokenFromSecret = secretName ? await resolveAccessTokenFromSecret(secretName) : "";
  const accessToken = (tokenFromSecret || mpConfig?.["accessToken"] || "").trim();
  const webhook = (mpConfig?.["webhookUrl"] || webhookUrl.value() || "").trim();

  if (!accessToken) {
    throw new Error("Mercado Pago no está configurado: falta access token.");
  }

  return { accessToken, webhook };
}

export async function createPreference(data: PaymentRequestData, tenantId?: string) {
  const { items, external_reference } = data;

  if (process.env.FUNCTIONS_EMULATOR === "true") {
    logger.info(`[Emulator] Simulating Mercado Pago preference creation for ${external_reference}`);
    const host = siteUrl.value() || "http://localhost:4201";
    return {
      id: `mp-mock-pref-${Date.now()}`,
      init_point: `${host}/shop/order-confirmation/${external_reference}?status=approved`,
      date_of_expiration: new Date(Date.now() + 86400000).toISOString(),
    };
  }

  const runtime = await getMercadoPagoRuntimeConfig(tenantId);

  const mpClient = new MercadoPagoConfig({ accessToken: runtime.accessToken });
  const preferenceClient = new Preference(mpClient);

  const preferenceBody = {
    items: items.map(item => ({
      id: item.variantId,
      title: item.title,
      quantity: item.quantity,
      unit_price: item.unit_price,
      currency_id: "ARS",
    })),
    external_reference,
    back_urls: {
      success: `${siteUrl.value()}/shop/order-confirmation/${external_reference}`,
      failure: `${siteUrl.value()}/shop/cart`,
      pending: `${siteUrl.value()}/shop/cart`,
    },
    auto_return: "approved" as const,
    notification_url: runtime.webhook,
  };

  const preference = await preferenceClient.create({ body: preferenceBody });

  return {
    id: preference.id,
    init_point: preference.init_point,
    date_of_expiration: preference.date_of_expiration,
  };
}

export async function getPaymentDetails(paymentId: string, tenantId?: string) {
  logger.info(`Obteniendo detalles del pago: ${paymentId}`);

  if (process.env.FUNCTIONS_EMULATOR === "true" && paymentId.startsWith("mp-mock-")) {
    logger.info(`[Emulator] Simulating getPaymentDetails for ${paymentId}`);
    const orderId = paymentId.split("-").pop() || "";
    return {
      id: paymentId,
      status: "approved",
      external_reference: orderId,
    };
  }

  const runtime = await getMercadoPagoRuntimeConfig(tenantId);
  const mpClient = new MercadoPagoConfig({ accessToken: runtime.accessToken });
  const paymentClient = new Payment(mpClient);

  try {
    const payment = await paymentClient.get({ id: paymentId });
    if (!payment) {
      throw new Error("Pago no encontrado en Mercado Pago.");
    }
    return payment;
  } catch (error) {
    logger.error(`Error al obtener detalles del pago ${paymentId} desde Mercado Pago:`, error);
    throw error;
  }
}