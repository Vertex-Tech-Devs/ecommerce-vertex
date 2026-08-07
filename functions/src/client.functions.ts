import { onDocumentWritten } from 'firebase-functions/v2/firestore';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';
import * as logger from 'firebase-functions/logger';
import { OrderSchema } from './core/order.model';
import { COLLECTIONS, collectionPath } from './core/config';

const db = getFirestore();

export const onOrderWrittenUpdateClients = onDocumentWritten(
  `${COLLECTIONS.ORDERS}/{orderId}`,
  async (event) => {
    const afterSnap = event.data?.after;
    if (!afterSnap || !afterSnap.exists) {
      return;
    }

    const orderRaw = afterSnap.data() as Record<string, unknown>;
    const status = orderRaw['status'] as string | undefined;

    // Solo procesar clientes para compras pagadas/aprobadas
    if (status !== 'processing' && status !== 'approved') {
      return;
    }

    // Idempotencia
    if (orderRaw['clientProcessed'] === true) {
      return;
    }

    const validationResult = OrderSchema.safeParse(afterSnap.data());
    if (!validationResult.success) {
      logger.error(
        `Datos de la orden ${event.params.orderId} son inválidos y no se procesará el cliente.`,
        { errors: validationResult.error.flatten() },
      );
      return;
    }

    const order = validationResult.data;
    const clientEmail = order.clientEmail;
    const storeId = orderRaw['storeId'] as string | undefined;

    if (!clientEmail || !storeId) {
      logger.warn(`La orden ${event.params.orderId} no tiene email de cliente o storeId.`);
      return;
    }

    const clientRef = db.collection(COLLECTIONS.CLIENTS).doc(`${storeId}_${clientEmail}`);

    try {
      let isNewClient = false;
      await db.runTransaction(async (transaction) => {
        const clientDoc = await transaction.get(clientRef);

        if (!clientDoc.exists) {
          isNewClient = true;
          transaction.set(clientRef, {
            storeId,
            email: clientEmail,
            fullName: order.clientName,
            phone: order.clientPhone,
            firstOrderDate: afterSnap.createTime?.toDate() || new Date(),
            lastOrderDate: afterSnap.createTime?.toDate() || new Date(),
            numberOfOrders: 1,
            totalSpent: order.total,
          });
          logger.info(`Nuevo cliente registrado: ${clientEmail} (store: ${storeId})`);
        } else {
          transaction.update(clientRef, {
            fullName: order.clientName,
            phone: order.clientPhone,
            lastOrderDate: afterSnap.createTime?.toDate() || new Date(),
            numberOfOrders: FieldValue.increment(1),
            totalSpent: FieldValue.increment(order.total),
          });
          logger.info(`Cliente actualizado: ${clientEmail} (store: ${storeId})`);
        }
      });

      // Si es la primera compra del cliente, encolar un email de bienvenida
      if (isNewClient) {
        const expirationDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
        const welcomeHtml = `<div style="font-family: sans-serif; padding: 24px; color: #333;">
          <h2 style="color: #111;">¡Bienvenido/a, ${order.clientName}!</h2>
          <p>Gracias por tu primera compra. Nos alegra tenerte como cliente.</p>
          <p>Tu pedido <strong>#${event.params.orderId}</strong> ha sido confirmado y está en preparación.</p>
        </div>`;

        await db.collection(collectionPath(COLLECTIONS.MAIL)).add({
          storeId,
          to: [clientEmail],
          message: {
            subject: `¡Bienvenido/a a nuestra tienda!`,
            html: welcomeHtml,
          },
          expireAt: expirationDate,
        });
        logger.info(`Email de bienvenida encolado para el nuevo cliente ${clientEmail}`);
      }

      await afterSnap.ref.update({ clientProcessed: true });
    } catch (error) {
      logger.error(`Error en la transacción al procesar cliente ${clientEmail}`, { error });
    }
  },
);
