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

  it('infers projectId from authDomain when projectId is missing', () => {
    const config = normalizeFirebaseOptions({
      apiKey: 'test-key',
      authDomain: 'example.firebaseapp.com',
      storageBucket: 'some-bucket.appspot.com',
    } as FirebaseOptions);

    expect(config.projectId).toBe('example');
    expect(config.storageBucket).toBe('example.appspot.com');
  });

  it('normalizes a mismatched authDomain to the shard project authDomain', () => {
    const config = normalizeFirebaseOptions({
      ...baseConfig,
      projectId: 'vtx-sd-3bf1de61',
      authDomain: 'ecommerce-vertex-dev.firebaseapp.com',
    });

    expect(config.authDomain).toBe('vtx-sd-3bf1de61.firebaseapp.com');
  });

  it('keeps matching authDomain intact', () => {
    const config = normalizeFirebaseOptions({
      ...baseConfig,
      projectId: 'vtx-sd-3bf1de61',
      authDomain: 'vtx-sd-3bf1de61.firebaseapp.com',
    });

    expect(config.authDomain).toBe('vtx-sd-3bf1de61.firebaseapp.com');
  });
});
