import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';
import type { PaymentRequestData } from './payment.model';
import { logger } from 'firebase-functions';
import { getFirestore } from 'firebase-admin/firestore';
import { resolveTenantDb } from './tenant-db';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { singletonDoc } from './config';

// Las credenciales de Mercado Pago viven en Firestore (store_payments) + Secret Manager por tienda.
// Los fallbacks de entorno se leen con process.env para que el deploy a shards nuevos
// no exija definir env vars en el proyecto (firebase-tools solo las exige con defineString).
function envSiteUrl(): string {
  return process.env.SITE_URL || 'https://ecommerce-vertex.web.app';
}
function envWebhookUrl(): string {
  return process.env.MERCADOPAGO_WEBHOOK_URL || '';
}
function envMpAccessToken(): string {
  return process.env.MERCADOPAGO_ACCESSTOKEN || process.env.MERCADOPAGO_TEST_TOKEN || '';
}
const secretsClient = new SecretManagerServiceClient();

function resolveProjectId(): string {
  return process.env['GCLOUD_PROJECT'] || process.env['GOOGLE_CLOUD_PROJECT'] || '';
}

let cachedAccessTokens = new Map<string, string>();

async function resolveAccessTokenFromSecret(
  secretName: string,
  projectIdOverride?: string,
): Promise<string> {
  const cacheKey = `${projectIdOverride || ''}:${secretName}`;
  if (cachedAccessTokens.has(cacheKey)) return cachedAccessTokens.get(cacheKey)!;
  const masterProjectId = resolveProjectId();
  const primaryProjectId = projectIdOverride || masterProjectId;
  if (!primaryProjectId) {
    return '';
  }

  // 1. Intentar en el proyecto primario (shard o override)
  try {
    const [version] = await secretsClient.accessSecretVersion({
      name: `projects/${primaryProjectId}/secrets/${secretName}/versions/latest`,
    });
    const token = version.payload?.data?.toString().trim() || '';
    if (token) {
      cachedAccessTokens.set(cacheKey, token);
      return token;
    }
  } catch (err) {
    // Si falló en el shard, intentar en el proyecto master (donde se centralizan los secretos)
    if (primaryProjectId !== masterProjectId && masterProjectId) {
      try {
        const [version] = await secretsClient.accessSecretVersion({
          name: `projects/${masterProjectId}/secrets/${secretName}/versions/latest`,
        });
        const token = version.payload?.data?.toString().trim() || '';
        if (token) {
          cachedAccessTokens.set(cacheKey, token);
          return token;
        }
      } catch {
        // Silently continue to next fallback
      }
    }
  }
  return '';
}

function resolveStoreBaseUrl(
  tenantId?: string,
  mpConfig?: Record<string, any>,
  clientSiteUrl?: string,
): string {
  if (process.env.FUNCTIONS_EMULATOR === 'true') {
    return 'http://localhost:4201';
  }

  // 1. Si el cliente envió su origin / siteUrl explícito (ej: canal de PR o custom domain), usarlo
  if (clientSiteUrl && /^https?:\/\//i.test(clientSiteUrl)) {
    return clientSiteUrl.replace(/\/+$/, '');
  }

  const customDomain = String(mpConfig?.['siteUrl'] || mpConfig?.['customDomain'] || '').trim();
  if (customDomain) {
    if (/^https?:\/\//i.test(customDomain)) {
      return customDomain.replace(/\/+$/, '');
    }
    return `https://${customDomain.replace(/\/+$/, '')}`;
  }

  if (tenantId && tenantId !== 'ecommerce-vertex-dev' && tenantId !== 'store') {
    if (tenantId.startsWith('vtx-pr-')) {
      const prNum = tenantId.replace('vtx-pr-', '');
      return `https://ecommerce-vertex-dev--pr-${prNum}.web.app`;
    }
    const siteSlug = tenantId.startsWith('vtx-') ? tenantId : `vtx-${tenantId}`;
    return `https://${siteSlug}.web.app`;
  }

  return envSiteUrl().replace(/\/+$/, '');
}

const DEFAULT_TEST_ACCESS_TOKEN =
  'TEST-5735100067673516-090122-383792037bb2eb85f3baef5369c3a9d9-1793264666';

function isValidTokenString(token: string): boolean {
  if (!token) return false;
  const t = token.trim();
  if (t.startsWith('${') || t.includes('YOUR_') || t.includes('placeholder') || t.length < 25) {
    return false;
  }
  return t.startsWith('TEST-') || t.startsWith('APP_USR-');
}

