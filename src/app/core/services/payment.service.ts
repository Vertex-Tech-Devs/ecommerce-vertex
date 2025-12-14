import { Injectable, inject } from '@angular/core';
import { ICartItem } from '@core/models/cart.model';
import { Functions, httpsCallable } from '@angular/fire/functions';

export interface PaymentResponse {
  success: boolean;
  transactionId?: string;
  error?: string;
  init_point?: string;
}

interface RequestData {
  items: {
    productId: string;
    variantId: string;
    title: string;
    quantity: number;
    unit_price: number;
  }[];
  external_reference: string;
}

interface PreferenceResponseData {
  id: string;
  init_point: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private functions: Functions = inject(Functions);

  constructor() { }

  async initiatePayment(items: ICartItem[], orderId: string): Promise<PaymentResponse> {
    try {
      const preferenceItems = items.map(item => ({
        productId: item.productId,
        variantId: item.variantId,
        title: item.name,
        quantity: item.quantity,
        unit_price: Number(item.price)
      }));

      const createPaymentPreference = httpsCallable<RequestData, PreferenceResponseData>(this.functions, 'createPaymentPreference');

      const result = await createPaymentPreference({
        items: preferenceItems,
        external_reference: orderId
      });

      return {
        success: true,
        init_point: result.data.init_point
      };

    } catch (error: any) {
      console.error('Error al crear la preferencia de pago:', error);
      return {
        success: false,
        error: error.message || 'Error al conectar con el servicio de pago.'
      };
    }
  }
}