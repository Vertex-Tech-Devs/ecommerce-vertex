import { Injectable } from '@angular/core';
import type { CartItem } from '@core/models/cart.model';
import { environment } from '../../../environments/environment';

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
  init_point?: string;
}

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private async retryWithBackoff<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
    try {
      return await fn();
    } catch (error) {
      if (retries <= 0) {
        throw error;
      }
      console.warn(
        `[Mercado Pago Retry] Falló la conexión con Mercado Pago. Reintentando en ${delay}ms... Intentos restantes: ${retries}`,
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
      return this.retryWithBackoff(fn, retries - 1, delay * 2);
    }
  }

  async initiatePayment(items: CartItem[], orderId: string): Promise<PaymentResponse> {
    try {
      const preferenceItems = items.map((item) => ({
        productId: item.productId,
        variantId: item.variantId,
        title: item.name,
        quantity: item.quantity,
        unit_price: Number(item.price),
      }));

      // Llamada directa (fetch) SIN el token de auth del usuario: el checkout es de un
      // comprador invitado y las functions viven en el proyecto master (ecommerce-vertex-dev).
      // httpsCallable añadiría el ID token del shard de la tienda → el framework del master
      // lo rechaza con 401 Unauthenticated (los tokens de otro proyecto no se verifican).
      // Con fetch directo (sin Authorization) la function pública procesa el pedido.
      const response = await this.retryWithBackoff(() =>
        fetch(`${environment.api.cloudFunctionsUrl}/createPaymentPreference`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            data: { items: preferenceItems, external_reference: orderId },
          }),
        }).then(async (res) => {
          if (!res.ok) {
            const body = await res.json().catch(() => ({}));
            throw new Error(body?.error?.message || `HTTP ${res.status}`);
          }
          return res.json();
        }),
      );

      return {
        success: true,
        init_point: response?.result?.init_point,
      };
    } catch (error: unknown) {
      console.error('Error al crear la preferencia de pago:', error);
      return {
        success: false,
        error: (error as Error).message || 'Error al conectar con el servicio de pago.',
      };
    }
  }
}
