import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

async function main(): Promise<void> {
  const prNumber = process.env['PR_NUMBER'];
  const saJson = process.env['FIREBASE_SERVICE_ACCOUNT_DEV'];

  if (!prNumber) {
    console.log('No PR_NUMBER specified. Skipping cleanup.');
    return;
  }

  if (!saJson) {
    console.log('No FIREBASE_SERVICE_ACCOUNT_DEV provided. Skipping cleanup.');
    return;
  }

  const tenantId = `vtx-pr-${prNumber}`;
  console.log(`Cleaning up Firestore data for tenantId: ${tenantId}...`);

  const credentials = JSON.parse(saJson);
  if (!getApps().length) {
    initializeApp({
      credential: cert(credentials),
    });
  }

  const db = getFirestore();
  const collections = ['products', 'categories', 'clients', 'orders', 'attributes'];

  for (const col of collections) {
    const snap = await db.collection(col).where('storeId', '==', tenantId).get();
    if (!snap.empty) {
      const batch = db.batch();
      snap.docs.forEach((docSnap) => batch.delete(docSnap.ref));
      await batch.commit();
      console.log(`Deleted ${snap.docs.length} documents from ${col} for tenant ${tenantId}`);
    }
  }

  const configDocs = [
    db.collection('banners').doc(`home_${tenantId}`),
    db.collection('pages').doc(`aboutUs_${tenantId}`),
    db.collection('configuracion').doc(`store_${tenantId}`),
    db.collection('configuracion').doc(`footer_${tenantId}`),
    db.collection('configuracion').doc(`hero_${tenantId}`),
  ];

  for (const docRef of configDocs) {
    await docRef.delete().catch(() => null);
  }

  console.log(`Successfully cleaned up all Firestore data for tenantId ${tenantId}.`);
}

main().catch((err) => {
  console.error('Error during tenant cleanup:', err);
  process.exit(0);
});