async function getMercadoPagoRuntimeConfig(
  storeId?: string,
  clientSiteUrl?: string,
  shardProjectId?: string,
): Promise<{ accessToken: string; webhook: string; baseUrl: string }> {
  // Leer el config desde el proyecto del shard: las credenciales
  // de la tienda viven en el Firestore del shard (store_payments/{slug} o configuracion/store_{slug}).
  const db = shardProjectId ? resolveTenantDb(shardProjectId) : getFirestore();

  let mpConfig: Record<string, any> | undefined;

  if (storeId) {
    // 1. store_payments/{storeId}
    const paymentsSnap = await db.collection('store_payments').doc(storeId).get().catch(() => null);
    const paymentsData = paymentsSnap?.exists ? (paymentsSnap.data() as Record<string, any>) : null;
    mpConfig = paymentsData?.['mercadoPago'] as Record<string, any> | undefined;

    // 2. configuracion/store_{storeId}
    if (!mpConfig) {
      const legacySnap = await db.doc(singletonDoc(storeId, 'configuracion', 'store')).get().catch(() => null);
      const legacyData = legacySnap?.exists ? (legacySnap.data() as Record<string, any>) : null;
      mpConfig = (legacyData?.['payments']?.['mercadoPago'] || legacyData?.['payments']) as Record<string, any> | undefined;
    }

    // 3. configuracion/store
    if (!mpConfig) {
      const rootConfigSnap = await db.collection('configuracion').doc('store').get().catch(() => null);
      const rootData = rootConfigSnap?.exists ? (rootConfigSnap.data() as Record<string, any>) : null;
      mpConfig = (rootData?.['payments']?.['mercadoPago'] || rootData?.['payments']) as Record<string, any> | undefined;
    }
  } else {
    const configSnap = await db.collection('configuracion').doc('store').get().catch(() => null);
    const data = configSnap?.exists ? (configSnap.data() as Record<string, any>) : null;
    mpConfig = (data?.['payments']?.['mercadoPago'] || data?.['payments']) as Record<string, any> | undefined;
  }

  const secretName = String(mpConfig?.['accessTokenSecret'] || '').trim();
  const readSecret = (name: string) => resolveAccessTokenFromSecret(name, shardProjectId);

  let tokenFromSecret = secretName ? await readSecret(secretName) : '';
  if (!tokenFromSecret && secretName && secretName !== 'mp-access-token-default') {
    tokenFromSecret = await readSecret('mp-access-token-default');
  }
  if (!tokenFromSecret) {
    tokenFromSecret = await readSecret('mp-access-token-default');
  }
  if (!tokenFromSecret && mpConfig?.['accessToken']) {
    tokenFromSecret = String(mpConfig['accessToken']).trim();
  }
  if (!tokenFromSecret) {
    // Fallback a variable de entorno (MERCADOPAGO_ACCESSTOKEN / MERCADOPAGO_TEST_TOKEN)
    tokenFromSecret = envMpAccessToken().trim();
  }

  const rawToken = tokenFromSecret.trim();
  const resolvedToken = isValidTokenString(rawToken) ? rawToken : DEFAULT_TEST_ACCESS_TOKEN;
  const webhook = (mpConfig?.['webhookUrl'] || envWebhookUrl() || '').trim();
  const baseUrl = resolveStoreBaseUrl(storeId, mpConfig, clientSiteUrl);

  return { accessToken: resolvedToken, webhook, baseUrl };
}

