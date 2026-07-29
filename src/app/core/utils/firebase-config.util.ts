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

  // 2. Ensure authDomain matches the shard project ID to prevent Google OAuth redirect_uri_mismatch
  const authDomain = config.authDomain?.trim() ?? '';
  const authProject = authDomain.split('.')[0] ?? '';
  if (!authDomain || (authProject !== projectId && authDomain !== `${projectId}.firebaseapp.com`)) {
    normalized.authDomain = `${projectId}.firebaseapp.com`;
  }

  return normalized;
}
