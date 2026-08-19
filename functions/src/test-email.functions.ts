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
  }),
  templates: z.object({
    adminNotification: EmailTemplateSchema.optional(),
    customerConfirmation: EmailTemplateSchema.optional(),
  }),
});

function buildTestEmailHtml(
  template: string,
  testData: { [key: string]: string },
  options: { manageButtonUrl?: string | null; whatsappUrl?: string | null } = {},
) {
  const itemsHtml = `<li>Producto de Prueba 1 (x2) - $50.00</li><li>Producto de Prueba 2 (x1) - $75.50</li>`;
  const emailBody = template
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
      const whatsappUrl =
        customerConfig.showWhatsappButton && emailConfig?.storeWhatsappNumber
          ? `https://wa.me/${emailConfig.storeWhatsappNumber}`
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
