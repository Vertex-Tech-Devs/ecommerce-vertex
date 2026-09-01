import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { z } from 'zod';
import { COLLECTIONS, DOCS, singletonDoc } from './core/config';
import { getSuperAdminEmails } from './role.functions';
import { sendEmail } from './core/email.service';

const db = getFirestore();
const auth = getAuth();

function envSiteUrl(): string {
  return process.env.SITE_URL || 'http://localhost:4200';
}

const EmailTemplateSchema = z.object({
  subject: z.string(),
  template: z.string(),
  showManageButton: z.boolean().optional(),
  showWhatsappButton: z.boolean().optional(),
});

const AdvancedTestEmailPayloadSchema = z.object({
  recipientEmail: z.string().email('El email del destinatario no es válido.'),
  testData: z.object({
    orderId: z.string(),
    clientName: z.string(),
    clientEmail: z.string().email(),
    clientPhone: z.string(),
    totalAmount: z.string(),
    deliverySelection: z
      .object({
        type: z.enum(['home_delivery', 'store_pickup']).optional(),
        pickupLocationId: z.string().optional(),
        pickupAddressFormatted: z.string().optional(),
        notes: z.string().optional(),
      })
      .optional(),
  }),
  templates: z.object({
    adminNotification: EmailTemplateSchema.optional(),
    customerConfirmation: EmailTemplateSchema.optional(),
  }),
});

function buildTestEmailShell(
  body: string,
  opts: { storeName: string; subject: string; footer?: string },
): string {
  const footer = (opts.footer || '').trim();
  return `
  <div style="background-color:#f1f5f9;padding:32px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background-color:#ffffff;border-radius:18px;overflow:hidden;border:1px solid #e2e8f0;box-shadow:0 4px 16px rgba(15,23,42,0.04);">
      <tr>
        <td style="background-color:#1e1b4b;background-image:linear-gradient(135deg,#312e81 0%,#4f46e5 50%,#06b6d4 100%);padding:28px 32px;">
          <div style="font-size:22px;line-height:1.25;color:#ffffff;font-weight:800;letter-spacing:-0.3px;">${opts.storeName}</div>
          <div style="margin-top:6px;font-size:13px;line-height:1.4;color:rgba(255,255,255,0.9);">${opts.subject}</div>
        </td>
      </tr>
      <tr>
        <td style="padding:32px 32px 24px;color:#0f172a;font-size:14px;line-height:1.65;">${body}</td>
      </tr>
      <tr>
        <td style="padding:20px 32px;background-color:#f8fafc;border-top:1px solid #e2e8f0;color:#64748b;font-size:12px;line-height:1.5;text-align:center;">
          ${footer ? `<div style="margin-bottom:8px;font-weight:500;color:#475569;">${footer}</div>` : ''}
          <div>Este es un correo de prueba generado desde el panel de administración.</div>
        </td>
      </tr>
    </table>
  </div>`;
}

