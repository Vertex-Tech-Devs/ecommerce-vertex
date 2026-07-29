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

  it('returns config unchanged when projectId is missing', () => {
    const config = normalizeFirebaseOptions({
      apiKey: 'test-key',
      authDomain: 'example.firebaseapp.com',
      storageBucket: 'some-bucket.appspot.com',
    } as FirebaseOptions);

    expect(config.storageBucket).toBe('some-bucket.appspot.com');
  });

  it('normalizes authDomain to dev masterAuthDomain for dev shards', () => {
    const config = normalizeFirebaseOptions({
      ...baseConfig,
      projectId: 'vtx-sd-3bf1de61',
      authDomain: 'vtx-sd-3bf1de61.firebaseapp.com',
    });

    expect(config.authDomain).toBe('ecommerce-vertex-dev.firebaseapp.com');
  });

  it('normalizes authDomain to prod masterAuthDomain for prod projects', () => {
    const config = normalizeFirebaseOptions({
      ...baseConfig,
      projectId: 'ecommerce-vertex',
      authDomain: 'vtx-sd-prod.firebaseapp.com',
    });

    expect(config.authDomain).toBe('ecommerce-vertex.firebaseapp.com');
  });
});
