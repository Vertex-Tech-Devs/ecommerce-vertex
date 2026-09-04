import { describe, it, expect, vi, beforeEach } from 'vitest';

// ═══ Mocks de infraestructura ══════════════════════════════════════════════
const { mockSecretAccess } = vi.hoisted(() => {
  const mockSecretAccess = vi.fn();
  return { mockSecretAccess };
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
  envMpAccessToken: vi.fn(() => ''),
  envWebhookUrl: vi.fn(() => ''),
  envSiteUrl: vi.fn(() => 'https://ecommerce-vertex-dev.web.app'),
}));

import { getMercadoPagoRuntimeConfig } from './mercadopago.service';

// ═══ Tests ═════════════════════════════════════════════════════════════════
describe('getMercadoPagoRuntimeConfig — resolución defensiva del token (regla Vertex)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Secret Manager denegado por IAM (simula "At least one policy returned UNAUTHORIZED")
    mockSecretAccess.mockRejectedValue(new Error('At least one policy returned UNAUTHORIZED'));
  });

  it('usa el token de prueba maestro de Develop si la tienda no tiene credenciales en Firestore ni secretos', async () => {
    const runtime = await getMercadoPagoRuntimeConfig(
      'store-sin-credenciales',
      'https://mitienda.web.app',
      'vtx-sd-fallback',
    );

    expect(runtime.accessToken).toBeTruthy();
    expect(typeof runtime.accessToken).toBe('string');
    expect(runtime.accessToken.startsWith('TEST-')).toBe(true);
    expect(runtime.accessToken.trim().length).toBeGreaterThanOrEqual(25);
  });

  it('no entrega nunca un token undefined o vacío para instanciar el SDK', async () => {
    const runtimeA = await getMercadoPagoRuntimeConfig('store-sin-nada-a');
    const runtimeB = await getMercadoPagoRuntimeConfig('store-sin-nada-b');

    for (const r of [runtimeA, runtimeB]) {
      expect(r.accessToken).toBeTruthy();
      expect(typeof r.accessToken).toBe('string');
      expect(r.accessToken.trim()).not.toBe('');
    }
  });
});
