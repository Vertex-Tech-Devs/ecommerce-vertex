import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { OrderSchema } from './core/order.model';
import type { Order } from './core/order.model';
import { COLLECTIONS, DOCS, collectionPath, singletonDoc } from './core/config';
import { sendEmail, getNotificationEmail } from './core/email.service';
import { resolveTenantDb } from './core/tenant-db';

function envSiteUrl(): string {
  return process.env.SITE_URL || 'https://ecommerce-vertex.web.app';
}

async function getEmailConfig(storeId: string, tenantDb: Firestore) {
  // 1) Config pública del storefront (configuracion/store_*) — datos de display.
  let publicSnap = await tenantDb.doc(singletonDoc(storeId, 'configuracion', 'store')).get();
  if (!publicSnap.exists) {
    publicSnap = await tenantDb.doc('configuracion/store').get();
  }
  const merged: Record<string, unknown> = publicSnap.exists
    ? ((publicSnap.data() as Record<string, unknown>) ?? {})
    : {};

  // 2) Gestión de Emails (settings/emailTemplates_*) — fuente de verdad de emails.
  // Gana sobre la config pública para los campos de email, así el vendedor recibe
  // las notificaciones al email real configurado (no a placeholders de seed).
  let configDoc = await tenantDb
    .doc(singletonDoc(storeId, COLLECTIONS.SETTINGS, DOCS.EMAIL_TEMPLATES))
    .get();
  if (!configDoc.exists) {
    configDoc = await tenantDb.doc(`${COLLECTIONS.SETTINGS}/${DOCS.EMAIL_TEMPLATES}`).get();
  }
  if (configDoc.exists) {
    const settings = configDoc.data() as Record<string, unknown>;
    if (settings) {
      if (settings['storeOwnerEmail']) merged['storeOwnerEmail'] = settings['storeOwnerEmail'];
      if (settings['notificationEmail']) merged['notificationEmail'] = settings['notificationEmail'];
      if (settings['emailSenderName']) merged['emailSenderName'] = settings['emailSenderName'];
      if (settings['emailSignature']) merged['emailSignature'] = settings['emailSignature'];
      if (settings['storeWhatsappNumber']) merged['storeWhatsappNumber'] = settings['storeWhatsappNumber'];
      if (settings['adminNotification']) merged['adminNotification'] = settings['adminNotification'];
      if (settings['customerConfirmation']) {
        merged['customerConfirmation'] = settings['customerConfirmation'];
      }
      if (settings['storeName']) merged['storeName'] = settings['storeName'];
    }
  }

  // 3) Contacto de la config pública como respaldo si no hay emails definidos.
  const pub = publicSnap.exists ? (publicSnap.data() as Record<string, unknown>) : null;
  if (pub) {
    if (pub['contact'] && typeof pub['contact'] === 'object') {
      const contact = pub['contact'] as Record<string, unknown>;
      if (contact['email'] && !merged['storeOwnerEmail']) {
        merged['storeOwnerEmail'] = contact['email'];
      }
      if (contact['whatsApp'] && !merged['storeWhatsappNumber']) {
        merged['storeWhatsappNumber'] = contact['whatsApp'];
      }
    }
  }
  return Object.keys(merged).length > 0 ? merged : null;
}

