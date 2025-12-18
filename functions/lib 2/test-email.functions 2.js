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
exports.sendAdvancedTestEmail = void 0;
const https_1 = require("firebase-functions/v2/https");
const logger = __importStar(require("firebase-functions/logger"));
const admin = __importStar(require("firebase-admin"));
const zod_1 = require("zod");
const config_1 = require("./core/config");
const params_1 = require("firebase-functions/params");
const db = admin.firestore();
const siteUrl = (0, params_1.defineString)("SITE_URL", { default: "http://localhost:4200" });
const EmailTemplateSchema = zod_1.z.object({
    subject: zod_1.z.string(),
    template: zod_1.z.string(),
    showManageButton: zod_1.z.boolean().optional(),
    showWhatsappButton: zod_1.z.boolean().optional(),
});
const AdvancedTestEmailPayloadSchema = zod_1.z.object({
    recipientEmail: zod_1.z.string().email("El email del destinatario no es válido."),
    testData: zod_1.z.object({
        orderId: zod_1.z.string(),
        clientName: zod_1.z.string(),
        clientEmail: zod_1.z.string().email(),
        clientPhone: zod_1.z.string(),
        totalAmount: zod_1.z.string(),
    }),
    templates: zod_1.z.object({
        adminNotification: EmailTemplateSchema.optional(),
        customerConfirmation: EmailTemplateSchema.optional(),
    }),
});
function buildTestEmailHtml(template, testData, options = {}) {
    const itemsHtml = `<li>Producto de Prueba 1 (x2) - $50.00</li><li>Producto de Prueba 2 (x1) - $75.50</li>`;
    let emailBody = template
        .replace(/{orderId}/g, testData.orderId)
        .replace(/{clientName}/g, testData.clientName)
        .replace(/{clientEmail}/g, testData.clientEmail)
        .replace(/{clientPhone}/g, testData.clientPhone)
        .replace(/{itemsList}/g, `<ul>${itemsHtml}</ul>`)
        .replace(/{totalAmount}/g, testData.totalAmount);
    const buttonStyle = `style="display: inline-block; padding: 12px 24px; margin: 10px 10px 10px 0; font-size: 16px; color: #ffffff; background-color: #007bff; border-radius: 5px; text-decoration: none;"`;
    let buttonsHtml = '<div style="margin-top: 30px;">';
    if (options.manageButtonUrl) {
        buttonsHtml += `<a href="${options.manageButtonUrl}" ${buttonStyle}>Gestionar Pedido</a>`;
    }
    if (options.whatsappUrl) {
        buttonsHtml += `<a href="${options.whatsappUrl}" ${buttonStyle}>Contactar por WhatsApp</a>`;
    }
    buttonsHtml += '</div>';
    return emailBody + buttonsHtml;
}
exports.sendAdvancedTestEmail = (0, https_1.onCall)(async (request) => {
    if (!request.auth || !request.auth.token.admin) {
        logger.error("Unauthorized attempt to call 'sendAdvancedTestEmail'", { uid: request.auth?.uid });
        throw new https_1.HttpsError("unauthenticated", "This function can only be called by an authenticated admin.");
    }
    logger.info("Iniciando envío de email de prueba avanzado...", { data: request.data });
    const validationResult = AdvancedTestEmailPayloadSchema.safeParse(request.data);
    if (!validationResult.success) {
        logger.error("Payload inválido para sendAdvancedTestEmail", { errors: validationResult.error.flatten() });
        throw new https_1.HttpsError("invalid-argument", "Los datos proporcionados no son válidos.");
    }
    const { recipientEmail, testData, templates } = validationResult.data;
    const mailCreationPromises = [];
    try {
        const configDoc = await db.collection(config_1.COLLECTIONS.SETTINGS).doc(config_1.DOCS.EMAIL_TEMPLATES).get();
        const emailConfig = configDoc.data();
        if (templates.adminNotification) {
            const adminConfig = templates.adminNotification;
            const manageButtonUrl = adminConfig.showManageButton ? `${siteUrl.value()}/admin/orders/detail/${testData.orderId}` : null;
            const whatsappMessage = encodeURIComponent(`Hola ${testData.clientName}, te contacto sobre el pedido de prueba #${testData.orderId}.`);
            const whatsappUrl = adminConfig.showWhatsappButton ? `https://wa.me/${testData.clientPhone}?text=${whatsappMessage}` : null;
            const adminHtml = buildTestEmailHtml(adminConfig.template, testData, { manageButtonUrl, whatsappUrl });
            mailCreationPromises.push(db.collection(config_1.COLLECTIONS.MAIL).add({
                to: [recipientEmail],
                message: {
                    subject: `[PRUEBA ADMIN] ${adminConfig.subject.replace(/{orderId}/g, testData.orderId)}`,
                    html: adminHtml,
                },
            }));
        }
        if (templates.customerConfirmation) {
            const customerConfig = templates.customerConfirmation;
            const whatsappUrl = customerConfig.showWhatsappButton && emailConfig?.storeWhatsappNumber ? `https://wa.me/${emailConfig.storeWhatsappNumber}` : null;
            const customerHtml = buildTestEmailHtml(customerConfig.template, testData, { whatsappUrl });
            mailCreationPromises.push(db.collection(config_1.COLLECTIONS.MAIL).add({
                to: [recipientEmail],
                message: {
                    subject: `[PRUEBA CLIENTE] ${customerConfig.subject.replace(/{orderId}/g, testData.orderId)}`,
                    html: customerHtml,
                },
            }));
        }
        await Promise.all(mailCreationPromises);
        logger.info(`Emails de prueba para ${recipientEmail} encolados correctamente.`);
        return { success: true, message: `Emails de prueba encolados para ${recipientEmail}.` };
    }
    catch (error) {
        logger.error("Error al procesar y encolar emails de prueba:", error);
        throw new https_1.HttpsError("internal", "No se pudieron generar los emails de prueba.");
    }
});
//# sourceMappingURL=test-email.functions.js.map