import { Firestore, FieldValue } from 'firebase-admin/firestore';
import * as logger from 'firebase-functions/logger';
import { COLLECTIONS, collectionPath } from './core/config';
import { OrderSchema } from './core/order.model';

export interface ClientRegisterResult {
  registered: boolean;
  clientEmail?: string;
}

/**
 * upsertClientFromOrder — Registra/actualiza el cliente en la base del SHARD (tenantDb),
 * donde realmente viven las órdenes. El trigger maestro `onOrderWrittenUpdateClients`
 * no alcanza las órdenes de shard (escribes en proyectos distintos), por eso el alta
 * se ejecuta en el origen: webhook de pago aprobado y reintentos manuales.
 */
export async function upsertClientFromOrder(
  tenantDb: Firestore,
  orderId: string,
  orderRaw: Record<string, unknown>,
): Promise<ClientRegisterResult> {
  const status = String(orderRaw['status'] || '');
  if (status !== 'processing' && status !== 'approved') {
    return { registered: false };
  }
  if (orderRaw['clientProcessed'] === true) {
    return { registered: false };
  }

  const parsed = OrderSchema.safeParse({ id: orderId, ...orderRaw });
  if (!parsed.success) {
    logger.error(
      `[ClientRegistry] Orden ${orderId} inválida; no se registra cliente.`,
      { errors: parsed.error.flatten() },
    );
    return { registered: false };
  }
  const order = parsed.data;
  const clientEmail = order.clientEmail;
  const storeId = String(orderRaw['storeId'] || '');
  if (!clientEmail || !storeId) {
    logger.warn(`[ClientRegistry] Orden ${orderId} sin clientEmail o storeId.`);
    return { registered: false };
  }

  const orderRef = tenantDb.collection(collectionPath(COLLECTIONS.ORDERS)).doc(orderId);
  const clientRef = tenantDb.collection(COLLECTIONS.CLIENTS).doc(`${storeId}_${clientEmail}`);

  try {
    let isNew = false;
    let created = false;
    await tenantDb.runTransaction(async (tx) => {
      const freshOrder = await tx.get(orderRef);
      const fresh = freshOrder.exists ? (freshOrder.data() as Record<string, unknown>) : orderRaw;
      const s = String(fresh['status'] || '');
      if (s !== 'processing' && s !== 'approved') return;
      if (fresh['clientProcessed'] === true) return;

      const clientDoc = await tx.get(clientRef);
      const now = freshOrder.createTime?.toDate() || new Date();
      if (!clientDoc.exists) {
        isNew = true;
        created = true;
        tx.set(clientRef, {
          storeId,
          email: clientEmail,
          fullName: order.clientName,
          phone: order.clientPhone,
          firstOrderDate: now,
          lastOrderDate: now,
          numberOfOrders: 1,
          totalSpent: order.total,
        });
        logger.info(`[ClientRegistry] Nuevo cliente: ${clientEmail} (store ${storeId}, orden ${orderId})`);
      } else {
        created = true;
        tx.update(clientRef, {
          fullName: order.clientName,
          phone: order.clientPhone,
          lastOrderDate: now,
          numberOfOrders: FieldValue.increment(1),
          totalSpent: FieldValue.increment(order.total),
        });
        logger.info(`[ClientRegistry] Cliente actualizado: ${clientEmail} (store ${storeId}, orden ${orderId})`);
      }
      tx.update(orderRef, { clientProcessed: true });
    });

    if (isNew) {
      try {
        await tenantDb.collection(collectionPath(COLLECTIONS.MAIL)).add({
          storeId,
          to: [clientEmail],
          message: {
            subject: `¡Bienvenido/a a nuestra tienda!`,
            html: `<div style="font-family: sans-serif; padding: 24px; color: #333;">
              <h2 style="color: #111;">¡Bienvenido/a, ${order.clientName}!</h2>
              <p>Gracias por tu primera compra. Nos alegra tenerte como cliente.</p>
              <p>Tu pedido <strong>#${orderId}</strong> ha sido confirmado y está en preparación.</p>
            </div>`,
          },
          expireAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        });
      } catch (mailErr) {
        logger.warn(`[ClientRegistry] No se pudo encolar mail de bienvenida para ${clientEmail}:`, mailErr);
      }
    }

    return { registered: created, clientEmail };
  } catch (err) {
    logger.error(`[ClientRegistry] Error registrando cliente para orden ${orderId}:`, err);
    return { registered: false, clientEmail };
  }
}