async function getAttributeMap(storeId: string, tenantDb: Firestore): Promise<Map<string, string>> {
  const attributeMap = new Map<string, string>();
  try {
    const attributesSnapshot = await tenantDb
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

/**
 * Envuelve el contenido de un email en una plantilla moderna y profesional
 * (tablas + estilos inline = email-safe en Gmail/Outlook/Apple Mail).
 * `body` ya viene con HTML; `footer` típicamente la firma de la tienda.
 */
function buildEmailShell(body: string, opts: { storeName: string; subject: string; footer?: string }): string {
  const footer = (opts.footer || '').trim();
  return `
  <div style="background:#f1f5f9;padding:24px 12px;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2e8f0;">
      <tr>
        <td style="background-color:#4f46e5;background-image:linear-gradient(135deg,#4f46e5 0%,#7c3aed 55%,#06b6d4 100%);padding:30px 34px;">
          <div style="font-size:20px;line-height:1.3;color:#ffffff;font-weight:700;letter-spacing:0.2px;">${opts.storeName}</div>
          <div style="margin-top:6px;font-size:13px;line-height:1.4;color:rgba(255,255,255,0.9);">${opts.subject}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:32px 34px;color:#0f172a;font-size:15px;line-height:1.65;">${body}</td>
      </tr>
      <tr>
        <td style="padding:20px 34px;background:#f8fafc;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;line-height:1.5;text-align:center;">
          ${footer ? `<div style="margin-bottom:8px;">${footer}</div>` : ''}
          <div>Este es un email automático de Vertex Commerce — no respondas a este mensaje.</div>
        </td>
      </tr>
    </table>
  </div>`;
}

function buildEmailHtml(
  template: string,
  order: Order,
  orderId: string,
  attributeMap: Map<string, string>,
  extras: { manageButtonUrl?: string | null; whatsappUrl?: string | null } = {},
  shell: { storeName: string; subject: string; footer?: string } = {
    storeName: 'Vertex Store',
    subject: 'Notificación de pedido',
  },
): string {
  const itemsHtml = order.items
    .map((item) => {
      const description = getVariantDescription(item.attributes, attributeMap);
      return `<tr>
        <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;">${escapeHtml(item.productName)}${description ? ` <span style="color:#94a3b8;font-size:12px;">(${escapeHtml(description)})</span>` : ''}</td>
        <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;white-space:nowrap;">x${item.quantity}</td>
        <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;text-align:right;white-space:nowrap;">$${(item.price * item.quantity).toFixed(2)}</td>
      </tr>`;
    })
    .join('');

  const deliverySectionHtml =
    order.deliverySelection?.type === 'store_pickup'
      ? `<tr>
           <td style="padding: 10px; border-bottom: 1px solid #eee;">
             <strong>Método de Entrega:</strong> Retiro en el Local<br/>
             <strong>Punto de Retiro:</strong> ${escapeHtml(order.deliverySelection.pickupAddressFormatted || 'Local Comercial')}<br/>
             ${order.deliverySelection.notes ? `<em>Instrucciones: ${escapeHtml(order.deliverySelection.notes)}</em>` : ''}
           </td>
         </tr>`
      : `<tr>
           <td style="padding: 10px; border-bottom: 1px solid #eee;">
             <strong>Método de Entrega:</strong> Envío a Domicilio (A Coordinar)
           </td>
         </tr>`;

  const deliveryTable = `<table style="width: 100%; border-collapse: collapse; margin-top: 15px; margin-bottom: 15px;">${deliverySectionHtml}</table>`;

  let emailBody = template
    .replace(/{orderId}/g, escapeHtml(orderId))
    .replace(/{clientName}/g, escapeHtml(order.clientName))
    .replace(/{clientEmail}/g, escapeHtml(order.clientEmail || 'N/A'))
    .replace(/{clientPhone}/g, escapeHtml(order.clientPhone || 'N/A'))
    .replace(
      /{itemsList}/g,
      `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;"><tbody>${itemsHtml}</tbody></table>`,
    )
    .replace(/{deliverySection}/g, deliveryTable)
    .replace(/{totalAmount}/g, order.total.toFixed(2));

  if (!template.includes('{deliverySection}')) {
    emailBody += deliveryTable;
  }

  const buttonStyle = `style="display: inline-block; padding: 12px 24px; margin: 8px 10px 8px 0; font-size: 14px; font-weight: 600; color: #ffffff; background-color: #4f46e5; border-radius: 10px; text-decoration: none;"`;

  let buttonsHtml = '<div style="margin-top: 30px;">';
  if (extras.manageButtonUrl) {
    buttonsHtml += `<a href="${extras.manageButtonUrl}" ${buttonStyle}>Gestionar Pedido</a>`;
  }
  if (extras.whatsappUrl) {
    buttonsHtml += `<a href="${extras.whatsappUrl}" ${buttonStyle}>Contactar por WhatsApp</a>`;
  }
  buttonsHtml += '</div>';

  return buildEmailShell(emailBody + buttonsHtml, {
    storeName: shell.storeName,
    subject: shell.subject,
    footer: shell.footer,
  });
}

export async function sendOrderNotificationEmailsDirect(
  orderId: string,
  orderData: Order,
  tenantDb: Firestore,
  storeId?: string,
  tenantProjectId?: string,
): Promise<{ success: boolean; adminSent: boolean; customerSent: boolean; error?: string }> {
  const orderRef = tenantDb.collection(collectionPath(COLLECTIONS.ORDERS)).doc(orderId);
  let deliveryClaimed = false;

  try {
    const effectiveStoreId =
      storeId ||
      ((orderData as unknown as Record<string, unknown>)['storeId'] as string) ||
      'store';
    logger.info(
      `[OrderNotifications] Enviando emails para pedido #${orderId} (store: ${effectiveStoreId}, shard: ${tenantProjectId || 'default'})...`,
    );

    deliveryClaimed = await tenantDb.runTransaction(async (transaction) => {
      const orderSnap = await transaction.get(orderRef);
      const orderRaw = orderSnap.data() as Record<string, unknown> | undefined;

      if (!orderSnap.exists || orderRaw?.['emailDirectSent'] === true) {
        return false;
      }

      if (orderRaw?.['emailDispatchState'] === 'sending') {
        return false;
      }

      transaction.update(orderRef, {
        emailDispatchState: 'sending',
        emailDispatchStartedAt: new Date(),
      });
      return true;
    });

    if (!deliveryClaimed) {
      logger.info(`[OrderNotifications] El pedido #${orderId} ya tiene un envío de email en curso o completado. Omitiendo.`);
      return { success: true, adminSent: false, customerSent: false };
    }

    const config = await getEmailConfig(effectiveStoreId, tenantDb);
    const attributeMap = await getAttributeMap(effectiveStoreId, tenantDb);

    const projectId = tenantProjectId || process.env.GCLOUD_PROJECT || 'vertex-platform-dev';
    const defaultFromDomain = projectId.includes('vertex-platform-app')
      ? 'vertex-platform-app.web.app'
      : 'vertex-platform-dev.firebaseapp.com';
    const defaultFromEmail = `no-reply@${defaultFromDomain}`;
    const storeName = (config?.['storeName'] as string) || 'Vertex Store';
    const senderName = (config?.['emailSenderName'] as string) || storeName;
    const fromAddress = `${senderName} <${defaultFromEmail}>`;
    const emailSignature = ((config?.['emailSignature'] as string) || '').trim();

    let adminSent = false;
    let customerSent = false;

    // 1. Email al Administrador / Vendedor
    const adminEmail = (
      (config?.['storeOwnerEmail'] as string) ||
      (config?.['notificationEmail'] as string) ||
      getNotificationEmail()
    )?.trim();

    if (adminEmail) {
      const adminConfig = (config?.['adminNotification'] as {
        subject?: string;
        template?: string;
        showManageButton?: boolean;
        showWhatsappButton?: boolean;
      }) || {
        subject: `Nueva venta aprobada #${orderId}`,
        template: `<p>Has recibido una nueva venta aprobada para el pedido #{orderId} de {clientName}.</p><p>Total: $${orderData.total}</p>{itemsList}`,
        showManageButton: true,
        showWhatsappButton: true,
      };

      const manageButtonUrl = adminConfig.showManageButton
        ? `${envSiteUrl()}/admin/orders/detail/${orderId}`
        : null;
      const whatsappMessage = encodeURIComponent(
        `Hola ${orderData.clientName}, te contacto sobre tu pedido #${orderId}.`,
      );
      const whatsappUrl =
        adminConfig.showWhatsappButton && orderData.clientPhone
          ? `https://wa.me/${orderData.clientPhone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`
          : null;

      const adminHtml = buildEmailHtml(
        adminConfig.template || `<p>Nueva venta #{orderId}</p>{itemsList}`,
        orderData,
        orderId,
        attributeMap,
        { manageButtonUrl, whatsappUrl },
        { storeName, subject: `Nueva venta #${orderId}`, footer: emailSignature },
      );

      const adminSubject = (adminConfig.subject || `Nueva venta aprobada #${orderId}`).replace(
        /{orderId}/g,
        orderId,
      );

      const adminResult = await sendEmail({
        to: adminEmail,
        from: fromAddress,
        subject: adminSubject,
        html: adminHtml,
      });

      adminSent = adminResult.success;
      logger.info(
        `[OrderNotifications] Email a vendedor (${adminEmail}): ${adminResult.success ? 'ENVIADO' : 'FALLÓ'}`,
      );
    } else {
      logger.warn(
        `[OrderNotifications] No se encontró email de vendedor configurado para tienda ${effectiveStoreId}.`,
      );
    }

    // 2. Email al Comprador / Cliente
    if (orderData.clientEmail) {
      const customerConfig = (config?.['customerConfirmation'] as {
        subject?: string;
        template?: string;
        showWhatsappButton?: boolean;
      }) || {
        subject: `Confirmación de tu compra #${orderId}`,
        template: `<p>¡Hola {clientName}! Gracias por tu compra.</p><p>Tu pedido #{orderId} fue recibido y se está procesando.</p>{itemsList}`,
        showWhatsappButton: true,
      };

      const isPickup = orderData.deliverySelection?.type === 'store_pickup';
      const customerWaMsg = encodeURIComponent(
        isPickup
          ? `Hola! Hice el pedido #${orderId} para retirar por el local (${orderData.deliverySelection?.pickupAddressFormatted || 'Sucursal seleccionada'}). ¿Cuándo puedo pasar a buscarlo?`
          : `Hola! Hice el pedido #${orderId} y quisiera coordinar el envío a domicilio.`,
      );
      const cleanStoreWa = ((config?.['storeWhatsappNumber'] as string) || '').replace(
        /[^0-9]/g,
        '',
      );
      const whatsappUrl =
        customerConfig.showWhatsappButton && cleanStoreWa
          ? `https://wa.me/${cleanStoreWa}?text=${customerWaMsg}`
          : null;

      const customerHtml = buildEmailHtml(
        customerConfig.template || `<p>¡Gracias por tu compra #{orderId}!</p>{itemsList}`,
        orderData,
        orderId,
        attributeMap,
        { whatsappUrl },
        { storeName, subject: `Confirmación de compra #${orderId}`, footer: emailSignature },
      );

      const customerSubject = (
        customerConfig.subject || `Confirmación de tu compra #${orderId}`
      ).replace(/{orderId}/g, orderId);

      const custResult = await sendEmail({
        to: orderData.clientEmail,
        from: fromAddress,
        subject: customerSubject,
        html: customerHtml,
      });

      customerSent = custResult.success;
      logger.info(
        `[OrderNotifications] Email a comprador (${orderData.clientEmail}): ${custResult.success ? 'ENVIADO' : 'FALLÓ'}`,
      );
    } else {
      logger.warn(`[OrderNotifications] El pedido #${orderId} no tiene clientEmail.`);
    }

    try {
      await orderRef.update({
        notificationsSent: true,
        emailDirectSent: adminSent || customerSent,
        emailDispatchState: adminSent || customerSent ? 'sent' : 'failed',
        notificationsSentAt: new Date(),
      });
    } catch (updateErr) {
      logger.warn(
        `[OrderNotifications] No se pudo actualizar notificationsSent en pedido #${orderId}:`,
        updateErr,
      );
    }

    return { success: adminSent || customerSent, adminSent, customerSent };
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    if (deliveryClaimed) {
      try {
        await orderRef.update({
          emailDispatchState: 'failed',
          emailDispatchFailedAt: new Date(),
        });
      } catch (updateErr) {
        logger.warn(`[OrderNotifications] No se pudo liberar el envío de email para pedido #${orderId}:`, updateErr);
      }
    }
    logger.error(
      `[OrderNotifications] Error enviando notificaciones para pedido #${orderId}:`,
      err,
    );
    return { success: false, adminSent: false, customerSent: false, error: errorMsg };
  }
}

export const notifyOrderConfirmation = onRequest(
  { cors: true, invoker: 'public' },
  async (request, response) => {
    try {
      if (request.method === 'OPTIONS') {
        response.status(204).send('');
        return;
      }

      let payload: Record<string, unknown> = {};
      if (typeof request.body === 'object' && request.body !== null) {
        payload = request.body as Record<string, unknown>;
      } else if (typeof request.body === 'string') {
        try {
          payload = JSON.parse(request.body) as Record<string, unknown>;
        } catch {
          payload = {};
        }
      }

      const orderId = String(payload['orderId'] || request.query['orderId'] || '').trim();
      const tenantId = String(payload['tenantId'] || request.query['tenantId'] || '').trim();
      let tenantProjectId = String(
        payload['tenantProjectId'] || request.query['tenantProjectId'] || '',
      ).trim();

      if (!orderId) {
        response.status(400).json({ error: 'orderId es requerido.' });
        return;
      }

      let tenantDb = resolveTenantDb(tenantProjectId || undefined);
      let orderRef = tenantDb.collection(collectionPath(COLLECTIONS.ORDERS)).doc(orderId);
      let orderSnap = await orderRef.get();

      // Si no se encuentra en el proyecto indicado o por defecto, intentar buscar el proyecto en la colección stores de la plataforma
      if (!orderSnap.exists && tenantId) {
        try {
          const defaultFirestore = getFirestore();
          const storesSnap = await defaultFirestore
            .collection('stores')
            .where('slug', '==', tenantId)
            .limit(1)
            .get();
          if (!storesSnap.empty) {
            const storeData = storesSnap.docs[0].data();
            if (storeData['firebaseProjectId']) {
              tenantProjectId = String(storeData['firebaseProjectId']);
              tenantDb = resolveTenantDb(tenantProjectId);
              orderRef = tenantDb.collection(collectionPath(COLLECTIONS.ORDERS)).doc(orderId);
              orderSnap = await orderRef.get();
            }
          }
        } catch (lookupErr) {
          logger.warn(
            `[notifyOrderConfirmation] Falló búsqueda de shard para tenantId ${tenantId}:`,
            lookupErr,
          );
        }
      }

      if (!orderSnap.exists) {
        logger.warn(
          `[notifyOrderConfirmation] Pedido #${orderId} no encontrado en proyecto ${tenantProjectId || 'default'}.`,
        );
        response.status(404).json({ error: `Pedido #${orderId} no encontrado.` });
        return;
      }

      const rawData = orderSnap.data() as Record<string, unknown>;
      const force = Boolean(payload['force'] || request.query['force']);
      if (!force && rawData['emailDirectSent'] === true) {
        logger.info(
          `[notifyOrderConfirmation] Pedido #${orderId} ya tiene emailDirectSent=true. Omitiendo.`,
        );
        response.status(200).json({ success: true, alreadySent: true });
        return;
      }

      const parsed = OrderSchema.safeParse({ id: orderId, ...rawData });
      if (!parsed.success) {
        logger.error(
          `[notifyOrderConfirmation] Estructura de pedido inválida para #${orderId}:`,
          parsed.error.flatten(),
        );
        response.status(400).json({ error: 'Estructura de pedido inválida.' });
        return;
      }

      const result = await sendOrderNotificationEmailsDirect(
        orderId,
        parsed.data,
        tenantDb,
        tenantId || String(rawData['storeId'] || ''),
        tenantProjectId || undefined,
      );

      response.status(200).json(result);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      logger.error(`[notifyOrderConfirmation] Error inesperado procesando pedido:`, err);
      response.status(500).json({ success: false, error: errorMsg });
    }
  },
);
