export const environment = {
  production: true,
  useEmulators: false,
  tenantId: '',
  firebaseConfig: {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
  },
  mercadoPago: {
    publicKey: '',
  },
  api: {
    cloudFunctionsUrl: 'https://us-central1-ecommerce-vertex.cloudfunctions.net',
  },
  features: {
    seedDataEnabled: false,
    debugLogging: false,
  },
};
