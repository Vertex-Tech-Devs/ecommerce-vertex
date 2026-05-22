import { CLIENT_DATA } from './data/client-data';
import { ORDER_DATA } from './data/order-data';

export { CLIENT_DATA, ORDER_DATA };

export interface ClientData {
  fullName: string;
  email: string;
  phone: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderLine {
  prodIdx: number;
  qty: number;
  talle?: string;
  color: string;
}

export interface SeedOrderData {
  clientIdx: number;
  daysAgo: number;
  status: OrderStatus;
  lines: OrderLine[];
  paymentMethod: string;
  shippingCost: number;
  street: string;
  city: string;
  state: string;
  zip: string;
}

export const CLIENT_DAYS_LIST: number[] = [
  340, 280, 210, 180, 150, 120, 95, 70, 50, 30, 25, 20, 15, 12, 10, 8, 6, 5, 3, 1,
];

export const CLIENT_ORDER_COUNTS: number[] = [
  12, 9, 7, 6, 5, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1,
];
