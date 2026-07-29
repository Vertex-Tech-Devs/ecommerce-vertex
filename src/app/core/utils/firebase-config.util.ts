import type { FirebaseOptions } from 'firebase/app';

/**
 * Ensures storageBucket matches the Firebase project.
 * Provisioning occasionally persisted a platform bucket on shard stores, which
 * breaks uploads because the bucket hostname may not exist or lack CORS.
 */
export function normalizeFirebaseOptions(config: FirebaseOptions): FirebaseOptions {
  const projectId = config.projectId?.trim();
  if (!projectId) {
    return config;
  }

  const normalized: FirebaseOptions = { ...config };

  // 1. Ensure storageBucket matches the Firebase project
  const storageBucket = config.storageBucket?.trim() ?? '';
  const bucketProject = storageBucket.split('.')[0] ?? '';
  if (!storageBucket || bucketProject !== projectId) {
    normalized.storageBucket = `${projectId}.appspot.com`;
  }

  // 2. Set authDomain to masterAuthDomain so Google OAuth uses the master authorized redirect_uri
  const isProd = projectId === 'ecommerce-vertex' || projectId === 'vertex-platform-app';
  normalized.authDomain = isProd
    ? 'ecommerce-vertex.firebaseapp.com'
    : 'ecommerce-vertex-dev.firebaseapp.com';

  return normalized;
}
