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
let secretsClient: SecretManagerServiceClient | undefined;

function getSecretsClient(): SecretManagerServiceClient {
  if (!secretsClient) {
    secretsClient = new SecretManagerServiceClient();
  }
  return secretsClient;
}

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
    const [version] = await getSecretsClient().accessSecretVersion({
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
        const [version] = await getSecretsClient().accessSecretVersion({
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

// Master TEST de Develop (zero-IAM, fallback en código). El panel de MP hoy emite
// tokens con prefijo APP_USR- para test users, por lo que el master de prueba puede
// ser APP_USR-. Se inyecta por env MP_MASTER_TEST_TOKEN (deploy) o se usa el default
// verificado contra api.mercadopago.com (HTTP 201). Rotaciones futuras: setear la env.
const DEFAULT_MASTER_DEV_TEST_TOKEN =
  'APP_USR-1516515095961487-091615-0e0e36c57f15fa71ba62abf9457f2259-2696854666';

function getMasterDevTestToken(): string {
  return (
    String(process.env.MP_MASTER_TEST_TOKEN || '').trim() || DEFAULT_MASTER_DEV_TEST_TOKEN
  );
}

function isValidTokenString(token: string): boolean {
  if (!token) return false;
  const t = token.trim();
  if (
    t.startsWith('${') ||
    t.includes('YOUR_') ||
    t.includes('REEMPLAZAR') ||
    t.includes('placeholder') ||
    t.length < 25
  ) {
    return false;
  }
  return t.startsWith('TEST-') || t.startsWith('APP_USR-');
}

export async function getMercadoPagoRuntimeConfig(
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

  // Resolución de token en 3 niveles de resiliencia:
  // 1. Secret Manager (secretRef o accessTokenSecret). Los secretos por tienda
  //    viven en el SHARD (mp-access-token-{storeId}); el secreto por defecto
  //    (mp-access-token-default) vive en el PROYECTO PROPIO de la función (master).
  const secretRef = String(mpConfig?.['secretRef'] || '').trim();
  const secretName = String(mpConfig?.['accessTokenSecret'] || '').trim();
  const secretIdToTry = secretRef.includes('/') ? secretRef.split('/').pop() || '' : secretRef || secretName;

  // Intenta primero el proyecto del shard y cae al propio si el IAM no lo permite.
  const readStoreSecret = async (name: string): Promise<string> => {
    if (shardProjectId) {
      const fromShard = await resolveAccessTokenFromSecret(name, shardProjectId);
      if (fromShard) return fromShard;
    }
    return resolveAccessTokenFromSecret(name);
  };

  let tokenSource = 'none';
  let tokenFromSecret = '';
  if (secretIdToTry) {
    tokenFromSecret = await readStoreSecret(secretIdToTry);
    if (tokenFromSecret) tokenSource = `secret:${secretIdToTry}`;
  }
  if (!tokenFromSecret && storeId) {
    tokenFromSecret = await readStoreSecret(`mp-access-token-${storeId}`);
    if (tokenFromSecret) tokenSource = `secret:mp-access-token-${storeId}`;
  }
  if (!tokenFromSecret) {
    // El fallback maestro SIEMPRE se lee del proyecto propio de la función (master).
    tokenFromSecret = await resolveAccessTokenFromSecret('mp-access-token-default');
    if (tokenFromSecret) tokenSource = 'secret:mp-access-token-default';
  }

  // 2. Fallback persistido en Firestore (_sandboxFallbackToken o accessToken)
  if (!tokenFromSecret && mpConfig?.['_sandboxFallbackToken']) {
    tokenFromSecret = String(mpConfig['_sandboxFallbackToken']).trim();
    tokenSource = '_sandboxFallbackToken';
  }
  if (!tokenFromSecret && mpConfig?.['accessToken']) {
    tokenFromSecret = String(mpConfig['accessToken']).trim();
    tokenSource = 'firestore.accessToken';
  }

  // 3. Variable de entorno: SOLO como master de prueba (TEST-). Un APP_USR de env
  //    NUNCA se aplica a tiendas sin credenciales propias (regla Vertex: producción
  //    únicamente cuando el cliente carga sus credenciales en el shard).
  const envToken = envMpAccessToken().trim();
  const candidate =
    tokenFromSecret && isValidTokenString(tokenFromSecret)
      ? tokenFromSecret
      : envToken.startsWith('TEST-')
        ? envToken
        : '';
  let resolvedToken = isValidTokenString(candidate) ? candidate : '';
  if (!tokenFromSecret && envToken.startsWith('TEST-') && resolvedToken) {
    tokenSource = 'env(master-test)';
  }

  // Fallback en código (zero-IAM): master TEST inyectado por env MP_MASTER_TEST_TOKEN.
  const masterTest = getMasterDevTestToken();
  if (!resolvedToken && isValidTokenString(masterTest)) {
    resolvedToken = masterTest;
    tokenSource = 'code(master-test)';
  }

  if (!resolvedToken) {
    tokenSource = 'none';
  }
  const webhook = (mpConfig?.['webhookUrl'] || envWebhookUrl() || '').trim();
  const baseUrl = resolveStoreBaseUrl(storeId, mpConfig, clientSiteUrl);

  logger.info(
    `[MercadoPago Auth] Store: ${storeId ?? 'default'} | Source: ${tokenSource} | Prefix: ${
      resolvedToken ? resolvedToken.substring(0, 9) + '...' : '(sin token válido)'
    }`,
  );

  if (!resolvedToken) {
    // Fail-fast accionable: NUNCA instanciar el SDK con un token vacío, revocado o
    // con un APP_USR de entorno sin credenciales de cliente. Evita los 401/403
    // ("At least one policy returned UNAUTHORIZED") enmascarados como error de conexión.
    logger.error(
      `[MercadoPago Auth Error] Store ${storeId ?? 'default'} sin token válido. ` +
        `Configurar el secreto 'mp-access-token-default' (master TEST) en el proyecto propio ` +
        `o cargar credenciales de producción del cliente en el shard (store_payments). ` +
        `Fuentes probadas: secrets(shard+propio), firestore, env(TEST).`,
    );
    return { accessToken: '', webhook, baseUrl };
  }

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
