export const COLLECTIONS = {
  PRODUCTS: 'products',
  ORDERS: 'orders',
  SETTINGS: 'settings',
  MAIL: 'mail',
  CLIENTS: 'clients',
  ADMIN_ROLES: 'admin_roles',
  ATTRIBUTES: 'attributes',
};

export const DOCS = {
  EMAIL_TEMPLATES: 'emailTemplates',
};

/**
 * Flat root-level collection path for the storefront's Firestore.
 * Multi-tenant isolation is enforced via the `storeId` field on every document,
 * not via namespaced `tenants/{tenantId}/...` paths.
 */
export function collectionPath(collection: string): string {
  return collection;
}

/**
 * StoreId-keyed singleton doc path: `{collection}/{docId}_{storeId}`.
 * Used for per-store singletons such as settings/emailTemplates_{storeId}
 * and configuracion/store_{storeId}.
 */
export function singletonDoc(storeId: string, collection: string, docId: string): string {
  return `${collection}/${docId}_${storeId}`;
}