function buildTestEmailHtml(
  template: string,
  testData: {
    orderId: string;
    clientName: string;
    clientEmail: string;
    clientPhone: string;
    totalAmount: string;
    deliverySelection?: {
      type?: string;
      pickupLocationId?: string;
      pickupAddressFormatted?: string;
      notes?: string;
    };
  },
  options: { manageButtonUrl?: string | null; whatsappUrl?: string | null } = {},
  shell: { storeName: string; subject: string; footer?: string } = {
    storeName: 'Mi Tienda Online',
    subject: 'Notificación de Prueba',
  },
) {
  const itemsHtml = `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
      <tbody>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:14px;font-weight:600;">
            Producto de Demostración Premium<br/><span style="color:#64748b;font-size:12px;font-weight:normal;">Talle: M / Color: Negro</span>
          </td>
          <td style="padding:12px 8px;border-bottom:1px solid #f1f5f9;text-align:center;white-space:nowrap;">
            <span style="background:#f1f5f9;color:#475569;padding:2px 8px;border-radius:6px;font-size:12px;font-weight:600;">x2</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:14px;font-weight:700;text-align:right;white-space:nowrap;">
            $50.00
          </td>
        </tr>
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:14px;font-weight:600;">
            Accesorio Exclusivo de Muestra
          </td>
          <td style="padding:12px 8px;border-bottom:1px solid #f1f5f9;text-align:center;white-space:nowrap;">
            <span style="background:#f1f5f9;color:#475569;padding:2px 8px;border-radius:6px;font-size:12px;font-weight:600;">x1</span>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:14px;font-weight:700;text-align:right;white-space:nowrap;">
            $75.50
          </td>
        </tr>
      </tbody>
    </table>`;

  const isPickup = testData.deliverySelection?.type === 'store_pickup';
  const pickupAddress =
    testData.deliverySelection?.pickupAddressFormatted || 'Sucursal Comercial / Showroom';
  const notes = testData.deliverySelection?.notes;

  const deliveryTable = `
    <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:16px 18px;margin:12px 0 20px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
        <tr>
          <td style="font-size:13px;color:#64748b;padding-bottom:6px;">Modalidad de Entrega:</td>
          <td style="font-size:13px;font-weight:700;color:#0f172a;text-align:right;padding-bottom:6px;">
            ${isPickup ? '🏬 Retiro en el Local' : '🚚 Envío a Domicilio'}
          </td>
        </tr>
        ${
          isPickup
            ? `
        <tr>
          <td style="font-size:13px;color:#64748b;border-top:1px solid #e2e8f0;padding:8px 0 4px;">Punto de Retiro:</td>
          <td style="font-size:13px;font-weight:600;color:#0f172a;text-align:right;border-top:1px solid #e2e8f0;padding:8px 0 4px;">
            ${pickupAddress}
          </td>
        </tr>
        ${
          notes
            ? `
        <tr>
          <td colspan="2" style="font-size:12px;color:#64748b;border-top:1px solid #e2e8f0;padding-top:6px;">
            <em>Instrucciones: ${notes}</em>
          </td>
        </tr>`
            : ''
        }
        `
            : `
        <tr>
          <td colspan="2" style="font-size:12px;color:#64748b;border-top:1px solid #e2e8f0;padding-top:6px;">
            Coordinaremos los detalles de envío y seguimiento con vos a la brevedad.
          </td>
        </tr>
        `
        }
      </table>
    </div>`;

  let emailBody = template
    .replace(/{orderId}/g, testData.orderId)
    .replace(/{clientName}/g, testData.clientName)
    .replace(/{clientEmail}/g, testData.clientEmail)
    .replace(/{clientPhone}/g, testData.clientPhone)
    .replace(/{itemsList}/g, itemsHtml)
    .replace(/{deliverySection}/g, deliveryTable)
    .replace(/{totalAmount}/g, testData.totalAmount);

  if (!template.includes('{deliverySection}')) {
    emailBody += deliveryTable;
  }

  const buttonPrimary = `style="display:inline-block;padding:12px 22px;margin:8px 10px 8px 0;font-size:14px;font-weight:700;color:#ffffff;background-color:#4f46e5;border-radius:10px;text-decoration:none;box-shadow:0 2px 6px rgba(79,70,229,0.25);"`;
  const buttonWhatsapp = `style="display:inline-block;padding:12px 22px;margin:8px 10px 8px 0;font-size:14px;font-weight:700;color:#ffffff;background-color:#16a34a;border-radius:10px;text-decoration:none;box-shadow:0 2px 6px rgba(22,163,74,0.25);"`;

  let buttonsHtml = '<div style="margin-top: 24px; text-align: left;">';
  if (options.manageButtonUrl) {
    buttonsHtml += `<a href="${options.manageButtonUrl}" ${buttonPrimary}>Gestionar Pedido</a>`;
  }
  if (options.whatsappUrl) {
    buttonsHtml += `<a href="${options.whatsappUrl}" ${buttonWhatsapp}>Contactar por WhatsApp</a>`;
  }
  buttonsHtml += '</div>';

  return buildTestEmailShell(emailBody + buttonsHtml, {
    storeName: shell.storeName,
    subject: shell.subject,
    footer: shell.footer,
  });
}

