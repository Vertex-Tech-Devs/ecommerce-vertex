import { environment } from '../../../environments/environment';

export function tenantPath(collection: string): string {
  return `tenants/${environment.tenantId}/${collection}`;
}

/**
 * Resolves the tenant ID with the following priority:
 * 1. environment.tenantId (baked at build time, or set by provisioning)
 * 2. Hostname parsing: supports {slug}-vtx and vtx-{slug} patterns
 * 3. Query parameter ?tenantId= override (non-production only)
 * 4. Empty string fallback
 *
 * @param locationOverride Optional Location-like object for testing (defaults to globalThis.location)
 */
export function resolveTenantId(locationOverride?: { hostname: string; search: string }): string {
  // Priority 1: explicit tenantId from environment
  if (environment.tenantId && environment.tenantId !== 'store') {
    return environment.tenantId;
  }

  const loc =
    locationOverride ?? (typeof globalThis !== 'undefined' ? globalThis.location : undefined);

  // Priority 2: infer from hostname
  if (loc) {
    const host = loc.hostname?.trim().toLowerCase();
    if (host && host !== 'localhost' && host !== '127.0.0.1') {
      const firstLabel = host.split('.')[0] ?? '';

      // Handle {slug}-vtx pattern (e.g., "tienda-a-vtx" → "tienda-a")
      if (firstLabel.endsWith('-vtx') && firstLabel.length > 4) {
        return firstLabel.slice(0, -4);
      }

      // Handle vtx-{slug} pattern (e.g., "vtx-tienda-a" → "tienda-a")
      if (firstLabel.startsWith('vtx-') && firstLabel.length > 4) {
        return firstLabel.substring(4);
      }
    }

    // Priority 3: query param override (non-production only)
    if (!environment.production) {
      const urlParams = new URLSearchParams(loc.search);
      const queryTenantId = urlParams.get('tenantId');
      if (queryTenantId) {
        return queryTenantId.trim();
      }
    }
  }

  // Priority 4: fall back to whatever environment has (even if empty)
  return environment.tenantId || '';
}
