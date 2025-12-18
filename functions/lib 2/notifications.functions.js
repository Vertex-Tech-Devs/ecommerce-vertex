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
exports.onOrderCreatedSendNotifications = void 0;
const firestore_1 = require("firebase-functions/v2/firestore");
const logger = __importStar(require("firebase-functions/logger"));
const admin = __importStar(require("firebase-admin"));
const params_1 = require("firebase-functions/params");
const order_model_1 = require("./core/order.model");
const config_1 = require("./core/config");
const db = admin.firestore();
const siteUrl = (0, params_1.defineString)("SITE_URL");
async function getEmailConfig() {
    const configDoc = await db.collection(config_1.COLLECTIONS.SETTINGS).doc(config_1.DOCS.EMAIL_TEMPLATES).get();
    if (!configDoc.exists) {
        logger.error(`Documento de configuración de email ('${config_1.COLLECTIONS.SETTINGS}/${config_1.DOCS.EMAIL_TEMPLATES}') no encontrado.`);
        return null;
    }
    return configDoc.data();
}
async function getAttributeMap() {
    const attributeMap = new Map();
    try {
        const attributesSnapshot = await db.collection(config_1.COLLECTIONS.ATTRIBUTES).get();
        attributesSnapshot.forEach(doc => {
            const data = doc.data();
            if (data.name) {
                attributeMap.set(doc.id, data.name);
            }
        });
    }
    catch (error) {
        logger.error("Error fetching attributes for email generation:", error);
    }
    return attributeMap;
}
function getVariantDescription(attributes, attributeMap) {
    return Object.entries(attributes)
        .map(([key, value]) => {
        const name = attributeMap.get(key) || key;
        return `${name}: ${value}`;
    })
        .join(' / ');
}
function buildEmailHtml(template, order, orderId, attributeMap, extras = {}) {
    const itemsHtml = order.items
        .map(item => {
        const description = getVariantDescription(item.attributes, attributeMap);
        return `<li>${item.productName} (${description}) (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</li>`;
    })
        .join('');
    let emailBody = template
        .replace(/{orderId}/g, orderId)
        .replace(/{clientName}/g, order.clientName)
        .replace(/{clientEmail}/g, order.clientEmail || 'N/A')
        .replace(/{clientPhone}/g, order.clientPhone || 'N/A')
        .replace(/{itemsList}/g, `<ul>${itemsHtml}</ul>`)
        .replace(/{totalAmount}/g, order.total.toFixed(2));
    const buttonStyle = `style="display: inline-block; padding: 12px 24px; margin: 10px 10px 10px 0; font-size: 16px; color: #ffffff; background-color: #007bff; border-radius: 5px; text-decoration: none;"`;
    let buttonsHtml = '<div style="margin-top: 30px;">';
    if (extras.manageButtonUrl) {
        buttonsHtml += `<a href="${extras.manageButtonUrl}" ${buttonStyle}>Gestionar Pedido</a>`;
    }
    if (extras.whatsappUrl) {
        buttonsHtml += `<a href="${extras.whatsappUrl}" ${buttonStyle}>Contactar por WhatsApp</a>`;
    }
    buttonsHtml += '</div>';
    return emailBody + buttonsHtml;
}
exports.onOrderCreatedSendNotifications = (0, firestore_1.onDocumentCreated)(`${config_1.COLLECTIONS.ORDERS}/{orderId}`, async (event) => {
    const snap = event.data;
    const orderId = event.params.orderId;
    if (!snap) {
        logger.warn(`Evento sin datos para el pedido ${orderId}.`);
        return;
    }
    const validationResult = order_model_1.OrderSchema.safeParse(snap.data());
    if (!validationResult.success) {
        logger.error(`Datos del pedido ${orderId} son inválidos.`, { errors: validationResult.error.flatten() });
        return;
    }
    const orderData = validationResult.data;
    logger.info(`Pedido ${orderId} válido. Obteniendo plantillas de email...`);
    const config = await getEmailConfig();
    if (!config) {
        logger.error(`No se enviarán correos para el pedido ${orderId} por falta de configuración.`);
        return;
    }
    const attributeMap = await getAttributeMap();
    const mailCreationPromises = [];
    const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    if (config.adminNotification && config.storeOwnerEmail) {
        const adminConfig = config.adminNotification;
        const manageButtonUrl = adminConfig.showManageButton ? `${siteUrl.value()}/admin/orders/detail/${orderId}` : null;
        const whatsappMessage = encodeURIComponent(`Hola ${orderData.clientName}, te contacto sobre tu pedido #${orderId}.`);
        const whatsappUrl = adminConfig.showWhatsappButton ? `https://wa.me/${orderData.clientPhone}?text=${whatsappMessage}` : null;
        const adminHtml = buildEmailHtml(adminConfig.template, orderData, orderId, attributeMap, { manageButtonUrl, whatsappUrl });
        mailCreationPromises.push(db.collection(config_1.COLLECTIONS.MAIL).add({
            to: [config.storeOwnerEmail],
            message: {
                subject: adminConfig.subject.replace(/{orderId}/g, orderId),
                html: adminHtml,
            },
            expireAt: expirationDate,
        }));
    }
    if (config.customerConfirmation && orderData.clientEmail) {
        const customerConfig = config.customerConfirmation;
        const whatsappUrl = customerConfig.showWhatsappButton && config.storeWhatsappNumber ? `https://wa.me/${config.storeWhatsappNumber}` : null;
        const customerHtml = buildEmailHtml(customerConfig.template, orderData, orderId, attributeMap, { whatsappUrl });
        mailCreationPromises.push(db.collection(config_1.COLLECTIONS.MAIL).add({
            to: [orderData.clientEmail],
            message: {
                subject: customerConfig.subject.replace(/{orderId}/g, orderId),
                html: customerHtml,
            },
            expireAt: expirationDate,
        }));
    }
    try {
        await Promise.all(mailCreationPromises);
        logger.info(`Correos para el pedido ${orderId} han sido encolados para envío con TTL.`);
    }
    catch (error) {
        logger.error(`Error al encolar los correos para el pedido ${orderId}`, { error });
    }
});
//# sourceMappingURL=notifications.functions.js.map