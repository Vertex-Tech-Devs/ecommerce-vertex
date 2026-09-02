import { environment } from '../../../environments/environment';
import { tenantPath, storeDocId, resolveTenantId, storeIdFilter } from './tenant';

describe('tenantPath', () => {
  it('should return the flat root-level collection name (no tenant namespace)', () => {
    expect(tenantPath('configuracion')).toBe('configuracion');
  });

  it('should handle different collection names', () => {
    expect(tenantPath('productos')).toBe('productos');
  });
});

describe('storeDocId', () => {
  const ORIGINAL_TENANT_ID = environment.tenantId;

  beforeEach(() => {
    environment.tenantId = ORIGINAL_TENANT_ID;
  });

  afterEach(() => {
    environment.tenantId = ORIGINAL_TENANT_ID;
  });

  it('should build a storeId-keyed doc id for singleton content docs', () => {
    environment.tenantId = 'mi-tienda';
    expect(storeDocId('footer')).toBe('footer_mi-tienda');
    expect(storeDocId('hero')).toBe('hero_mi-tienda');
    expect(storeDocId('home')).toBe('home_mi-tienda');
  });
});

describe('resolveTenantId', () => {
  const ORIGINAL_TENANT_ID = environment.tenantId;
  const ORIGINAL_PRODUCTION = environment.production;

  beforeEach(() => {
    environment.tenantId = ORIGINAL_TENANT_ID;
    environment.production = ORIGINAL_PRODUCTION;
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  });

  afterEach(() => {
    environment.tenantId = ORIGINAL_TENANT_ID;
    environment.production = ORIGINAL_PRODUCTION;
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.clear();
    }
  });

  it('should return environment.tenantId when set and not "store"', () => {
    environment.tenantId = 'my-tenant';
    expect(resolveTenantId()).toBe('my-tenant');
  });

  it('should fall through when environment.tenantId is "store"', () => {
    environment.tenantId = 'store';
    expect(resolveTenantId({ hostname: 'localhost', search: '' })).toBe('store');
  });

  it('should return empty string when environment.tenantId is falsy and no hostname match', () => {
    environment.tenantId = '';
    expect(resolveTenantId({ hostname: 'localhost', search: '' })).toBe('');
  });

  it('should parse {slug}-vtx pattern from hostname', () => {
    environment.tenantId = 'store';
    expect(resolveTenantId({ hostname: 'mi-tienda-vtx.example.com', search: '' })).toBe(
      'mi-tienda',
      'mi-tienda',
    );
  });

  it('should strip vtx- prefix from vtx-{slug} hostname to get the real tenantId (slug)', () => {
    environment.tenantId = 'store';
    // Firebase Hosting siteIds for stores are "vtx-{slug}" but tenantId is "{slug}".
    // This mirrors the server-side strip in role.functions.ts resolveTenantId().
    expect(resolveTenantId({ hostname: 'vtx-mi-tienda.example.com', search: '' })).toBe(
      'mi-tienda',
    );
  });

  it('should read tenantId from query param in non-production', () => {
    environment.tenantId = 'store';
    environment.production = false;
    expect(resolveTenantId({ hostname: 'localhost', search: '?tenantId=test-query-tenant' })).toBe(
      'test-query-tenant',
      'test-query-tenant',
    );
  });

  it('should ignore query param in production mode', () => {
    environment.tenantId = 'store';
    environment.production = true;
    expect(resolveTenantId({ hostname: 'localhost', search: '?tenantId=test-query-tenant' })).toBe(
      'store',
      'store',
    );
  });

  it('should handle firstLabel shorter than 4 in -vtx pattern', () => {
    environment.tenantId = 'store';
    expect(resolveTenantId({ hostname: 'ab-vtx.example.com', search: '' })).toBe('ab');
  });

  it('should strip vtx- prefix for short vtx-{slug} hostname', () => {
    environment.tenantId = 'store';
    // vtx- prefix IS stripped: siteId "vtx-ab" → tenantId "ab"
    expect(resolveTenantId({ hostname: 'vtx-ab.example.com', search: '' })).toBe('ab');
  });

  it('should return fallback when no hostname pattern matches and no query param', () => {
    environment.tenantId = 'store';
    expect(resolveTenantId({ hostname: 'ecommerce-vertex.web.app', search: '' })).toBe('store');
  });

  it('should handle hostname being localhost by skipping hostname parsing', () => {
    environment.tenantId = 'store';
    expect(resolveTenantId({ hostname: 'localhost', search: '' })).toBe('store');
  });

  it('should handle hostname being 127.0.0.1 by skipping hostname parsing', () => {
    environment.tenantId = 'store';
    expect(resolveTenantId({ hostname: '127.0.0.1', search: '' })).toBe('store');
  });

  it('should return environment.tenantId || "" as final fallback', () => {
    environment.tenantId = '';
    // 'ecommerce-vertex' is in the excluded list, so hostname parsing returns ''
    // and with no tenantId set, the function falls back to '' as expected.
    expect(resolveTenantId({ hostname: 'ecommerce-vertex.web.app', search: '' })).toBe('');
  });

  it('should resolve PR preview channel and localStorage fallback, and test storeIdFilter', () => {
    environment.tenantId = 'store';
    expect(resolveTenantId({ hostname: 'preview--pr-42-abc.web.app', search: '' })).toBe('vtx-pr-42');

    window.localStorage.setItem('vertex_tenant_id', 'persisted-tenant');
    expect(resolveTenantId({ hostname: 'localhost', search: '' })).toBe('persisted-tenant');

    const filter = storeIdFilter();
    expect(filter).toBeDefined();
  });
});
