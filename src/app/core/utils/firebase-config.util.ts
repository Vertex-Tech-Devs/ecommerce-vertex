import type { FirebaseOptions } from 'firebase/app';

/**
 * Ensures storageBucket matches the Firebase project.
 * Provisioning occasionally persisted a platform bucket on shard stores, which
 * breaks uploads because the bucket hostname may not exist or lack CORS.
 */
export function normalizeFirebaseOptions(config: FirebaseOptions): FirebaseOptions {
  let projectId = config.projectId?.trim();
  if (!projectId) {
    const authProject = config.authDomain?.trim().split('.')[0];
    const storageProject = config.storageBucket?.trim().split('.')[0];
    projectId = authProject ?? storageProject;
    if (projectId) {
      config.projectId = projectId;
    }
  }

  if (!projectId) {
    return config;
  }

  const normalized: FirebaseOptions = { ...config, projectId };

  // 1. Ensure storageBucket matches the Firebase project
  const storageBucket = config.storageBucket?.trim() ?? '';
  const bucketProject = storageBucket.split('.')[0] ?? '';
  if (!storageBucket || bucketProject !== projectId) {
    normalized.storageBucket = `${projectId}.appspot.com`;
  }

  // 2. Ensure authDomain is set, defaulting to platform master authDomain
  const authDomain = config.authDomain?.trim();
  if (!authDomain) {
    normalized.authDomain = 'ecommerce-vertex-dev.firebaseapp.com';
  }

  return normalized;
}
