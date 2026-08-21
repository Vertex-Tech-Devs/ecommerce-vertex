import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { initializeApp, getApps } from 'firebase-admin/app';

/**
 * Resuelve el Firestore del proyecto/shard correcto.
 * - Sin projectId (o igual al del entorno): el Firestore local (master).
 * - Con un projectId de shard: una app dedicada.
 */
export function resolveTenantDb(projectId?: string): Firestore {
  const ownProject = process.env['GCLOUD_PROJECT'] || process.env['GOOGLE_CLOUD_PROJECT'] || '';
  if (!projectId || projectId === ownProject) {
    return getFirestore();
  }
  const appName = `shard-${projectId}`;
  let app = getApps().find((a) => a.name === appName);
  if (!app) {
    app = initializeApp({ projectId }, appName);
  }
  return getFirestore(app);
}
