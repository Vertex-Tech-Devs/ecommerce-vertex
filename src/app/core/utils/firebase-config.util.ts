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

  const storageBucket = config.storageBucket?.trim() ?? '';
  const bucketProject = storageBucket.split('.')[0] ?? '';

  if (!storageBucket || bucketProject !== projectId) {
    return {
      ...config,
      storageBucket: `${projectId}.appspot.com`,
    };
  }

  return config;
}
