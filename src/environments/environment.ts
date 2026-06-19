export const environment = {
  production: false,
  tenantId: 'tienda-dos',
  firebaseConfig: {
    apiKey: 'demo-api-key',
    authDomain: 'demo-vertex.firebaseapp.com',
    projectId: 'demo-vertex',
    storageBucket: 'demo-vertex.firebasestorage.app',
    messagingSenderId: '00000000000',
    appId: '1:00000000000:web:00000000000',
  },
  mercadoPago: {
    publicKey: 'TEST-YOUR_PUBLIC_KEY',
  },
  api: {
    cloudFunctionsUrl: 'http://localhost:5001/demo-vertex/us-central1',
  },
  features: {
    seedDataEnabled: true,
    debugLogging: false,
  },
};
