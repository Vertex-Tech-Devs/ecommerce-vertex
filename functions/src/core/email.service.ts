import * as nodemailer from 'nodemailer';
import * as logger from 'firebase-functions/logger';
import { defineString } from 'firebase-functions/params';

const smtpHostParam = defineString('SMTP_HOST', { default: '' });
const smtpPortParam = defineString('SMTP_PORT', { default: '587' });
const smtpUserParam = defineString('SMTP_USER', { default: '' });
const smtpPassParam = defineString('SMTP_PASS', { default: '' });
const fromEmailParam = defineString('FROM_EMAIL', { default: '' });
const notificationEmailParam = defineString('NOTIFICATION_EMAIL', { default: '' });

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail(
  options: SendEmailOptions,
): Promise<{ success: boolean; skipped?: boolean; error?: unknown }> {
  const host = (process.env.SMTP_HOST || smtpHostParam.value() || '').trim();
  const portStr = (process.env.SMTP_PORT || smtpPortParam.value() || '587').trim();
  const port = Number(portStr) || 587;
  const user = (process.env.SMTP_USER || smtpUserParam.value() || '').trim();
  const pass = (process.env.SMTP_PASS || smtpPassParam.value() || '').trim();
  const defaultFrom = (process.env.FROM_EMAIL || fromEmailParam.value() || '').trim();

  if (!host || !user) {
    logger.info('[EmailService] SMTP credentials missing, skipping email send in DEV', {
      to: options.to,
      subject: options.subject,
    });
    return { success: false, skipped: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const fromAddress = options.from || defaultFrom || user;

    await transporter.sendMail({
      from: fromAddress,
      to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
      subject: options.subject,
      html: options.html,
    });

    logger.info(`[EmailService] Email enviado exitosamente a ${options.to} (${options.subject})`);
    return { success: true };
  } catch (err) {
    logger.error('[EmailService Error]:', err);
    return { success: false, error: err };
  }
}

export function getNotificationEmail(): string {
  return (process.env.NOTIFICATION_EMAIL || notificationEmailParam.value() || '').trim();
}
