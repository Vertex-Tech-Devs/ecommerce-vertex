import { describe, it, expect, vi, beforeEach } from 'vitest';

// ═══ Mocks de infraestructura ══════════════════════════════════════════════
const { mockSecretAccess } = vi.hoisted(() => {
  const mockSecretAccess = vi.fn();
  return { mockSecretAccess };
});

const MASTER_DEFAULT = 'APP_USR-1516515095961487-091615-0e0e36c57f15fa71ba62abf9457f2259-2696854666';

vi.mock('@google-cloud/secret-manager', () => {
  const ctor = vi.fn().mockImplementation(() => ({
    accessSecretVersion: mockSecretAccess,
  }));
  return { default: ctor, SecretManagerServiceClient: ctor };
});

vi.mock('firebase-admin/app', () => ({
  initializeApp: vi.fn((opts: any, name: string) => ({ name, opts })),
  getApps: vi.fn(() => []),
}));

vi.mock('firebase-admin/firestore', () => {
  const emptyDoc = { exists: false, data: () => null };
  const emptyCol = { doc: vi.fn(() => ({ get: vi.fn().mockResolvedValue(emptyDoc) })) };
  return {
    getFirestore: vi.fn(() => ({
      collection: vi.fn(() => emptyCol),
      doc: vi.fn(() => ({ get: vi.fn().mockResolvedValue(emptyDoc) })),
    })),
  };
});

vi.mock('firebase-functions/logger', () => ({
  info: vi.fn(),
  warn: vi.fn(),
  error: vi.fn(),
}));

vi.mock('./config', () => ({
  singletonDoc: (storeId: string, _coll: string, _doc: string) =>
    `configuracion/store_${storeId}`,
  envMpAccessToken: vi.fn(() => ''),
  envWebhookUrl: vi.fn(() => ''),
  envSiteUrl: vi.fn(() => 'https://ecommerce-vertex-dev.web.app'),
}));

import { getMercadoPagoRuntimeConfig } from './mercadopago.service';

// ═══ Tests ═════════════════════════════════════════════════════════════════
describe('getMercadoPagoRuntimeConfig — resolución defensiva del token (regla Vertex)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.unstubAllEnvs();
    // Secret Manager denegado por IAM (simula "At least one policy returned UNAUTHORIZED")
    mockSecretAccess.mockRejectedValue(new Error('At least one policy returned UNAUTHORIZED'));
  });

  it('usa el master por defecto (APP_USR de test) cuando no hay config propia ni env — zero-IAM en código', async () => {
    const runtime = await getMercadoPagoRuntimeConfig(
      'store-sin-nada',
      'https://mitienda.web.app',
      'vtx-sd-fallback',
    );

    // Sin secretos legibles, sin config y sin env → fallback en código (master de prueba).
    expect(runtime.accessToken).toBe(MASTER_DEFAULT);
  });

  it('usa el token TEST de la env var cuando es el master de prueba (sandbox de desarrollo)', async () => {
    vi.stubEnv(
      'MERCADOPAGO_TEST_TOKEN',
      'TEST-5735100067673516-090122-383792037bb2eb85f3baef5369c3a9d9-1793264666',
    );
    const runtime = await getMercadoPagoRuntimeConfig('store-dev-sandbox');

    expect(runtime.accessToken.startsWith('TEST-')).toBe(true);
    expect(runtime.accessToken.trim().length).toBeGreaterThanOrEqual(25);
  });

  it('usa el master TEST inyectado por MP_MASTER_TEST_TOKEN cuando Secret Manager da 403', async () => {
    vi.stubEnv(
      'MP_MASTER_TEST_TOKEN',
      'TEST-5735100067673516-090122-383792037bb2eb85f3baef5369c3a9d9-1793264666',
    );
    const runtime = await getMercadoPagoRuntimeConfig('store-nueva');

    expect(runtime.accessToken.startsWith('TEST-')).toBe(true);
  });

  it('NUNCA usa un APP_USR de MERCADOPAGO_ACCESSTOKEN (env global) como credencial por defecto', async () => {
    // El env global roto (403 policy UNAUTHORIZED) debe ser ignorado: la resolución
    // usa el master en código (APP_USR de test), no el valor del env.
    vi.stubEnv('MERCADOPAGO_ACCESSTOKEN', 'APP_USR-0a1832bd-24a6-499d-9379-8209e79f2b2c');
    const runtime = await getMercadoPagoRuntimeConfig('store-sin-credenciales');

    expect(runtime.accessToken).toBe(MASTER_DEFAULT);
  });
});
