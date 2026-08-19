import * as nodemailer from 'nodemailer';
import * as logger from 'firebase-functions/logger';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}

let cachedSmtpPassword: string | null = null;
let secretsClient: SecretManagerServiceClient | null = null;

function getSecretsClient(): SecretManagerServiceClient {
  if (!secretsClient) {
    secretsClient = new SecretManagerServiceClient();
  }
  return secretsClient;
}

export async function resolveSmtpPassword(): Promise<string> {
  if (cachedSmtpPassword) return cachedSmtpPassword;

  const envPass = (process.env.SMTP_PASS || process.env.SMTP_PASSWORD || '').trim();
  if (envPass) {
    cachedSmtpPassword = envPass;
    return cachedSmtpPassword;
  }

  const currentProject =
    (process.env.GCLOUD_PROJECT || '').trim() ||
    (process.env.FIREBASE_CONFIG ? JSON.parse(process.env.FIREBASE_CONFIG).projectId : '');

  const candidateProjects = [currentProject, 'vertex-platform-dev', 'vertex-platform-app'].filter(
    Boolean,
  );

  const client = getSecretsClient();

  for (const proj of candidateProjects) {
    try {
      const [version] = await client.accessSecretVersion({
        name: `projects/${proj}/secrets/ext-firestore-send-email-SMTP_PASSWORD/versions/latest`,
      });
      const pass = version.payload?.data?.toString()?.trim();
      if (pass) {
        cachedSmtpPassword = pass;
        logger.info(
          `[EmailService] SMTP password successfully resolved from secret in project ${proj}`,
        );
        return cachedSmtpPassword;
      }
    } catch {
      // Intentar con el siguiente proyecto candidato
    }
  }

  return '';
}

export async function sendEmail(
  options: SendEmailOptions,
): Promise<{ success: boolean; skipped?: boolean; error?: unknown }> {
  const host = (process.env.SMTP_HOST || 'smtp.gmail.com').trim();
  const portStr = (process.env.SMTP_PORT || '587').trim();
  const port = Number(portStr) || 587;
  const user = (process.env.SMTP_USER || 'vertex.tech.dev@gmail.com').trim();
  const pass = await resolveSmtpPassword();
  const defaultFrom = (process.env.FROM_EMAIL || `"Vertex Store" <${user}>`).trim();

  if (!pass) {
    logger.warn(
      '[EmailService] SMTP password not found in environment or Secret Manager. Skipping email send.',
      {
        to: options.to,
        subject: options.subject,
      },
    );
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
  return (process.env.NOTIFICATION_EMAIL || '').trim();
}
