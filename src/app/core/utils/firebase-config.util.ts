import type { FirebaseOptions } from 'firebase/app';

/**
 * Ensures storageBucket matches the Firebase project, and preserves or defaults
 * authDomain to match the project ID to avoid auth/invalid-continue-uri errors.
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

  // 2. Preserve explicit authDomain, or default to `${projectId}.firebaseapp.com`
  // Mismatched authDomain vs apiKey/projectId triggers auth/invalid-continue-uri in Firebase Auth.
  const authDomain = config.authDomain?.trim();
  if (!authDomain) {
    normalized.authDomain = `${projectId}.firebaseapp.com`;
  } else {
    normalized.authDomain = authDomain;
  }

  return normalized;
}
