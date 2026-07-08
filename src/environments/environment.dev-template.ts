/**
 * Environment for the deployed shared-shard template on ecommerce-vertex-dev.
 * tenantId is intentionally 'store' so that the dynamic resolver kicks in
 * and uses hostname/query-param/localStorage to pick the right tenant at runtime.
 */
export const environment = {
  production: false,
  useEmulators: false,
  tenantId: 'store',
  firebaseConfig: {
    apiKey: 'AIzaSyCUTO8Dh3RpCh8wlp4ZYhTK1NBhDOQkbqY',
    authDomain: 'ecommerce-vertex-dev.firebaseapp.com',
    projectId: 'ecommerce-vertex-dev',
    storageBucket: 'ecommerce-vertex-dev.firebasestorage.app',
    messagingSenderId: '988454979046',
    appId: '1:988454979046:web:1bd66872e636fe1d5b0227',
  },
  mercadoPago: {
    publicKey: 'TEST-YOUR_PUBLIC_KEY',
  },
  api: {
    cloudFunctionsUrl: 'https://us-central1-ecommerce-vertex-dev.cloudfunctions.net',
  },
  features: {
    seedDataEnabled: true,
    debugLogging: false,
  },
};