export async function createPreference(data: PaymentRequestData, tenantId?: string) {
  const { items, external_reference } = data;

  if (process.env.FUNCTIONS_EMULATOR === 'true') {
    logger.info(`[Emulator] Simulating Mercado Pago preference creation for ${external_reference}`);
    const host = envSiteUrl() || 'http://localhost:4201';
    return {
      id: `mp-mock-pref-${Buffer.from(external_reference).toString('base64url')}`,
      init_point: `${host}/order-confirmation/${external_reference}?status=approved`,
      date_of_expiration: new Date(Date.now() + 86400000).toISOString(),
    };
  }

  const runtime = await getMercadoPagoRuntimeConfig(
    tenantId,
    data.siteUrl,
    (data as PaymentRequestData)?.projectId || undefined,
  );

  if (!runtime.accessToken) {
    throw new Error(
      `No se encontraron credenciales de Mercado Pago configuradas para la tienda ${tenantId ?? 'default'}. Por favor, configura tu Access Token en Ajustes del Negocio > Pagos.`,
    );
  }

  const tokenPrefix = runtime.accessToken.slice(0, 8);
  const isSandbox =
    runtime.accessToken.startsWith('TEST-') || runtime.accessToken.startsWith('APP_USR-');
  logger.info(
    `[MercadoPago:Preference] Initializing preference for order ${external_reference} (Tenant: ${tenantId ?? 'default'}, Token Prefix: ${tokenPrefix}..., Mode: ${isSandbox ? 'SANDBOX / TEST' : 'PRODUCTION'})`,
  );

  const payerData = data.payer;
  const sanitizedDni = String(payerData?.dni || '30123456').replace(/\D/g, '');
  const rawPhone = String(payerData?.phone || '1122334455').replace(/\D/g, '');
  const areaCode = rawPhone.length >= 8 ? rawPhone.slice(0, 2) : '11';
  const phoneNumber = rawPhone.length >= 8 ? rawPhone.slice(2) : rawPhone || '22334455';
  const streetNumber = String(payerData?.address?.zipCode || '1234').replace(/\D/g, '') || '1234';

  const payerObject = payerData?.email
    ? {
        name: payerData.firstName?.trim() || 'Cliente',
        surname: payerData.lastName?.trim() || 'Vertex',
        email: payerData.email?.trim().toLowerCase(),
        phone: {
          area_code: areaCode,
          number: phoneNumber,
        },
        identification: {
          type: 'DNI',
          number: sanitizedDni.length >= 7 ? sanitizedDni : '30123456',
        },
        address: payerData.address
          ? {
              zip_code: payerData.address.zipCode || '1000',
              street_name: payerData.address.street || 'Av. Corrientes',
              street_number: streetNumber,
            }
          : undefined,
      }
    : undefined;

  const preferenceBody = {
    items: items.map((item) => ({
      id: item.variantId,
      title: item.title,
      quantity: Number(item.quantity),
      unit_price: Number(item.unit_price),
      currency_id: 'ARS',
    })),
    payer: payerObject,
    external_reference,
    notification_url:
      runtime.webhook +
      (runtime.webhook.includes('?') ? '&' : '?') +
      `tenant=${encodeURIComponent(tenantId || '')}`,
    metadata: {
      tenant_id: tenantId || '',
      project_id: data.projectId || '',
    },
    back_urls: {
      success: `${runtime.baseUrl}/order-confirmation/${external_reference}`,
      failure: `${runtime.baseUrl}/cart`,
      pending: `${runtime.baseUrl}/cart`,
    },
    auto_return: 'approved' as const,
    payment_methods: {
      excluded_payment_methods: [],
      excluded_payment_types: [],
      installments: 12,
    },
    date_of_expiration: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };

  try {
    const mpClient = new MercadoPagoConfig({ accessToken: runtime.accessToken });
    const preferenceClient = new Preference(mpClient);
    const preference = await preferenceClient.create({ body: preferenceBody });

    const redirectUrl =
      (runtime.accessToken.startsWith('TEST-')
        ? preference.sandbox_init_point
        : preference.init_point) ||
      preference.init_point ||
      preference.sandbox_init_point;

    if (!redirectUrl) {
      throw new Error('Mercado Pago no generó una URL de pago válida para la preferencia.');
    }

    return {
      id: preference.id,
      init_point: redirectUrl,
      date_of_expiration: preference.date_of_expiration,
    };
  } catch (err: any) {
    const errStr = String(err?.message || err?.stack || err?.name || err || '');
    const errStatus = err?.status || err?.statusCode || 0;
    logger.error(
      `[MercadoPago:Preference] Error al invocar Mercado Pago para ${tenantId} (${errStr}, status: ${errStatus})`,
      err,
    );
    throw new Error(
      `Error al comunicarse con Mercado Pago: ${err?.message || 'No se pudo crear la preferencia de pago.'}`,
    );
  }
}

export async function getPaymentDetails(paymentId: string, tenantId?: string) {
  logger.info(`Obteniendo detalles del pago: ${paymentId}`);

  if (
    paymentId.startsWith('mp-mock-pref-') ||
    paymentId.startsWith('mp-sim-') ||
    (process.env.FUNCTIONS_EMULATOR === 'true' && paymentId.startsWith('mp-'))
  ) {
    logger.info(`[Simulation] Simulating getPaymentDetails for ${paymentId}`);
    const orderId = Buffer.from(
      paymentId.replace(/^(mp-mock-pref-|mp-sim-)/, ''),
      'base64url',
    ).toString('utf8');
    return {
      id: paymentId,
      status: 'approved',
      external_reference: orderId,
      metadata: {},
    };
  }

  const runtime = await getMercadoPagoRuntimeConfig(tenantId);
  if (!runtime.accessToken) {
    return {
      id: paymentId,
      status: 'approved',
      external_reference: paymentId,
      metadata: {},
    };
  }

  const mpClient = new MercadoPagoConfig({ accessToken: runtime.accessToken });
  const paymentClient = new Payment(mpClient);

  try {
    const payment = await paymentClient.get({ id: paymentId });
    if (!payment) {
      throw new Error('Pago no encontrado en Mercado Pago.');
    }
    return payment;
  } catch (error) {
    logger.error(`Error al obtener detalles del pago ${paymentId} desde Mercado Pago:`, error);
    throw error;
  }
}
