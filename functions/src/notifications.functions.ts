import { onDocumentCreated } from "firebase-functions/v2/firestore";
import * as logger from "firebase-functions/logger";
import * as admin from "firebase-admin";
import { defineString } from "firebase-functions/params";
import { OrderSchema } from "./core/order.model";
import type { Order } from "./core/order.model";
import { COLLECTIONS, DOCS } from "./core/config";

const db = admin.firestore();
const siteUrl = defineString("SITE_URL");

async function getEmailConfig() {
  const configDoc = await db.collection(COLLECTIONS.SETTINGS).doc(DOCS.EMAIL_TEMPLATES).get();
  if (!configDoc.exists) {
    logger.error(`Documento de configuración de email ('${COLLECTIONS.SETTINGS}/${DOCS.EMAIL_TEMPLATES}') no encontrado.`);
    return null;
  }
  return configDoc.data();
}

async function getAttributeMap(): Promise<Map<string, string>> {
  const attributeMap = new Map<string, string>();
  try {
    const attributesSnapshot = await db.collection(COLLECTIONS.ATTRIBUTES).get();
    attributesSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.name) {
        attributeMap.set(doc.id, data.name);
      }
    });
  } catch (error) {
    logger.error("Error fetching attributes for email generation:", error);
  }
  return attributeMap;
}

function getVariantDescription(
  attributes: { [key: string]: string },
  attributeMap: Map<string, string>
): string {
  return Object.entries(attributes)
    .map(([key, value]) => {
      const name = attributeMap.get(key) || key;
      return `${name}: ${value}`;
    })
    .join(' / ');
}

function buildEmailHtml(
  template: string,
  order: Order,
  orderId: string,
  attributeMap: Map<string, string>,
  extras: { manageButtonUrl?: string | null; whatsappUrl?: string | null } = {}
): string {
    const itemsHtml = order.items
        .map(item => {
          const description = getVariantDescription(item.attributes, attributeMap);
          return `<li>${item.productName} (${description}) (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</li>`
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

export const onOrderCreatedSendNotifications = onDocumentCreated(`${COLLECTIONS.ORDERS}/{orderId}`, async (event) => {
    const snap = event.data;
    const orderId = event.params.orderId;
    if (!snap) {
        logger.warn(`Evento sin datos para el pedido ${orderId}.`);
        return;
    }

    const validationResult = OrderSchema.safeParse(snap.data());
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
        
        mailCreationPromises.push(db.collection(COLLECTIONS.MAIL).add({
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

        mailCreationPromises.push(db.collection(COLLECTIONS.MAIL).add({
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
    } catch (error) {
        logger.error(`Error al encolar los correos para el pedido ${orderId}`, { error });
    }
});