import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import { defineString } from 'firebase-functions/params';
import type { PaymentRequestData } from './payment.model';
import { logger } from 'firebase-functions';
import { getFirestore } from 'firebase-admin/firestore';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { singletonDoc } from './config';

const siteUrl = defineString('SITE_URL', { default: 'https://ecommerce-vertex.web.app' });
const webhookUrl = defineString('MERCADOPAGO_WEBHOOK_URL', { default: '' });
const secretsClient = new SecretManagerServiceClient();

function resolveProjectId(): string {
  return process.env['GCLOUD_PROJECT'] || process.env['GOOGLE_CLOUD_PROJECT'] || '';
}

let cachedAccessTokens = new Map<string, string>();

async function resolveAccessTokenFromSecret(secretName: string): Promise<string> {
  if (cachedAccessTokens.has(secretName)) return cachedAccessTokens.get(secretName)!;
  const projectId = resolveProjectId();
  if (!projectId) {
    throw new Error('No se pudo resolver el proyecto para leer Secret Manager.');
  }

  try {
    const [version] = await secretsClient.accessSecretVersion({
      name: `projects/${projectId}/secrets/${secretName}/versions/latest`,
    });
    const token = version.payload?.data?.toString().trim() || '';
    // Caché keyed por secretName (aislamiento por tienda)
    cachedAccessTokens.set(secretName, token);
    return token;
  } catch (error) {
    logger.warn(
      `No se pudo leer el secreto ${secretName} de Secret Manager. Se intentará usar fallback:`,
      error,
    );
    return '';
  }
}

async function getMercadoPagoRuntimeConfig(
  storeId?: string,
): Promise<{ accessToken: string; webhook: string }> {
  const db = getFirestore();

  // Flat multi-tenant path: configuracion/store_{storeId}
  let mpConfig: Record<string, any> | undefined;

  if (storeId) {
    // Flat model: payments privados en store_payments/{storeId} (nuevo esquema),
    // con fallback legacy al doc público configuracion/store_{storeId}.
    const paymentsSnap = await db.collection('store_payments').doc(storeId).get();
    const paymentsData = paymentsSnap.exists ? (paymentsSnap.data() as Record<string, any>) : null;
    mpConfig = paymentsData?.['mercadoPago'] as Record<string, any> | undefined;

    if (!mpConfig) {
      const legacySnap = await db.doc(singletonDoc(storeId, 'configuracion', 'store')).get();
      const legacyData = legacySnap.exists ? (legacySnap.data() as Record<string, any>) : null;
      mpConfig = legacyData?.['payments']?.['mercadoPago'] as Record<string, any> | undefined;
    }
  } else {
    // Legacy fallback for backwards compatibility
    const configSnap = await db.collection('configuracion').doc('store').get();
    const data = configSnap.exists ? (configSnap.data() as Record<string, any>) : null;
    mpConfig = data?.['payments']?.['mercadoPago'] as Record<string, any> | undefined;
  }

  const secretName = String(mpConfig?.['accessTokenSecret'] || '').trim();
  const tokenFromSecret = secretName ? await resolveAccessTokenFromSecret(secretName) : '';
  // NUNCA se usa el accessToken en claro guardado en el documento público de configuración.
  const accessToken = tokenFromSecret.trim();
  const webhook = (mpConfig?.['webhookUrl'] || webhookUrl.value() || '').trim();

  if (!accessToken) {
    throw new Error('Mercado Pago no está configurado: falta access token.');
  }

  return { accessToken, webhook };
}

export async function createPreference(data: PaymentRequestData, tenantId?: string) {
  const { items, external_reference } = data;

  if (process.env.FUNCTIONS_EMULATOR === 'true') {
    logger.info(`[Emulator] Simulating Mercado Pago preference creation for ${external_reference}`);
    const host = siteUrl.value() || 'http://localhost:4201';
    // El id mock incluye el external_reference para que el webhook emulado pueda
    // resolver la orden (el parseo por timestamp no era reversible).
    return {
      id: `mp-mock-pref-${Buffer.from(external_reference).toString('base64url')}`,
      init_point: `${host}/shop/order-confirmation/${external_reference}?status=approved`,
      date_of_expiration: new Date(Date.now() + 86400000).toISOString(),
    };
  }

  const runtime = await getMercadoPagoRuntimeConfig(tenantId);

  const mpClient = new MercadoPagoConfig({ accessToken: runtime.accessToken });
  const preferenceClient = new Preference(mpClient);

  const preferenceBody = {
    items: items.map((item) => ({
      id: item.variantId,
      title: item.title,
      quantity: item.quantity,
      unit_price: item.unit_price,
      currency_id: 'ARS',
    })),
    external_reference,
    back_urls: {
      success: `${siteUrl.value()}/shop/order-confirmation/${external_reference}`,
      failure: `${siteUrl.value()}/shop/cart`,
      pending: `${siteUrl.value()}/shop/cart`,
    },
    auto_return: 'approved' as const,
    notification_url: runtime.webhook,
    // Expiración explícita (+1 día) para que cleanupExpiredOrders pueda revertir stock
    // de órdenes abandonadas de forma fiable.
    date_of_expiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
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

  if (process.env.FUNCTIONS_EMULATOR === 'true' && paymentId.startsWith('mp-mock-pref-')) {
    logger.info(`[Emulator] Simulating getPaymentDetails for ${paymentId}`);
    // Decodifica el external_reference (orderId) embebido en el id mock
    const orderId = Buffer.from(paymentId.replace(/^mp-mock-pref-/, ''), 'base64url').toString(
      'utf8',
    );
    return {
      id: paymentId,
      status: 'approved',
      external_reference: orderId,
    };
  }

  const runtime = await getMercadoPagoRuntimeConfig(tenantId);
  const mpClient = new MercadoPagoConfig({ accessToken: runtime.accessToken });
  const paymentClient = new Payment(mpClient);

  try {
    const payment = await paymentClient.get({ id: paymentId });
    if (!payment) {
      throw new Error('Pago no encontrado en Mercado Pago.');
    }
    return payment;
  } catch (error) {
    logger.error(`Error al obtener detalles del pago ${paymentId} desde Mercado Pago:`, error);
    throw error;
  }
}
