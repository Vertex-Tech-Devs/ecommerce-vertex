import type { FirebaseOptions } from 'firebase/app';
import { normalizeFirebaseOptions } from './firebase-config.util';

describe('normalizeFirebaseOptions', () => {
  const baseConfig: FirebaseOptions = {
    apiKey: 'test-key',
    authDomain: 'ecommerce-vertex-dev.firebaseapp.com',
    projectId: 'ecommerce-vertex-dev',
    messagingSenderId: '123',
    appId: 'app-id',
  };

  it('keeps a storage bucket that matches the project id', () => {
    const config = normalizeFirebaseOptions({
      ...baseConfig,
      storageBucket: 'ecommerce-vertex-dev.firebasestorage.app',
    });

    expect(config.storageBucket).toBe('ecommerce-vertex-dev.firebasestorage.app');
  });

  it('replaces a mismatched storage bucket with the project default bucket', () => {
    const config = normalizeFirebaseOptions({
      ...baseConfig,
      storageBucket: 'vertex-platform-dev.firebasestorage.app',
    });

    expect(config.storageBucket).toBe('ecommerce-vertex-dev.appspot.com');
  });

  it('fills in a missing storage bucket', () => {
    const config = normalizeFirebaseOptions(baseConfig);

    expect(config.storageBucket).toBe('ecommerce-vertex-dev.appspot.com');
  });
});
