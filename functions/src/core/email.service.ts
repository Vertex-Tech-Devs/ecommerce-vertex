import * as admin from "firebase-admin";
import type { Order } from "./order.model";
import { logger } from "firebase-functions";

const db = admin.firestore();
const MAIL_COLLECTION = "mail";

function generateConfirmationEmailHtml(orderId: string, orderData: Order): string {
  const itemsHtml = orderData.items
    .map(item => `<li>${item.productName} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</li>`)
    .join("");

  return `<h1>¡Gracias por tu compra, ${orderData.clientName}!</h1><p>Tu pedido #${orderId} ha sido confirmado y ya estamos preparándolo.</p><h2>Detalles del Pedido</h2><ul>${itemsHtml}</ul><h3>Total: $${orderData.total.toFixed(2)}</h3><p>¡Gracias por confiar en nosotros!</p>`;
}

export async function sendConfirmationEmail(orderId: string, orderData: Order): Promise<void> {
  const emailHtml = generateConfirmationEmailHtml(orderId, orderData);
  try {
    await db.collection(MAIL_COLLECTION).add({
      to: [orderData.clientEmail],
      message: { subject: `Confirmación de tu Pedido #${orderId}`, html: emailHtml },
    });
    logger.info(`Documento de email para pedido ${orderId} creado en la colección '${MAIL_COLLECTION}'.`);
  } catch (error) {
    logger.error(`Error al crear documento en '${MAIL_COLLECTION}' para pedido ${orderId}`, { error });
    throw new Error("Error al crear el documento para la extensión Trigger Email.");
  }
}