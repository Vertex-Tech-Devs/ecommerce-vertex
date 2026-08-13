import { onDocumentWritten, onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as logger from 'firebase-functions/logger';
import { getFirestore } from 'firebase-admin/firestore';
import { OrderSchema } from './core/order.model';
import type { Order } from './core/order.model';
import { COLLECTIONS, DOCS, collectionPath, singletonDoc } from './core/config';
import { sendEmail, getNotificationEmail } from './core/email.service';

const db = getFirestore();
// Leído con process.env para que el deploy a shards no exija env vars (ver mercadopago.service.ts).
function envSiteUrl(): string {
  return process.env.SITE_URL || 'https://ecommerce-vertex.web.app';
}

async function getEmailConfig(storeId: string) {
  const db = getFirestore();
  // Fuente primaria: settings/emailTemplates (configuración avanzada por tienda).
  const configDoc = await db
    .doc(singletonDoc(storeId, COLLECTIONS.SETTINGS, DOCS.EMAIL_TEMPLATES))
    .get();
  const base = configDoc.exists ? configDoc.data() : {};

  // Fuente secundaria: configuracion/store_{storeId} — el doc público que edita
  // /admin/store-config (pestaña Emails). Los campos del panel tienen prioridad
  // solo si están presentes (el doc primario manda).
  const publicSnap = await db.doc(singletonDoc(storeId, 'configuracion', 'store')).get();
  if (publicSnap.exists) {
    const pub = publicSnap.data();
    const merged: Record<string, unknown> = { ...base };
    if (pub) {
      if (!merged['storeName'] && pub['storeName']) merged['storeName'] = pub['storeName'];
      if (pub['storeOwnerEmail']) merged['storeOwnerEmail'] = pub['storeOwnerEmail'];
      if (pub['notificationEmail']) merged['notificationEmail'] = pub['notificationEmail'];
      if (pub['emailSenderName']) merged['emailSenderName'] = pub['emailSenderName'];
      if (pub['emailSignature']) merged['emailSignature'] = pub['emailSignature'];
    }
    return merged;
  }
  return configDoc.exists ? base : null;
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

export const onOrderWrittenSendNotifications = onDocumentWritten(
  `${COLLECTIONS.ORDERS}/{orderId}`,
  async (event) => {
    const afterSnap = event.data?.after;
    const orderId = event.params.orderId;
    if (!afterSnap || !afterSnap.exists) {
      return;
    }

    const orderRaw = afterSnap.data() as Record<string, unknown>;
    const status = orderRaw['status'] as string | undefined;

    // Solo notificar cuando el pedido fue pagado/aprobado
    if (status !== 'processing' && status !== 'approved') {
      return;
    }

    // Idempotencia: evitar re-envíos si las notificaciones ya fueron marcadas como enviadas
    if (orderRaw['notificationsSent'] === true) {
      return;
    }

    const validationResult = OrderSchema.safeParse(afterSnap.data());
    if (!validationResult.success) {
      logger.error(`Datos del pedido ${orderId} son inválidos.`, {
        errors: validationResult.error.flatten(),
      });
      return;
    }
    const orderData = validationResult.data;
    const storeId = orderRaw['storeId'] as string | undefined;
    if (!storeId) {
      logger.warn(`Pedido ${orderId} sin storeId. No se enviarán notificaciones.`);
      return;
    }
    logger.info(`Pedido pagado #${orderId} válido (store: ${storeId}). Obteniendo plantillas de email...`);

    const config = await getEmailConfig(storeId);
    const attributeMap = await getAttributeMap(storeId);
    const mailCreationPromises = [];

    const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    const projectId = process.env.GCLOUD_PROJECT || 'vertex-platform-dev';
    const defaultFromDomain = projectId.includes('vertex-platform-app')
      ? 'vertex-platform-app.web.app'
      : 'vertex-platform-dev.firebaseapp.com';
    const defaultFromEmail = `no-reply@${defaultFromDomain}`;
    const storeName = config?.storeName || 'Vertex Store';
    // Remitente dinámico desde /admin/store-config (emailSenderName) o el nombre de la tienda.
    const senderName = config?.emailSenderName || storeName;
    const fromAddress = `${senderName} <${defaultFromEmail}>`;
    const emailSignature = (config?.emailSignature || '').trim();

    const adminEmail = config?.storeOwnerEmail || config?.notificationEmail || getNotificationEmail();

    if (adminEmail) {
      const adminConfig = config?.adminNotification || {
        subject: `Nueva venta aprobada #${orderId}`,
        template: `<p>Has recibido una nueva venta aprobada para el pedido #{orderId} de {clientName}.</p><p>Total: ${orderData.total}</p>{itemsList}`,
        showManageButton: true,
        showWhatsappButton: true,
      };

      const manageButtonUrl = adminConfig.showManageButton
        ? `${envSiteUrl()}/admin/orders/detail/${orderId}`
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
      }) + (emailSignature ? `<p style="margin:24px 0 0;color:#94a3b8;font-size:12px;line-height:1.5;">${emailSignature}</p>` : '');

      mailCreationPromises.push(
        db.collection(collectionPath(COLLECTIONS.MAIL)).add({
          storeId,
          to: [adminEmail],
          from: fromAddress,
          message: {
            subject: adminConfig.subject.replace(/{orderId}/g, orderId),
            html: adminHtml,
          },
          expireAt: expirationDate,
        }),
      );
    }

    if (orderData.clientEmail) {
      const customerConfig = config?.customerConfirmation || {
        subject: `Confirmación de tu compra #${orderId}`,
        template: `<p>¡Hola {clientName}! Gracias por tu compra.</p><p>Tu pedido #{orderId} fue recibido y se está procesando.</p>{itemsList}`,
        showWhatsappButton: true,
      };

      const whatsappUrl =
        customerConfig.showWhatsappButton && config?.storeWhatsappNumber
          ? `https://wa.me/${config.storeWhatsappNumber}`
          : null;

      const customerHtml = buildEmailHtml(
        customerConfig.template,
        orderData,
        orderId,
        attributeMap,
        { whatsappUrl },
      ) + (emailSignature ? `<p style="margin:24px 0 0;color:#94a3b8;font-size:12px;line-height:1.5;">${emailSignature}</p>` : '');

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
      await afterSnap.ref.update({ notificationsSent: true });
      logger.info(`Correos para el pedido ${orderId} encolados exitosamente.`);
    } catch (error) {
      logger.error(`Error al encolar los correos para el pedido ${orderId}`, { error });
    }
  },
);

export const onMailCreatedSendEmail = onDocumentCreated(
  `${COLLECTIONS.MAIL}/{mailId}`,
  async (event) => {
    const snap = event.data;
    if (!snap) return;

    const mailData = snap.data() as {
      to?: string | string[];
      from?: string;
      message?: { subject?: string; html?: string };
      status?: string;
    };

    if (mailData.status === 'sent' || mailData.status === 'skipped') {
      return;
    }

    const to = mailData.to;
    if (!to) {
      logger.warn(`Documento de email ${event.params.mailId} no tiene destinatario ('to').`);
      return;
    }

    const from = mailData.from;
    const subject = mailData.message?.subject || 'Notificación de compra';
    const html = mailData.message?.html || '';

    try {
      const result = await sendEmail({ to, from, subject, html });
      await snap.ref.update({
        status: result.success ? 'sent' : result.skipped ? 'skipped' : 'failed',
        sentAt: new Date(),
      });
    } catch (err) {
      logger.error(`[EmailService] Error al procesar el mail ${event.params.mailId}:`, err);
      await snap.ref.update({ status: 'failed', error: String(err) });
    }
  },
);
