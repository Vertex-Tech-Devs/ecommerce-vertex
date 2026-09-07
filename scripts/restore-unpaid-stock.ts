/**
 * restore-unpaid-stock.ts — Restitución inmediata de stock para órdenes que fueron
 * descontadas por el flujo LEGACY (descuento en createPaymentPreference) y que NUNCA
 * fueron pagadas.
 *
 * CRITERIO CONSERVADOR (evita tocar ventas reales):
 *   - stockDecremented === true
 *   - status en ['processing','pending','PENDING_PAYMENT']  (viva, sin terminal de pago)
 *   - paymentStatus !== 'approved'  y  !paidAt
 *   - SIN paymentDetails.paymentId  (las órdenes pagadas legacy SIEMPRE registran el id)
 *   - creada hace > 60 min (no interferir con un pago en curso)
 *
 * Acción: restituye unidades a variants/{id}.stock y products/{id}.totalStock,
 * marca la orden status:'CANCELLED_UNPAID', stockDecremented:false y emite reporte
 * [Orden ID] | [Producto ID] | [Cantidad Restituida].
 *
 * Autenticación: SA JSON del proyecto a auditar vía env (igual que el resto de scripts):
 *   FIREBASE_SERVICE_ACCOUNT (prod, p.ej. ecommerce-vertex) o
 *   FIREBASE_SERVICE_ACCOUNT_DEV (dev, ecommerce-vertex-dev).
 * Flags: --dry-run (default: ejecutar) | --older-than-min=<min> | --project-id=<id>
 *
 * Ejecución: npx tsx scripts/restore-unpaid-stock.ts
 */
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';

const DRY_RUN = process.argv.includes('--dry-run');
const olderThanMin = Number(
  process.argv.find((a) => a.startsWith('--older-than-min='))?.split('=')[1] ?? 60,
);

async function main(): Promise<void> {
  const saJson =
    process.env['FIREBASE_SERVICE_ACCOUNT'] || process.env['FIREBASE_SERVICE_ACCOUNT_DEV'];
  if (!saJson) {
    console.log(
      '[restore-unpaid-stock] No FIREBASE_SERVICE_ACCOUNT(_DEV) provisto. ' +
        'Ejecutar con la SA del proyecto (orchestrator) para poder escribir en los shards.',
    );
    return;
  }
  const credentials = JSON.parse(saJson);
  if (!getApps().length) {
    initializeApp({ credential: cert(credentials) });
  }
  const db = getFirestore();
  const cutoff = Timestamp.fromDate(new Date(Date.now() - olderThanMin * 60_000));
  const paidStates = new Set(['approved', 'paid']);
  const liveStates = new Set(['pending', 'processing', 'PENDING_PAYMENT']);

  console.log(
    `[restore-unpaid-stock] Proyecto ${credentials.project_id} | dryRun=${DRY_RUN} | olderThan=${olderThanMin}min`,
  );

  const snap = await db
    .collection('orders')
    .where('stockDecremented', '==', true)
    .limit(1000)
    .get();

  const restored: string[] = [];
  let candidates = 0;

  for (const doc of snap.docs) {
    const o = doc.data();
    const orderId = doc.id;
    const status = String(o.status || '');
    const paymentStatus = String(o.paymentStatus || '');
    const paidAt = o.paidAt;
    const paymentId = (o.paymentDetails as any)?.paymentId;
    const createdAt = o.createdAt || o.orderDate || o.checkoutStartedAt;

    if (!liveStates.has(status)) continue; // ya cancelada/entregada/despachada
    if (paidStates.has(paymentStatus) || paidAt) continue; // pagada
    if (paymentId) continue; // pagada en legacy (webhook registró paymentId)
    if (!createdAt || createdAt.toMillis?.() > cutoff.toMillis?.()) continue; // muy reciente

    candidates += 1;
    const items: any[] = Array.isArray(o.items) ? o.items : [];
    const reportLines = items
      .filter((it) => it.productId && Number(it.quantity || 0) > 0)
      .map((it) => `${orderId} | ${it.productId} | ${Number(it.quantity)}`);

    if (DRY_RUN) {
      restored.push(...reportLines);
      continue;
    }

    await db.runTransaction(async (tx) => {
      const fresh = await tx.get(doc.ref);
      const freshData = fresh.data();
      if (!freshData || freshData.stockDecremented !== true) return; // ya restituida
      const freshStatus = String(freshData.status || '');
      if (!liveStates.has(freshStatus)) return;
      if (freshData.paymentStatus && paidStates.has(String(freshData.paymentStatus))) return;
      if (freshData.paymentDetails?.paymentId) return;

      for (const item of items) {
        const productId = item.productId;
        const variantId = item.variantId || 'default';
        const qty = Number(item.quantity || 0);
        if (!productId || qty <= 0) continue;
        const productRef = db.collection('products').doc(productId);
        const variantRef = productRef.collection('variants').doc(variantId);
        const [pDoc, vDoc] = await Promise.all([tx.get(productRef), tx.get(variantRef)]);
        if (vDoc.exists) {
          tx.update(variantRef, { stock: FieldValue.increment(qty) });
        }
        if (pDoc.exists) {
          tx.update(productRef, { totalStock: FieldValue.increment(qty) });
        }
      }
      tx.update(doc.ref, {
        status: 'CANCELLED_UNPAID',
        stockDecremented: false,
        restoredAt: new Date(),
        notes: 'Stock restituido por restore-unpaid-stock (pedido nunca pagado).',
      });
    });
    restored.push(...reportLines);
  }

  if (DRY_RUN) {
    console.log(`[restore-unpaid-stock] DRY-RUN: ${candidates} candidata(s). Reporte:`);
  } else {
    console.log(`[restore-unpaid-stock] ${candidates} orden(es) restituida(s). Reporte:`);
  }
  for (const line of restored) {
    console.log(line);
  }
  console.log('[restore-unpaid-stock] Fin.');
}

main().catch((err) => {
  console.error('[restore-unpaid-stock] Error:', err);
  process.exit(1);
});
