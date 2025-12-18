"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPreference = createPreference;
exports.getPaymentDetails = getPaymentDetails;
const mercadopago_1 = require("mercadopago");
const params_1 = require("firebase-functions/params");
const firebase_functions_1 = require("firebase-functions");
const mercadoPagoAccessToken = (0, params_1.defineString)("MERCADOPAGO_ACCESSTOKEN");
const siteUrl = (0, params_1.defineString)("SITE_URL");
const webhookUrl = (0, params_1.defineString)("MERCADOPAGO_WEBHOOK_URL");
async function createPreference(data) {
    const { items, external_reference } = data;
    const mpClient = new mercadopago_1.MercadoPagoConfig({ accessToken: mercadoPagoAccessToken.value() });
    const preferenceClient = new mercadopago_1.Preference(mpClient);
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
        auto_return: "approved",
        notification_url: webhookUrl.value(),
    };
    const preference = await preferenceClient.create({ body: preferenceBody });
    return {
        id: preference.id,
        init_point: preference.init_point,
        date_of_expiration: preference.date_of_expiration,
    };
}
async function getPaymentDetails(paymentId) {
    firebase_functions_1.logger.info(`Obteniendo detalles del pago: ${paymentId}`);
    const mpClient = new mercadopago_1.MercadoPagoConfig({ accessToken: mercadoPagoAccessToken.value() });
    const paymentClient = new mercadopago_1.Payment(mpClient);
    try {
        const payment = await paymentClient.get({ id: paymentId });
        if (!payment) {
            throw new Error("Pago no encontrado en Mercado Pago.");
        }
        return payment;
    }
    catch (error) {
        firebase_functions_1.logger.error(`Error al obtener detalles del pago ${paymentId} desde Mercado Pago:`, error);
        throw error;
    }
}
//# sourceMappingURL=mercadopago.service.js.map