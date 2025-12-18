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
exports.sendConfirmationEmail = sendConfirmationEmail;
const admin = __importStar(require("firebase-admin"));
const firebase_functions_1 = require("firebase-functions");
const db = admin.firestore();
const MAIL_COLLECTION = "mail";
function generateConfirmationEmailHtml(orderId, orderData) {
    const itemsHtml = orderData.items
        .map(item => `<li>${item.productName} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</li>`)
        .join("");
    return `<h1>¡Gracias por tu compra, ${orderData.clientName}!</h1><p>Tu pedido #${orderId} ha sido confirmado y ya estamos preparándolo.</p><h2>Detalles del Pedido</h2><ul>${itemsHtml}</ul><h3>Total: $${orderData.total.toFixed(2)}</h3><p>¡Gracias por confiar en nosotros!</p>`;
}
async function sendConfirmationEmail(orderId, orderData) {
    const emailHtml = generateConfirmationEmailHtml(orderId, orderData);
    try {
        await db.collection(MAIL_COLLECTION).add({
            to: [orderData.clientEmail],
            message: { subject: `Confirmación de tu Pedido #${orderId}`, html: emailHtml },
        });
        firebase_functions_1.logger.info(`Documento de email para pedido ${orderId} creado en la colección '${MAIL_COLLECTION}'.`);
    }
    catch (error) {
        firebase_functions_1.logger.error(`Error al crear documento en '${MAIL_COLLECTION}' para pedido ${orderId}`, { error });
        throw new Error("Error al crear el documento para la extensión Trigger Email.");
    }
}
//# sourceMappingURL=email.service.js.map