"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.mercadoPagoWebhookHandler = exports.createPaymentPreference = void 0;
const https_1 = require("firebase-functions/v2/https");
const logger = __importStar(require("firebase-functions/logger"));
const firestore_1 = require("firebase-admin/firestore");
const payment_model_1 = require("./core/payment.model");
const mercadopago_service_1 = require("./core/mercadopago.service");
const config_1 = require("./core/config");
const order_model_1 = require("./core/order.model");
const db = (0, firestore_1.getFirestore)();
async function revertStockOnFailure(orderId) {
    logger.info(`Iniciando reversión de stock para pedido cancelado/fallido: ${orderId}`);
    const orderRef = db.collection(config_1.COLLECTIONS.ORDERS).doc(orderId);
    try {
        await db.runTransaction(async (transaction) => {
            const orderDoc = await transaction.get(orderRef);
            if (!orderDoc.exists) {
                logger.error(`Pedido ${orderId} no existe. No se puede revertir stock.`);
                return;
            }
            const orderData = orderDoc.data();
            if (!orderData) {
                logger.error(`Pedido ${orderId} sin datos. No se puede revertir stock.`);
                return;
            }
            if (!orderData.stockDecremented) {
                logger.info(`Stock para pedido ${orderId} no fue decrementado. No se revierte.`);
                transaction.update(orderRef, { status: "cancelled" });
                return;
            }
            for (const item of orderData.items) {
                const itemValidation = order_model_1.OrderItemSchema.safeParse(item);
                if (!itemValidation.success) {
                    logger.warn(`Item inválido en pedido ${orderId} durante reversión.`, { item });
                    continue;
                }
                const validItem = itemValidation.data;
                const variantRef = db
                    .collection(config_1.COLLECTIONS.PRODUCTS)
                    .doc(validItem.productId)
                    .collection("variants")
                    .doc(validItem.variantId);
                transaction.update(variantRef, {
                    stock: firestore_1.FieldValue.increment(validItem.quantity)
                });
            }
            transaction.update(orderRef, {
                status: "cancelled",
                stockDecremented: false,
                notes: "Pago rechazado o cancelado. Stock devuelto."
            });
            logger.info(`Stock revertido exitosamente para pedido ${orderId}.`);
        });
    }
    catch (error) {
        logger.error(`Error en transacción de reversión de stock para ${orderId}:`, error);
    }
}
exports.createPaymentPreference = (0, https_1.onCall)(async (request) => {
    const validationResult = payment_model_1.PaymentRequestSchema.safeParse(request.data);
    if (!validationResult.success) {
        logger.warn("Solicitud de pago con datos inválidos.", {
            errors: validationResult.error.flatten(),
            rawData: request.data,
        });
        throw new https_1.HttpsError("invalid-argument", "Los datos proporcionados para el pago no son válidos.");
    }
    const paymentData = validationResult.data;
    const orderId = paymentData.external_reference;
    logger.info(`Iniciando creación de preferencia para el pedido: ${orderId}`);
    const orderRef = db.collection(config_1.COLLECTIONS.ORDERS).doc(orderId);
    try {
        const preference = await db.runTransaction(async (transaction) => {
            const orderDoc = await transaction.get(orderRef);
            if (!orderDoc.exists) {
                logger.error(`Intento de pago para una orden no existente: ${orderId}`);
                throw new https_1.HttpsError("not-found", `La orden con ID ${orderId} no fue encontrada.`);
            }
            const orderData = orderDoc.data();
            if (!orderData)
                throw new https_1.HttpsError("internal", "Datos de orden corruptos.");
            if (orderData.status !== "pending") {
                logger.warn(`Pedido ${orderId} ya procesado o en proceso. Estado: ${orderData.status}`);
                throw new https_1.HttpsError("failed-precondition", "Este pedido ya fue procesado.");
            }
            for (const item of paymentData.items) {
                const variantRef = db
                    .collection(config_1.COLLECTIONS.PRODUCTS)
                    .doc(item.productId)
                    .collection("variants")
                    .doc(item.variantId);
                const variantDoc = await transaction.get(variantRef);
                if (!variantDoc.exists) {
                    logger.error(`Variante ${item.variantId} no encontrada para producto ${item.productId}.`);
                    throw new https_1.HttpsError("not-found", `Producto ${item.title} no disponible.`);
                }
                const variantData = variantDoc.data();
                if (!variantData || variantData.stock < item.quantity) {
                    logger.warn(`Stock insuficiente para ${item.title}. Solicitado: ${item.quantity}, Disponible: ${variantData?.stock || 0}`);
                    throw new https_1.HttpsError("resource-exhausted", `Stock insuficiente para ${item.title}. Solo quedan ${variantData?.stock || 0}.`);
                }
            }
            for (const item of paymentData.items) {
                const variantRef = db
                    .collection(config_1.COLLECTIONS.PRODUCTS)
                    .doc(item.productId)
                    .collection("variants")
                    .doc(item.variantId);
                transaction.update(variantRef, {
                    stock: firestore_1.FieldValue.increment(-item.quantity)
                });
            }
            const mpPreference = await (0, mercadopago_service_1.createPreference)(paymentData);
            logger.info(`Preferencia ${mpPreference.id} creada para el pedido ${orderId}.`);
            transaction.update(orderRef, {
                mercadopago_preference_id: mpPreference.id,
                mercadopago_init_point: mpPreference.init_point,
                mercadopago_expiration_date: mpPreference.date_of_expiration ? firestore_1.Timestamp.fromDate(new Date(mpPreference.date_of_expiration)) : null,
                status: "processing",
                stockDecremented: true
            });
            return mpPreference;
        });
        return {
            id: preference.id,
            init_point: preference.init_point,
        };
    }
    catch (error) {
        logger.error(`Error crítico al crear la preferencia de pago para ${orderId}:`, {
            errorMessage: error.message,
        });
        if (error instanceof https_1.HttpsError) {
            throw error;
        }
        throw new https_1.HttpsError("internal", "No se pudo procesar la solicitud de pago.");
    }
});
exports.mercadoPagoWebhookHandler = (0, https_1.onRequest)({ maxInstances: 5 }, async (request, response) => {
    logger.info("Mercado Pago Webhook recibido:", { body: request.body, query: request.query });
    const topic = request.query.topic;
    const paymentId = request.query.id;
    if (topic !== "payment" || !paymentId) {
        logger.warn("Webhook ignorado. No es un 'payment' o no tiene 'id'.", { topic });
        response.status(200).send("Webhook ignorado.");
        return;
    }
    try {
        const payment = await (0, mercadopago_service_1.getPaymentDetails)(paymentId);
        if (!payment) {
            throw new Error(`Detalles del pago ${paymentId} no encontrados.`);
        }
        const orderId = payment.external_reference;
        const paymentStatus = payment.status;
        if (!orderId) {
            logger.error(`El pago ${paymentId} no tiene external_reference (orderId).`, { payment });
            response.status(200).send("Pago sin orderId.");
            return;
        }
        const orderRef = db.collection(config_1.COLLECTIONS.ORDERS).doc(orderId);
        if (paymentStatus === "approved") {
            logger.info(`Pago ${paymentId} (pedido ${orderId}) aprobado. Stock ya fue descontado.`);
            const orderDoc = await orderRef.get();
            if (orderDoc.exists && !orderDoc.data()?.stockDecremented) {
                logger.warn(`El pago ${paymentId} fue aprobado, pero el stock no estaba marcado como descontado. Re-ejecutando lógica de descuento.`);
                await db.runTransaction(async (transaction) => {
                    const orderData = orderDoc.data();
                    if (!orderData)
                        return;
                    for (const item of orderData.items) {
                        const itemValidation = order_model_1.OrderItemSchema.safeParse(item);
                        if (!itemValidation.success)
                            continue;
                        const validItem = itemValidation.data;
                        const variantRef = db
                            .collection(config_1.COLLECTIONS.PRODUCTS)
                            .doc(validItem.productId)
                            .collection("variants")
                            .doc(validItem.variantId);
                        transaction.update(variantRef, {
                            stock: firestore_1.FieldValue.increment(-validItem.quantity)
                        });
                    }
                    transaction.update(orderRef, {
                        "paymentDetails.paymentId": paymentId,
                        status: "processing",
                        stockDecremented: true
                    });
                });
            }
            else {
                await orderRef.update({
                    "paymentDetails.paymentId": paymentId,
                    status: "processing"
                });
            }
        }
        else if (paymentStatus === "cancelled" || paymentStatus === "rejected") {
            logger.warn(`Pago ${paymentId} (pedido ${orderId}) fue ${paymentStatus}. Revertiendo stock si es necesario.`);
            await revertStockOnFailure(orderId);
        }
        else {
            logger.info(`Pago ${paymentId} (pedido ${orderId}) está en estado ${paymentStatus}. No se toma acción.`);
        }
        logger.info(`Webhook para pago ${paymentId} procesado exitosamente.`);
        response.status(200).send("Webhook procesado.");
    }
    catch (error) {
        logger.error(`Error al procesar el webhook para pago ${paymentId}:`, error);
        response.status(500).send("Error interno al procesar webhook.");
    }
});
//# sourceMappingURL=payment.functions.js.map