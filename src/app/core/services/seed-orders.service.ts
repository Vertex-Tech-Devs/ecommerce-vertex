import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import type { SeedProduct } from './seed-products.service';
import {
  CLIENT_DATA,
  CLIENT_DAYS_LIST,
  CLIENT_ORDER_COUNTS,
  ORDER_DATA,
} from '../seeds/client-order-data.constants';

export interface SeedClient {
  id: string;
  fullName: string;
  email: string;
  phone: string;
}

@Injectable({ providedIn: 'root' })
export class SeedOrdersService {
  private firestore = inject(Firestore);
  private injector = inject(EnvironmentInjector);

  private run<T>(fn: () => Promise<T>): Promise<T> {
    return runInInjectionContext(this.injector, fn);
  }

  async seedClients(): Promise<SeedClient[]> {
    const seeded: SeedClient[] = [];

    for (let i = 0; i < CLIENT_DATA.length; i++) {
      const d = CLIENT_DATA[i];
      const days = CLIENT_DAYS_LIST[i] ?? 30;
      const ref = await this.run(() =>
        addDoc(collection(this.firestore, 'clients'), {
          ...d,
          firstOrderDate: new Date(Date.now() - days * 86_400_000),
          lastOrderDate: new Date(Date.now() - Math.max(1, Math.floor(days / 4)) * 86_400_000),
          numberOfOrders: CLIENT_ORDER_COUNTS[i] ?? 1,
        })
      );
      seeded.push({ id: ref.id, ...d });
    }
    return seeded;
  }

  async seedOrders(prods: SeedProduct[], clients: SeedClient[]): Promise<void> {
    for (let i = 0; i < ORDER_DATA.length; i++) {
      const o = ORDER_DATA[i];
      const cl = clients[o.clientIdx] ?? clients[0];
      const orderDate = new Date(Date.now() - o.daysAgo * 86_400_000);

      let subtotal = 0;
      const items = o.lines.map((line) => {
        const p = prods[line.prodIdx] ?? prods[0];
        subtotal += p.finalPrice * line.qty;
        const attrs: Record<string, string> = { color: line.color };
        if (line.talle) {
          attrs['talle'] = line.talle;
        }
        return {
          productId: p.id,
          variantId: `var-${p.id}`,
          productName: p.name,
          quantity: line.qty,
          price: p.finalPrice,
          productImage: p.image,
          attributes: attrs,
        };
      });

      await this.run(() =>
        addDoc(collection(this.firestore, 'orders'), {
          userId: `user-${cl.id}`,
          clientName: cl.fullName,
          clientEmail: cl.email,
          clientPhone: cl.phone,
          orderDate,
          total: subtotal + o.shippingCost,
          status: o.status,
          items,
          shippingAddress: {
            street: o.street,
            city: o.city,
            state: o.state,
            zipCode: o.zip,
            country: 'Argentina',
          },
          paymentDetails: {
            paymentMethod: o.paymentMethod,
            shippingCost: o.shippingCost,
            taxAmount: Math.round(subtotal * 0.21),
            subtotal,
          },
          stockDecremented: o.status !== 'cancelled',
          notes: i % 5 === 0 ? 'Cliente solicitó embalaje de regalo.' : null,
        })
      );
    }
  }
}
