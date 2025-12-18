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
exports.onOrderCreateUpdateClients = void 0;
const firestore_1 = require("firebase-functions/v2/firestore");
const admin = __importStar(require("firebase-admin"));
const logger = __importStar(require("firebase-functions/logger"));
const firestore_2 = require("firebase-admin/firestore");
const order_model_1 = require("./core/order.model");
const config_1 = require("./core/config");
const db = admin.firestore();
exports.onOrderCreateUpdateClients = (0, firestore_1.onDocumentCreated)(`${config_1.COLLECTIONS.ORDERS}/{orderId}`, async (event) => {
    const snap = event.data;
    if (!snap) {
        logger.warn(`Evento de creación de orden sin datos. ID: ${event.params.orderId}`);
        return;
    }
    const validationResult = order_model_1.OrderSchema.safeParse(snap.data());
    if (!validationResult.success) {
        logger.error(`Datos de la orden ${event.params.orderId} son inválidos y no se procesará el cliente.`, {
            errors: validationResult.error.flatten(),
        });
        return;
    }
    const order = validationResult.data;
    const clientEmail = order.clientEmail;
    if (!clientEmail) {
        logger.warn(`La orden ${event.params.orderId} no tiene un email de cliente, no se puede actualizar la colección de clientes.`);
        return;
    }
    const clientRef = db.collection(config_1.COLLECTIONS.CLIENTS).doc(clientEmail);
    try {
        await db.runTransaction(async (transaction) => {
            const clientDoc = await transaction.get(clientRef);
            if (!clientDoc.exists) {
                transaction.set(clientRef, {
                    email: clientEmail,
                    fullName: order.clientName,
                    phone: order.clientPhone,
                    firstOrderDate: snap.createTime?.toDate() || new Date(),
                    lastOrderDate: snap.createTime?.toDate() || new Date(),
                    numberOfOrders: 1,
                    totalSpent: order.total,
                });
                logger.info(`Nuevo cliente creado: ${clientEmail}`);
            }
            else {
                transaction.update(clientRef, {
                    fullName: order.clientName,
                    phone: order.clientPhone,
                    lastOrderDate: snap.createTime?.toDate() || new Date(),
                    numberOfOrders: firestore_2.FieldValue.increment(1),
                    totalSpent: firestore_2.FieldValue.increment(order.total),
                });
                logger.info(`Cliente actualizado: ${clientEmail}`);
            }
        });
    }
    catch (error) {
        logger.error(`Error en la transacción al actualizar el cliente ${clientEmail}`, { error });
    }
});
//# sourceMappingURL=client.functions.js.map