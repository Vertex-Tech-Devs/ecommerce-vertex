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
exports.cleanupExpiredOrders = void 0;
const scheduler_1 = require("firebase-functions/v2/scheduler");
const logger = __importStar(require("firebase-functions/logger"));
const firestore_1 = require("firebase-admin/firestore");
const config_1 = require("./core/config");
const order_model_1 = require("./core/order.model");
const db = (0, firestore_1.getFirestore)();
exports.cleanupExpiredOrders = (0, scheduler_1.onSchedule)("every 60 minutes", async (event) => {
    logger.info("Iniciando limpieza de órdenes expiradas...");
    const now = firestore_1.Timestamp.now();
    const expiredOrdersQuery = db.collection(config_1.COLLECTIONS.ORDERS)
        .where("status", "==", "processing")
        .where("stockDecremented", "==", true)
        .where("mercadopago_expiration_date", "<=", now);
    const snapshot = await expiredOrdersQuery.get();
    if (snapshot.empty) {
        logger.info("No hay órdenes expiradas para limpiar.");
        return;
    }
    logger.info(`Se encontraron ${snapshot.docs.length} órdenes expiradas.`);
    const batch = db.batch();
    for (const doc of snapshot.docs) {
        const orderData = doc.data();
        const orderId = doc.id;
        logger.warn(`Procesando orden expirada: ${orderId}. El pago fue abandonado. Devolviendo stock.`);
        for (const item of orderData.items) {
            const itemValidation = order_model_1.OrderItemSchema.safeParse(item);
            if (!itemValidation.success) {
                logger.warn(`Item inválido en orden ${orderId} durante limpieza.`, { item });
                continue;
            }
            const validItem = itemValidation.data;
            const variantRef = db
                .collection(config_1.COLLECTIONS.PRODUCTS)
                .doc(validItem.productId)
                .collection("variants")
                .doc(validItem.variantId);
            batch.update(variantRef, {
                stock: firestore_1.FieldValue.increment(validItem.quantity)
            });
        }
        batch.update(doc.ref, {
            status: "cancelled",
            stockDecremented: false,
            notes: "Orden cancelada automáticamente por expiración o abandono de pago."
        });
    }
    await batch.commit();
    logger.info(`Limpieza completada. ${snapshot.docs.length} órdenes actualizadas y stock devuelto.`);
});
//# sourceMappingURL=cleanup.functions.js.map