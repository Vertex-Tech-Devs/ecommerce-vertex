import { onCall, HttpsError, onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { getFirestore, FieldValue, Timestamp } from 'firebase-admin/firestore';
import { SecretManagerServiceClient } from '@google-cloud/secret-manager';
import { PaymentRequestSchema } from './core/payment.model';
import { createPreference, getPaymentDetails } from './core/mercadopago.service';
import { COLLECTIONS, collectionPath } from './core/config';
import { OrderItemSchema } from './core/order.model';
import * as crypto from 'crypto';

const db = getFirestore();
const secretsClient = new SecretManagerServiceClient();
const secretCache = new Map<string, string>();

function resolveProjectId(): string {
  return process.env['GCLOUD_PROJECT'] || process.env['GOOGLE_CLOUD_PROJECT'] || '';
}

function maskToken(token: string): string {
  const trimmed = token.trim();
  if (trimmed.length <= 8) return '********';
  return `${trimmed.slice(0, 4)}****${trimmed.slice(-4)}`;
}

async function upsertSecret(secretId: string, payload: string): Promise<void> {
  const projectId = resolveProjectId();
  if (!projectId) throw new Error('No se pudo resolver el projectId para Secret Manager.');

  const parent = `projects/${projectId}`;
  const secretName = `${parent}/secrets/${secretId}`;

  try {
    await secretsClient.createSecret({
      parent,
      secretId,
      secret: { replication: { automatic: {} } },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    if (!msg.includes('already exists') && !msg.includes('409')) {
      throw err;
    }
  }

  await secretsClient.addSecretVersion({
    parent: secretName,
    payload: { data: Buffer.from(payload, 'utf8') },
  });

  // Update memory cache
  secretCache.set(secretId, payload.trim());
}

async function resolveSecret(secretId: string): Promise<string> {
  if (secretCache.has(secretId)) {
    return secretCache.get(secretId)!;
  }
  const projectId = resolveProjectId();
  if (!projectId) return '';
  try {
    const [version] = await secretsClient.accessSecretVersion({
      name: `projects/${projectId}/secrets/${secretId}/versions/latest`,
    });
    const val = version.payload?.data?.toString().trim() || '';
    if (val) {
      secretCache.set(secretId, val);
    }
    return val;
  } catch (error) {
    logger.warn(`No se pudo leer el secreto ${secretId} de Secret Manager:`, error);
    return '';
  }
}

export const validateMercadoPagoCredentials = onCall(
  { cors: true, invoker: 'public' },
  async (request) => {
    if (!request.auth?.token?.['admin'] || !request.auth.token['tenantId']) {
      throw new HttpsError(
        'permission-denied',
        'Solo admins de tienda pueden validar credenciales de Mercado Pago.',
      );
    }

    const accessToken = String(request.data?.accessToken || '').trim();
    const webhook = String(request.data?.webhookUrl || '').trim();

    if (!accessToken) {
      throw new HttpsError('invalid-argument', 'El access token de Mercado Pago es obligatorio.');
    }

    if (webhook && !/^https:\/\//i.test(webhook)) {
      throw new HttpsError('invalid-argument', 'El webhook debe comenzar con https://');
    }

    try {
      const res = await fetch('https://api.mercadopago.com/users/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Mercado Pago respondió ${res.status}: ${text}`);
      }

      const user = (await res.json()) as { id?: number | string; email?: string };
      return {
        valid: true,
        accountEmail: user.email || undefined,
        userId: user.id ? String(user.id) : undefined,
        message: `Credenciales válidas para la cuenta ${user.email || 'sin email'}.`,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new HttpsError(
        'invalid-argument',
        `No se pudieron validar las credenciales de Mercado Pago. ${msg}`,
      );
    }
  },
);

export const upsertMercadoPagoCredentials = onCall(
  { cors: true, invoker: 'public' },
  async (request) => {
    if (!request.auth?.token?.['admin'] || !request.auth.token['tenantId']) {
      throw new HttpsError(
        'permission-denied',
        'Solo admins de tienda pueden actualizar credenciales de Mercado Pago.',
      );
    }

    const accessToken = String(request.data?.accessToken || '').trim();
    const webhook = String(request.data?.webhookUrl || '').trim();
    const tenantId = String(request.data?.tenantId || '').trim();

    // Scoping estricto: un admin SOLO puede configurar las credenciales de SU propia tienda.
    if (request.auth.token['tenantId'] !== tenantId) {
      throw new HttpsError(
        'permission-denied',
        'No tenés permisos para configurar las credenciales de esta tienda.',
      );
    }

    if (!accessToken) {
      throw new HttpsError('invalid-argument', 'El access token de Mercado Pago es obligatorio.');
    }

    if (!tenantId) {
      throw new HttpsError('invalid-argument', 'El tenantId es obligatorio.');
    }

    if (webhook && !/^https:\/\//i.test(webhook)) {
      throw new HttpsError('invalid-argument', 'El webhook debe comenzar con https://');
    }

    try {
      const res = await fetch('https://api.mercadopago.com/users/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          Accept: 'application/json',
        },
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Mercado Pago respondió ${res.status}: ${text}`);
      }

      const user = (await res.json()) as { id?: number | string; email?: string };
      // Secreto por tienda: evita token-confusion entre tenants en el caché compartido.
      const secretName = `mp-access-token-${tenantId}`;
      await upsertSecret(secretName, accessToken);

      // Persist the secret reference in the store's Firestore config so getMercadoPagoRuntimeConfig can find it
      // Los datos de pago se guardan en un documento PRIVADO (store_payments/{storeId}),
      // nunca en el doc público de configuración de la tienda.
      const configRef = db.collection('store_payments').doc(tenantId);
      await configRef.set(
        {
          payments: {
            mercadoPago: {
              accessTokenSecret: secretName,
              accessTokenMasked: maskToken(accessToken),
              accountEmail: user.email || '',
              accountUserId: user.id ? String(user.id) : '',
              validationStatus: 'valid',
              validationMessage: 'Validado correctamente',
              validatedAt: new Date().toISOString(),
            },
          },
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      );

      return {
        valid: true,
        accountEmail: user.email || undefined,
        userId: user.id ? String(user.id) : undefined,
        secretName,
        maskedToken: maskToken(accessToken),
        message: `Credenciales válidas para la cuenta ${user.email || 'sin email'} y guardadas en Secret Manager.`,
      };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      throw new HttpsError(
        'invalid-argument',
        `No se pudieron validar o guardar las credenciales de Mercado Pago. ${msg}`,
      );
    }
  },
);

async function revertStockOnFailure(orderId: string) {
  logger.info(`Iniciando reversón de stock para pedido cancelado/fallido: ${orderId}`);

  const orderRef = db.collection(collectionPath(COLLECTIONS.ORDERS)).doc(orderId);

  try {
    await db.runTransaction(async (transaction) => {
      const freshOrderDoc = await transaction.get(orderRef);
      if (!freshOrderDoc.exists) {
        logger.error(`Pedido ${orderId} no existe. No se puede revertir stock.`);
        return;
      }

      const orderData = freshOrderDoc.data();
      if (!orderData) {
        logger.error(`Pedido ${orderId} sin datos. No se puede revertir stock.`);
        return;
      }

      if (!orderData.stockDecremented) {
        logger.info(`Stock para pedido ${orderId} no fue decrementado. No se revierte.`);
        transaction.update(orderRef, { status: 'cancelled' });
        return;
      }

      for (const item of orderData.items) {
        const itemValidation = OrderItemSchema.safeParse(item);
        if (!itemValidation.success) {
          logger.warn(`Item inválido en pedido ${orderId} durante reversión.`, { item });
          continue;
        }
        const validItem = itemValidation.data;

        const variantRef = db
          .collection(collectionPath(COLLECTIONS.PRODUCTS))
          .doc(validItem.productId)
          .collection('variants')
          .doc(validItem.variantId);

        transaction.update(variantRef, {
          stock: FieldValue.increment(validItem.quantity),
        });
      }

      transaction.update(orderRef, {
        status: 'cancelled',
        stockDecremented: false,
        notes: 'Pago rechazado o cancelado. Stock devuelto.',
      });

      logger.info(`Stock revertido exitosamente para pedido ${orderId}.`);
    });
  } catch (error) {
    logger.error(`Error en transacción de reversión de stock para ${orderId}:`, error);
  }
}

export const createPaymentPreference = onCall(
  { cors: true, invoker: 'public' },
  async (request) => {
    const validationResult = PaymentRequestSchema.safeParse(request.data);
    if (!validationResult.success) {
      logger.warn('Solicitud de pago con datos inválidos.', {
        errors: validationResult.error.flatten(),
      });
      throw new HttpsError(
        'invalid-argument',
        'Los datos proporcionados para el pago no son válidos.',
      );
    }

    const paymentData = validationResult.data;
    const orderId = paymentData.external_reference;

    logger.info(`Iniciando creación de preferencia para el pedido: ${orderId}`);

    // Resolve order document in the flat orders collection
    const orderRef = db.collection(collectionPath(COLLECTIONS.ORDERS)).doc(orderId);

    try {
      const preference = await db.runTransaction(async (transaction) => {
        const orderDoc = await transaction.get(orderRef);
        if (!orderDoc.exists) {
          logger.error(`Intento de pago para una orden no existente: ${orderId}`);
          throw new HttpsError('not-found', `La orden con ID ${orderId} no fue encontrada.`);
        }

        const orderData = orderDoc.data();
        if (!orderData) throw new HttpsError('internal', 'Datos de orden corruptos.');

        if (orderData.status !== 'pending') {
          logger.warn(`Pedido ${orderId} ya procesado o en proceso. Estado: ${orderData.status}`);
          throw new HttpsError('failed-precondition', 'Este pedido ya fue procesado.');
        }

        // Precios SIEMPRE desde el catálogo del servidor — nunca del payload del cliente.
        const serverItems: typeof paymentData.items = [];

        for (const item of paymentData.items) {
          const productRef = db
            .collection(collectionPath(COLLECTIONS.PRODUCTS))
            .doc(item.productId);
          const variantRef = productRef.collection('variants').doc(item.variantId);

          const [productDoc, variantDoc] = await Promise.all([
            transaction.get(productRef),
            transaction.get(variantRef),
          ]);

          if (!variantDoc.exists || !productDoc.exists) {
            logger.error(
              `Variante ${item.variantId} no encontrada para producto ${item.productId}.`,
            );
            throw new HttpsError('not-found', `Producto ${item.title} no disponible.`);
          }

          const variantData = variantDoc.data();
          if (!variantData || variantData.stock < item.quantity) {
            logger.warn(
              `Stock insuficiente para ${item.title}. Solicitado: ${item.quantity}, Disponible: ${variantData?.stock || 0}`,
            );
            throw new HttpsError(
              'resource-exhausted',
              `Stock insuficiente para ${item.title}. Solo quedan ${variantData?.stock || 0}.`,
            );
          }

          // Precio oficial del servidor (finalPrice del producto en Firestore)
          const productData = productDoc.data() ?? {};
          const serverPrice =
            (productData['finalPrice'] as number | undefined) ??
            (productData['price'] as number | undefined) ??
            0;
          serverItems.push({
            productId: item.productId,
            variantId: item.variantId,
            title: item.title,
            quantity: item.quantity,
            unit_price: serverPrice,
          });
        }

        for (const item of paymentData.items) {
          const variantRef = db
            .collection(collectionPath(COLLECTIONS.PRODUCTS))
            .doc(item.productId)
            .collection('variants')
            .doc(item.variantId);

          transaction.update(variantRef, {
            stock: FieldValue.increment(-item.quantity),
          });
        }

        const storeId = (orderData as Record<string, unknown>)['storeId'] as string | undefined;
        const mpPreference = await createPreference(
          { ...paymentData, items: serverItems },
          storeId,
        );
        logger.info(`Preferencia ${mpPreference.id} creada para el pedido ${orderId}.`);

        transaction.update(orderRef, {
          mercadopago_preference_id: mpPreference.id,
          mercadopago_init_point: mpPreference.init_point,
          mercadopago_expiration_date: mpPreference.date_of_expiration
            ? Timestamp.fromDate(new Date(mpPreference.date_of_expiration))
            : null,
          status: 'processing',
          stockDecremented: true,
        });

        return mpPreference;
      });

      return {
        id: preference.id,
        init_point: preference.init_point,
      };
    } catch (error: any) {
      logger.error(`Error crítico al crear la preferencia de pago para ${orderId}:`, {
        errorMessage: error.message,
      });

      if (error instanceof HttpsError) {
        throw error;
      }

      throw new HttpsError('internal', 'No se pudo procesar la solicitud de pago.');
    }
  },
);

export const mercadoPagoWebhookHandler = onRequest(
  { maxInstances: 5, cors: true, invoker: 'public' },
  async (request, response) => {
    const incomingAction = String(request.body?.action ?? request.query.topic ?? '');
    const incomingPaymentId = String(request.body?.data?.id ?? request.query.id ?? '');
    logger.info(
      `Mercado Pago Webhook recibido: action=${incomingAction} paymentId=${incomingPaymentId}`,
    );

    // 1. Validar firma del webhook (fail-closed: sin secreto configurado NO se procesa)
    const webhookSecret = await resolveSecret('mp-webhook-secret');
    if (!webhookSecret) {
      logger.warn(
        "'mp-webhook-secret' no está configurado en Secret Manager. Rechazando webhook (fail-closed).",
      );
      response.status(503).send('Webhook secret not configured.');
      return;
    }

    const signature = request.headers['x-signature'] as string | undefined;
    const requestId = request.headers['x-request-id'] as string | undefined;

    if (!signature || !requestId) {
      logger.error('Firma de webhook faltante. x-signature o x-request-id no proporcionado.');
      response.status(401).send('No autorizado: Firma no válida.');
      return;
    }

    try {
      const parts = signature.split(',');
      const tsPart = parts.find((p) => p.startsWith('ts='));
      const v1Part = parts.find((p) => p.startsWith('v1='));

      if (!tsPart || !v1Part) {
        logger.error('Formato de x-signature inválido o incompleto.', { signature });
        response.status(400).send('Formato de firma inválido.');
        return;
      }

      const ts = tsPart.split('=')[1];
      const v1 = v1Part.split('=')[1];

      // Obtener el ID del recurso (se prefiere el del body o query)
      let resourceId = '';
      if (request.rawBody) {
        try {
          const parsed = JSON.parse(request.rawBody.toString('utf8'));
          resourceId = String(parsed.data?.id || request.query.id || '');
        } catch {
          resourceId = String(request.query.id || '');
        }
      } else {
        resourceId = String(request.query.id || '');
      }

      const manifest = `id:${resourceId};request-id:${requestId};ts:${ts};`;
      const hmac = crypto.createHmac('sha256', webhookSecret);
      hmac.update(manifest);
      const expectedSignature = hmac.digest('hex');

      let match = false;
      try {
        const expectedBuf = Buffer.from(expectedSignature, 'hex');
        const receivedBuf = Buffer.from(v1, 'hex');
        if (expectedBuf.length === receivedBuf.length) {
          match = crypto.timingSafeEqual(expectedBuf, receivedBuf);
        }
      } catch {
        match = false;
      }

      if (!match) {
        logger.error('La firma calculada no coincide con x-signature v1.', {
          expected: expectedSignature,
          received: v1,
        });
        response.status(401).send('No autorizado: Firma no coincide.');
        return;
      }

      logger.info('Firma de webhook de Mercado Pago validada con éxito.');
    } catch (err) {
      logger.error('Error al validar la firma de Mercado Pago:', err);
      response.status(500).send('Error de firma interno.');
      return;
    }

    // Mercado Pago envía notificaciones POST ({"action":"payment.created","data":{"id":"..."}})
    // y también GET legacy (?topic=payment&id=...). Se prioriza el body y se respalda con query.
    const topic = String(request.body?.type ?? request.query.topic ?? '');
    const paymentId = String(incomingPaymentId || request.query.id || '');

    if ((topic !== 'payment' && topic !== 'payment.created') || !paymentId) {
      logger.warn("Webhook ignorado. No es un 'payment' o no tiene 'id'.", { topic });
      response.status(200).send('Webhook ignorado.');
      return;
    }

    try {
      const payment = await getPaymentDetails(paymentId);
      if (!payment) {
        throw new Error(`Detalles del pago ${paymentId} no encontrados.`);
      }

      const orderId = payment.external_reference;
      const paymentStatus = payment.status;

      if (!orderId) {
        logger.error(`El pago ${paymentId} no tiene external_reference (orderId).`, { payment });
        response.status(200).send('Pago sin orderId.');
        return;
      }

      // Resolve order in the flat orders collection
      const orderRef = db.collection(collectionPath(COLLECTIONS.ORDERS)).doc(orderId);

      if (paymentStatus === 'approved') {
        logger.info(`Pago ${paymentId} (pedido ${orderId}) aprobado. Stock ya fue descontado.`);

        const orderDoc = await orderRef.get();
        if (orderDoc.exists && !orderDoc.data()?.stockDecremented) {
          logger.warn(
            `El pago ${paymentId} fue aprobado, pero el stock no estaba marcado como descontado. Re-ejecutando lógica de descuento.`,
          );

          await db.runTransaction(async (transaction) => {
            const orderData = orderDoc.data();
            if (!orderData) return;

            for (const item of orderData.items) {
              const itemValidation = OrderItemSchema.safeParse(item);
              if (!itemValidation.success) continue;
              const validItem = itemValidation.data;

              const variantRef = db
                .collection(collectionPath(COLLECTIONS.PRODUCTS))
                .doc(validItem.productId)
                .collection('variants')
                .doc(validItem.variantId);

              transaction.update(variantRef, {
                stock: FieldValue.increment(-validItem.quantity),
              });
            }

            transaction.update(orderRef, {
              'paymentDetails.paymentId': paymentId,
              status: 'processing',
              stockDecremented: true,
            });
          });
        } else {
          await orderRef.update({
            'paymentDetails.paymentId': paymentId,
            status: 'processing',
          });
        }
      } else if (paymentStatus === 'cancelled' || paymentStatus === 'rejected') {
        logger.warn(
          `Pago ${paymentId} (pedido ${orderId}) fue ${paymentStatus}. Revertiendo stock si es necesario.`,
        );
        await revertStockOnFailure(orderId);
      } else {
        logger.info(
          `Pago ${paymentId} (pedido ${orderId}) está en estado ${paymentStatus}. No se toma acción.`,
        );
      }

      logger.info(`Webhook para pago ${paymentId} procesado exitosamente.`);
      response.status(200).send('Webhook procesado.');
    } catch (error) {
      logger.error(`Error al procesar el webhook para pago ${paymentId}:`, error);
      response.status(500).send('Error interno al procesar webhook.');
    }
  },
);
