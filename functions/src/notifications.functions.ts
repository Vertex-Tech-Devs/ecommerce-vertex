import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as logger from 'firebase-functions/logger';
import { getFirestore } from 'firebase-admin/firestore';
import { defineString } from 'firebase-functions/params';
import { OrderSchema } from './core/order.model';
import type { Order } from './core/order.model';
import { COLLECTIONS, DOCS, collectionPath, singletonDoc } from './core/config';

const db = getFirestore();
const siteUrl = defineString('SITE_URL', { default: 'https://ecommerce-vertex.web.app' });

async function getEmailConfig(storeId: string) {
  const configDoc = await db
    .doc(singletonDoc(storeId, COLLECTIONS.SETTINGS, DOCS.EMAIL_TEMPLATES))
    .get();
  if (!configDoc.exists) {
    logger.error(`Email config doc not found for store ${storeId}.`);
    return null;
  }
  return configDoc.data();
}

async function getAttributeMap(storeId: string): Promise<Map<string, string>> {
  const attributeMap = new Map<string, string>();
  try {
    const attributesSnapshot = await db
      .collection(collectionPath(COLLECTIONS.ATTRIBUTES))
      .where('storeId', '==', storeId)
      .get();
    attributesSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.name) {
        attributeMap.set(doc.id, data.name);
      }
    });
  } catch (error) {
    logger.error('Error fetching attributes for email generation:', error);
  }
  return attributeMap;
}

function getVariantDescription(
  attributes: { [key: string]: string },
  attributeMap: Map<string, string>,
): string {
  return Object.entries(attributes)
    .map(([key, value]) => {
      const name = attributeMap.get(key) || key;
      return `${name}: ${value}`;
    })
    .join(' / ');
}

// Escapa valores interpolados en plantillas HTML para prevenir inyección de HTML/links maliciosos
function escapeHtml(value: unknown): string {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function buildEmailHtml(
  template: string,
  order: Order,
  orderId: string,
  attributeMap: Map<string, string>,
  extras: { manageButtonUrl?: string | null; whatsappUrl?: string | null } = {},
): string {
  const itemsHtml = order.items
    .map((item) => {
      const description = getVariantDescription(item.attributes, attributeMap);
      return `<li>${escapeHtml(item.productName)} (${escapeHtml(description)}) (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</li>`;
    })
    .join('');

  let emailBody = template
    .replace(/{orderId}/g, escapeHtml(orderId))
    .replace(/{clientName}/g, escapeHtml(order.clientName))
    .replace(/{clientEmail}/g, escapeHtml(order.clientEmail || 'N/A'))
    .replace(/{clientPhone}/g, escapeHtml(order.clientPhone || 'N/A'))
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

export const onOrderCreatedSendNotifications = onDocumentCreated(
  `${COLLECTIONS.ORDERS}/{orderId}`,
  async (event) => {
    const snap = event.data;
    const orderId = event.params.orderId;
    if (!snap) {
      logger.warn(`Evento sin datos para el pedido ${orderId}.`);
      return;
    }

    const validationResult = OrderSchema.safeParse(snap.data());
    if (!validationResult.success) {
      logger.error(`Datos del pedido ${orderId} son inválidos.`, {
        errors: validationResult.error.flatten(),
      });
      return;
    }
    const orderData = validationResult.data;
    const storeId = (snap.data() as Record<string, unknown>)['storeId'] as string | undefined;
    if (!storeId) {
      logger.warn(`Pedido ${orderId} sin storeId. No se enviarán notificaciones.`);
      return;
    }
    logger.info(`Pedido ${orderId} válido (store: ${storeId}). Obteniendo plantillas de email...`);

    const config = await getEmailConfig(storeId);
    if (!config) {
      logger.error(`No se enviarán correos para el pedido ${orderId} por falta de configuración.`);
      return;
    }

    const attributeMap = await getAttributeMap(storeId);
    const mailCreationPromises = [];

    const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    // Build standard FROM address matching the platform's verified SMTP domain
    const projectId = process.env.GCLOUD_PROJECT || 'vertex-platform-dev';
    const defaultFromDomain = projectId.includes('vertex-platform-app')
      ? 'vertex-platform-app.web.app'
      : 'vertex-platform-dev.firebaseapp.com';
    const defaultFromEmail = `no-reply@${defaultFromDomain}`;
    const storeName = config.storeName || 'Vertex Store';
    const fromAddress = `${storeName} <${defaultFromEmail}>`;

    if (config.adminNotification && config.storeOwnerEmail) {
      const adminConfig = config.adminNotification;
      const manageButtonUrl = adminConfig.showManageButton
        ? `${siteUrl.value()}/admin/orders/detail/${orderId}`
        : null;
      const whatsappMessage = encodeURIComponent(
        `Hola ${orderData.clientName}, te contacto sobre tu pedido #${orderId}.`,
      );
      const whatsappUrl = adminConfig.showWhatsappButton
        ? `https://wa.me/${orderData.clientPhone}?text=${whatsappMessage}`
        : null;

      const adminHtml = buildEmailHtml(adminConfig.template, orderData, orderId, attributeMap, {
        manageButtonUrl,
        whatsappUrl,
      });

      mailCreationPromises.push(
        db.collection(collectionPath(COLLECTIONS.MAIL)).add({
          storeId,
          to: [config.storeOwnerEmail],
          from: fromAddress,
          message: {
            subject: adminConfig.subject.replace(/{orderId}/g, orderId),
            html: adminHtml,
          },
          expireAt: expirationDate,
        }),
      );
    }

    if (config.customerConfirmation && orderData.clientEmail) {
      const customerConfig = config.customerConfirmation;
      const whatsappUrl =
        customerConfig.showWhatsappButton && config.storeWhatsappNumber
          ? `https://wa.me/${config.storeWhatsappNumber}`
          : null;

      const customerHtml = buildEmailHtml(
        customerConfig.template,
        orderData,
        orderId,
        attributeMap,
        { whatsappUrl },
      );

      mailCreationPromises.push(
        db.collection(collectionPath(COLLECTIONS.MAIL)).add({
          storeId,
          to: [orderData.clientEmail],
          from: fromAddress,
          message: {
            subject: customerConfig.subject.replace(/{orderId}/g, orderId),
            html: customerHtml,
          },
          expireAt: expirationDate,
        }),
      );
    }

    try {
      await Promise.all(mailCreationPromises);
      logger.info(`Correos para el pedido ${orderId} han sido encolados para envío con TTL.`);
    } catch (error) {
      logger.error(`Error al encolar los correos para el pedido ${orderId}`, { error });
    }
  },
);