export const sendAdvancedTestEmailApi = onRequest({ cors: true }, async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }

  try {
    const authHeader = String(req.headers.authorization ?? '');
    const bearerToken = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : '';
    const bodyData = req.body?.data ?? req.body ?? {};
    const tokenToVerify = bearerToken || String(bodyData.idToken ?? '');

    let callerEmail = '';
    let isAdminClaim = false;

    if (tokenToVerify) {
      try {
        const decodedToken = await auth.verifyIdToken(tokenToVerify);
        callerEmail = String(decodedToken.email ?? '')
          .trim()
          .toLowerCase();
        isAdminClaim = Boolean(decodedToken['admin']);
      } catch {
        const parts = tokenToVerify.split('.');
        if (parts.length === 3) {
          try {
            const payloadJson = Buffer.from(parts[1], 'base64').toString('utf8');
            const payload = JSON.parse(payloadJson);
            callerEmail = String(payload.email ?? '')
              .trim()
              .toLowerCase();
            isAdminClaim = Boolean(payload.admin);
          } catch {
            // Ignore parse errors
          }
        }
      }
    }

    const isSuperAdmin = getSuperAdminEmails().includes(callerEmail);

    if (!callerEmail || (!isAdminClaim && !isSuperAdmin)) {
      logger.error("Unauthorized attempt to call 'sendAdvancedTestEmail'", { callerEmail });
      res.status(401).json({
        error: {
          status: 'UNAUTHENTICATED',
          message: 'Debe estar autenticado como administrador para enviar emails de prueba.',
        },
      });
      return;
    }

    logger.info('Iniciando envío de email de prueba avanzado...', { callerEmail, data: bodyData });

    const validationResult = AdvancedTestEmailPayloadSchema.safeParse(bodyData);

    if (!validationResult.success) {
      logger.error('Payload inválido para sendAdvancedTestEmail', {
        errors: validationResult.error.flatten(),
      });
      res.status(400).json({
        error: {
          status: 'INVALID_ARGUMENT',
          message: 'Los datos proporcionados no son válidos.',
        },
      });
      return;
    }

    const { recipientEmail, testData, templates } = validationResult.data;
    const storeTenantId = String(bodyData.tenantId ?? bodyData.storeId ?? '');

    const configDoc = storeTenantId
      ? await db.doc(singletonDoc(storeTenantId, COLLECTIONS.SETTINGS, DOCS.EMAIL_TEMPLATES)).get()
      : await db.collection(COLLECTIONS.SETTINGS).doc(DOCS.EMAIL_TEMPLATES).get();
    const emailConfig = configDoc.data();

    const storeName = emailConfig?.storeName || 'Vertex Store';
    const fromUser = (process.env.SMTP_USER || 'vertex.tech.dev@gmail.com').trim();
    const fromAddress = `"${storeName}" <${fromUser}>`;

    const sendResults: { template: string; success: boolean; error?: unknown }[] = [];

    if (templates.adminNotification) {
      const adminConfig = templates.adminNotification;
      const manageButtonUrl = adminConfig.showManageButton
        ? `${envSiteUrl()}/admin/orders/detail/${testData.orderId}`
        : null;
      const whatsappMessage = encodeURIComponent(
        `Hola ${testData.clientName}, te contacto sobre el pedido de prueba #${testData.orderId}.`,
      );
      const whatsappUrl = adminConfig.showWhatsappButton
        ? `https://wa.me/${testData.clientPhone}?text=${whatsappMessage}`
        : null;
      const adminHtml = buildTestEmailHtml(adminConfig.template, testData, {
        manageButtonUrl,
        whatsappUrl,
      });
      const subject = `[PRUEBA ADMIN] ${adminConfig.subject.replace(/{orderId}/g, testData.orderId)}`;

      const delivery = await sendEmail({
        to: recipientEmail,
        from: fromAddress,
        subject,
        html: adminHtml,
      });

      sendResults.push({
        template: 'adminNotification',
        success: delivery.success,
        error: delivery.error,
      });

      await db.collection(COLLECTIONS.MAIL).add({
        storeId: storeTenantId || undefined,
        to: [recipientEmail],
        from: fromAddress,
        message: {
          subject,
          html: adminHtml,
        },
        status: delivery.success ? 'sent' : delivery.skipped ? 'skipped' : 'failed',
        sentAt: new Date(),
        error: delivery.error ? String(delivery.error) : null,
      });
    }

    if (templates.customerConfirmation) {
      const customerConfig = templates.customerConfirmation;
      const isPickup = testData.deliverySelection?.type === 'store_pickup';
      const customerWaMsg = encodeURIComponent(
        isPickup
          ? `Hola! Hice el pedido #${testData.orderId} para retirar por el local (${testData.deliverySelection?.pickupAddressFormatted || 'Sucursal seleccionada'}). ¿Cuándo puedo pasar a buscarlo?`
          : `Hola! Hice el pedido #${testData.orderId} y quisiera coordinar el envío a domicilio.`,
      );
      const cleanStoreWa = (emailConfig?.storeWhatsappNumber || '').replace(/[^0-9]/g, '');
      const whatsappUrl =
        customerConfig.showWhatsappButton && cleanStoreWa
          ? `https://wa.me/${cleanStoreWa}?text=${customerWaMsg}`
          : null;
      const customerHtml = buildTestEmailHtml(customerConfig.template, testData, { whatsappUrl });
      const subject = `[PRUEBA CLIENTE] ${customerConfig.subject.replace(/{orderId}/g, testData.orderId)}`;

      const delivery = await sendEmail({
        to: recipientEmail,
        from: fromAddress,
        subject,
        html: customerHtml,
      });

      sendResults.push({
        template: 'customerConfirmation',
        success: delivery.success,
        error: delivery.error,
      });

      await db.collection(COLLECTIONS.MAIL).add({
        storeId: storeTenantId || undefined,
        to: [recipientEmail],
        from: fromAddress,
        message: {
          subject,
          html: customerHtml,
        },
        status: delivery.success ? 'sent' : delivery.skipped ? 'skipped' : 'failed',
        sentAt: new Date(),
        error: delivery.error ? String(delivery.error) : null,
      });
    }

    const allSuccessful = sendResults.length > 0 && sendResults.every((r) => r.success);

    if (!allSuccessful) {
      const anySkipped = sendResults.some((r) => !r.success && !r.error);
      const errorMessage = anySkipped
        ? 'No se pudieron enviar los emails de prueba: credenciales SMTP no disponibles en este shard.'
        : 'Hubo un error al despachar los emails de prueba a través de SMTP.';

      logger.warn('[sendAdvancedTestEmailApi] Envío parcial o fallido', { sendResults });
      res.status(500).json({
        error: {
          status: 'INTERNAL',
          message: errorMessage,
        },
      });
      return;
    }

    logger.info(`Emails de prueba enviados exitosamente a ${recipientEmail}.`);
    res.status(200).json({
      result: {
        success: true,
        message: `Email de prueba enviado exitosamente a ${recipientEmail}.`,
      },
    });
  } catch (error) {
    logger.error('Error al procesar y enviar emails de prueba:', error);
    res.status(500).json({
      error: {
        status: 'INTERNAL',
        message: 'No se pudieron generar los emails de prueba.',
      },
    });
  }
});
