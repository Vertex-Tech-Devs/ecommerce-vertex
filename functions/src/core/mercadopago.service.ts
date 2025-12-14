import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { defineString } from "firebase-functions/params";
import type { PaymentRequestData } from "./payment.model";
import { logger } from "firebase-functions";

const mercadoPagoAccessToken = defineString("MERCADOPAGO_ACCESSTOKEN");
const siteUrl = defineString("SITE_URL");
const webhookUrl = defineString("MERCADOPAGO_WEBHOOK_URL");

export async function createPreference(data: PaymentRequestData) {
  const { items, external_reference } = data;

  const mpClient = new MercadoPagoConfig({ accessToken: mercadoPagoAccessToken.value() });
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
    notification_url: webhookUrl.value(),
  };

  const preference = await preferenceClient.create({ body: preferenceBody });

  return {
    id: preference.id,
    init_point: preference.init_point,
    date_of_expiration: preference.date_of_expiration,
  };
}

export async function getPaymentDetails(paymentId: string) {
  logger.info(`Obteniendo detalles del pago: ${paymentId}`);
  const mpClient = new MercadoPagoConfig({ accessToken: mercadoPagoAccessToken.value() });
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