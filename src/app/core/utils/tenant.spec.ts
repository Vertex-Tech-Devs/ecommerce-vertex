import { environment } from '../../../environments/environment';
import { tenantPath, tenantDocPath, resolveTenantId } from './tenant';

describe('tenantPath', () => {
  it('should return the path with tenant id and collection', () => {
    expect(tenantPath('configuracion')).toBe(`tenants/${environment.tenantId}/configuracion`);
  });

  it('should handle different collection names', () => {
    expect(tenantPath('productos')).toBe(`tenants/${environment.tenantId}/productos`);
  });
});

describe('tenantDocPath', () => {
  it('should return the path with tenant id, collection and docId', () => {
    expect(tenantDocPath('configuracion', 'store')).toBe(
      `tenants/${environment.tenantId}/configuracion/store`
    );
  });
});

describe('resolveTenantId', () => {
  const ORIGINAL_TENANT_ID = environment.tenantId;
  const ORIGINAL_PRODUCTION = environment.production;

  afterEach(() => {
    environment.tenantId = ORIGINAL_TENANT_ID;
    environment.production = ORIGINAL_PRODUCTION;
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
      'mi-tienda'
    );
  });

  it('should parse vtx-{slug} pattern from hostname', () => {
    environment.tenantId = 'store';
    expect(resolveTenantId({ hostname: 'vtx-mi-tienda.example.com', search: '' })).toBe(
      'mi-tienda'
    );
  });

  it('should read tenantId from query param in non-production', () => {
    environment.tenantId = 'store';
    environment.production = false;
    expect(resolveTenantId({ hostname: 'localhost', search: '?tenantId=test-query-tenant' })).toBe(
      'test-query-tenant'
    );
  });

  it('should ignore query param in production mode', () => {
    environment.tenantId = 'store';
    environment.production = true;
    expect(resolveTenantId({ hostname: 'localhost', search: '?tenantId=test-query-tenant' })).toBe(
      'store'
    );
  });

  it('should handle firstLabel shorter than 4 in -vtx pattern', () => {
    environment.tenantId = 'store';
    expect(resolveTenantId({ hostname: 'ab-vtx.example.com', search: '' })).toBe('ab');
  });

  it('should handle firstLabel shorter than 4 in vtx- pattern', () => {
    environment.tenantId = 'store';
    expect(resolveTenantId({ hostname: 'vtx-ab.example.com', search: '' })).toBe('ab');
  });

  it('should return fallback when no hostname pattern matches and no query param', () => {
    environment.tenantId = 'store';
    expect(resolveTenantId({ hostname: 'some-other-host.com', search: '' })).toBe('store');
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
    expect(resolveTenantId({ hostname: 'example.com', search: '' })).toBe('');
  });

  it('should call tenantPath and tenantDocPath with resolved tenant', () => {
    environment.tenantId = 'test-tenant';
    expect(tenantPath('productos')).toBe('tenants/test-tenant/productos');
    expect(tenantDocPath('configuracion', 'store')).toBe('tenants/test-tenant/configuracion/store');
  });
});
