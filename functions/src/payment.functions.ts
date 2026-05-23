import { onCall, HttpsError, onRequest } from "firebase-functions/v2/https";
import * as logger from "firebase-functions/logger";
import { getFirestore, FieldValue, Timestamp } from "firebase-admin/firestore";
import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { PaymentRequestSchema } from "./core/payment.model";
import { createPreference, getPaymentDetails } from "./core/mercadopago.service";
import { COLLECTIONS } from "./core/config";
import { OrderItemSchema } from "./core/order.model";

const db = getFirestore();
const secretsClient = new SecretManagerServiceClient();

function resolveProjectId(): string {
  return process.env["GCLOUD_PROJECT"] || process.env["GOOGLE_CLOUD_PROJECT"] || "";
}

function maskToken(token: string): string {
  const trimmed = token.trim();
  if (trimmed.length <= 8) return "********";
  return `${trimmed.slice(0, 4)}****${trimmed.slice(-4)}`;
}

async function upsertSecret(secretId: string, payload: string): Promise<void> {
  const projectId = resolveProjectId();
  if (!projectId) throw new Error("No se pudo resolver el projectId para Secret Manager.");

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
    payload: { data: Buffer.from(payload, "utf8") },
  });
}

export const validateMercadoPagoCredentials = onCall(async (request) => {
  if (!request.auth?.token?.['admin']) {
    throw new HttpsError('permission-denied', 'Solo admins pueden validar credenciales de Mercado Pago.');
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

    const user = await res.json() as { id?: number | string; email?: string };
    return {
      valid: true,
      accountEmail: user.email || undefined,
      userId: user.id ? String(user.id) : undefined,
      message: `Credenciales válidas para la cuenta ${user.email || 'sin email'}.`,
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    throw new HttpsError('invalid-argument', `No se pudieron validar las credenciales de Mercado Pago. ${msg}`);
  }
});

export const upsertMercadoPagoCredentials = onCall(async (request) => {
  if (!request.auth?.token?.['admin']) {
    throw new HttpsError('permission-denied', 'Solo admins pueden actualizar credenciales de Mercado Pago.');
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

    const user = await res.json() as { id?: number | string; email?: string };
    const secretName = 'mp-access-token';
    await upsertSecret(secretName, accessToken);

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
    throw new HttpsError('invalid-argument', `No se pudieron validar o guardar las credenciales de Mercado Pago. ${msg}`);
  }
});

async function revertStockOnFailure(orderId: string) {
  logger.info(`Iniciando reversión de stock para pedido cancelado/fallido: ${orderId}`);
  const orderRef = db.collection(COLLECTIONS.ORDERS).doc(orderId);

  try {
    await db.runTransaction(async (transaction) => {
      const orderDoc = await transaction.get(orderRef);
      if (!orderDoc.exists) {
        logger.error(`Pedido ${orderId} no existe. No se puede revertir stock.`);
        return;
      }

      const orderData = orderDoc.data();
      if (!orderData) {
        logger.error(`Pedido ${orderId} sin datos. No se puede revertir stock.`);
        return;
      }

      if (!orderData.stockDecremented) {
        logger.info(`Stock para pedido ${orderId} no fue decrementado. No se revierte.`);
        transaction.update(orderRef, { status: "cancelled" });
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
          .collection(COLLECTIONS.PRODUCTS)
          .doc(validItem.productId)
          .collection("variants")
          .doc(validItem.variantId);
        
        transaction.update(variantRef, {
          stock: FieldValue.increment(validItem.quantity)
        });
      }

      transaction.update(orderRef, {
        status: "cancelled",
        stockDecremented: false,
        notes: "Pago rechazado o cancelado. Stock devuelto."
      });

      logger.info(`Stock revertido exitosamente para pedido ${orderId}.`);
    });
  } catch (error) {
    logger.error(`Error en transacción de reversión de stock para ${orderId}:`, error);
  }
}

export const createPaymentPreference = onCall(async (request) => {
  const validationResult = PaymentRequestSchema.safeParse(request.data);
  if (!validationResult.success) {
    logger.warn("Solicitud de pago con datos inválidos.", {
      errors: validationResult.error.flatten(),
      rawData: request.data,
    });
    throw new HttpsError("invalid-argument", "Los datos proporcionados para el pago no son válidos.");
  }

  const paymentData = validationResult.data;
  const orderId = paymentData.external_reference;
  
  logger.info(`Iniciando creación de preferencia para el pedido: ${orderId}`);
  const orderRef = db.collection(COLLECTIONS.ORDERS).doc(orderId);

  try {
    const preference = await db.runTransaction(async (transaction) => {
      const orderDoc = await transaction.get(orderRef);
      if (!orderDoc.exists) {
        logger.error(`Intento de pago para una orden no existente: ${orderId}`);
        throw new HttpsError("not-found", `La orden con ID ${orderId} no fue encontrada.`);
      }

      const orderData = orderDoc.data();
      if (!orderData) throw new HttpsError("internal", "Datos de orden corruptos.");

      if (orderData.status !== "pending") {
        logger.warn(`Pedido ${orderId} ya procesado o en proceso. Estado: ${orderData.status}`);
        throw new HttpsError("failed-precondition", "Este pedido ya fue procesado.");
      }

      for (const item of paymentData.items) {
        const variantRef = db
          .collection(COLLECTIONS.PRODUCTS)
          .doc(item.productId)
          .collection("variants")
          .doc(item.variantId);
        
        const variantDoc = await transaction.get(variantRef);

        if (!variantDoc.exists) {
          logger.error(`Variante ${item.variantId} no encontrada para producto ${item.productId}.`);
          throw new HttpsError("not-found", `Producto ${item.title} no disponible.`);
        }
        
        const variantData = variantDoc.data();
        if (!variantData || variantData.stock < item.quantity) {
          logger.warn(`Stock insuficiente para ${item.title}. Solicitado: ${item.quantity}, Disponible: ${variantData?.stock || 0}`);
          throw new HttpsError("resource-exhausted", `Stock insuficiente para ${item.title}. Solo quedan ${variantData?.stock || 0}.`);
        }
      }

      for (const item of paymentData.items) {
        const variantRef = db
          .collection(COLLECTIONS.PRODUCTS)
          .doc(item.productId)
          .collection("variants")
          .doc(item.variantId);
        
        transaction.update(variantRef, {
          stock: FieldValue.increment(-item.quantity)
        });
      }

      const mpPreference = await createPreference(paymentData);
      logger.info(`Preferencia ${mpPreference.id} creada para el pedido ${orderId}.`);

      transaction.update(orderRef, {
        mercadopago_preference_id: mpPreference.id,
        mercadopago_init_point: mpPreference.init_point,
        mercadopago_expiration_date: mpPreference.date_of_expiration ? Timestamp.fromDate(new Date(mpPreference.date_of_expiration)) : null,
        status: "processing",
        stockDecremented: true
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
    
    throw new HttpsError("internal", "No se pudo procesar la solicitud de pago.");
  }
});

export const mercadoPagoWebhookHandler = onRequest({ maxInstances: 5 }, async (request, response) => {
  logger.info("Mercado Pago Webhook recibido:", { body: request.body, query: request.query });

  const topic = request.query.topic as string;
  const paymentId = request.query.id as string;

  if (topic !== "payment" || !paymentId) {
    logger.warn("Webhook ignorado. No es un 'payment' o no tiene 'id'.", { topic });
    response.status(200).send("Webhook ignorado.");
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
      response.status(200).send("Pago sin orderId.");
      return;
    }

    const orderRef = db.collection(COLLECTIONS.ORDERS).doc(orderId);

    if (paymentStatus === "approved") {
      logger.info(`Pago ${paymentId} (pedido ${orderId}) aprobado. Stock ya fue descontado.`);
      
      const orderDoc = await orderRef.get();
      if (orderDoc.exists && !orderDoc.data()?.stockDecremented) {
         logger.warn(`El pago ${paymentId} fue aprobado, pero el stock no estaba marcado como descontado. Re-ejecutando lógica de descuento.`);
         
         await db.runTransaction(async (transaction) => {
           const orderData = orderDoc.data();
           if (!orderData) return;

           for (const item of orderData.items) {
             const itemValidation = OrderItemSchema.safeParse(item);
             if (!itemValidation.success) continue;
             const validItem = itemValidation.data;

             const variantRef = db
               .collection(COLLECTIONS.PRODUCTS)
               .doc(validItem.productId)
               .collection("variants")
               .doc(validItem.variantId);
             
             transaction.update(variantRef, {
               stock: FieldValue.increment(-validItem.quantity)
             });
           }
           
           transaction.update(orderRef, { 
             "paymentDetails.paymentId": paymentId,
             status: "processing",
             stockDecremented: true
           });
         });
      } else {
         await orderRef.update({ 
           "paymentDetails.paymentId": paymentId,
           status: "processing"
         });
      }

    } else if (paymentStatus === "cancelled" || paymentStatus === "rejected") {
      logger.warn(`Pago ${paymentId} (pedido ${orderId}) fue ${paymentStatus}. Revertiendo stock si es necesario.`);
      await revertStockOnFailure(orderId);
    } else {
      logger.info(`Pago ${paymentId} (pedido ${orderId}) está en estado ${paymentStatus}. No se toma acción.`);
    }

    logger.info(`Webhook para pago ${paymentId} procesado exitosamente.`);
    response.status(200).send("Webhook procesado.");

  } catch (error) {
    logger.error(`Error al procesar el webhook para pago ${paymentId}:`, error);
    response.status(500).send("Error interno al procesar webhook.");
  }
});