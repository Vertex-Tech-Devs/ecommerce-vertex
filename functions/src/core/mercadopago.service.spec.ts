import { describe, it, expect, vi, beforeEach } from 'vitest';

// ═══ Mocks de infraestructura ══════════════════════════════════════════════
const { mockSecretAccess, mockEnvToken } = vi.hoisted(() => {
  const mockSecretAccess = vi.fn();
  const mockEnvToken = vi.fn(() => '');
  return { mockSecretAccess, mockEnvToken };
});

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
  envMpAccessToken: mockEnvToken,
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

  it('no resuelve token cuando NO hay ninguna fuente válida (fail-fast, nunca SDK con token roto)', async () => {
    const runtime = await getMercadoPagoRuntimeConfig(
      'store-sin-nada',
      'https://mitienda.web.app',
      'vtx-sd-fallback',
    );

    // Sin secretos legibles, sin config y sin env TEST → accessToken vacío para que
    // createPreference falle con error accionable (jamás un 401/403 enmascarado).
    expect(runtime.accessToken).toBe('');
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

  it('usa el master TEST en código cuando Secret Manager da 403 y no hay config propia', async () => {
    // Secret Manager denegado por IAM (403) + sin config + sin env → el fallback
    // en código (MP_MASTER_TEST_TOKEN, zero-IAM) debe resolver un token TEST válido.
    vi.stubEnv(
      'MP_MASTER_TEST_TOKEN',
      'TEST-5735100067673516-090122-383792037bb2eb85f3baef5369c3a9d9-1793264666',
    );
    const runtime = await getMercadoPagoRuntimeConfig(
      'store-nueva',
      'https://mitienda.web.app',
      'vtx-sd-cualquiera',
    );

    expect(runtime.accessToken.startsWith('TEST-')).toBe(true);
    expect(runtime.accessToken.trim().length).toBeGreaterThanOrEqual(25);
  });

  it('NUNCA aplica un APP_USR de env a tiendas sin credenciales propias', async () => {
    // Regla: producción únicamente cuando el cliente carga sus credenciales en el shard.
    vi.stubEnv('MERCADOPAGO_ACCESSTOKEN', 'APP_USR-0a1832bd-24a6-499d-9379-8209e79f2b2c');
    const runtime = await getMercadoPagoRuntimeConfig('store-sin-credenciales');

    expect(runtime.accessToken).toBe('');
  });
});
