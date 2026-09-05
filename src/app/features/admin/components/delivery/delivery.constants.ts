import type { DeliveryMethodConfig } from '@core/models/store-config.model';

export const WEEK_DAYS: readonly string[] = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

export const TIME_SLOTS: readonly string[] = [
  '07:00',
  '07:30',
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
];

export const DEFAULT_DELIVERY_CONFIG: DeliveryMethodConfig = {
  enableStorePickup: false,
  enableHomeDelivery: true,
  homeDeliveryDescription: 'Coordinamos el envío y costo por WhatsApp',
  pickupLocations: [],
};

export function formatSchedule(
  days: string[],
  from1: string,
  to1: string,
  hasSplit: boolean,
  from2: string,
  to2: string,
): string {
  const daysStr = days.length > 0 ? days.join(', ') : 'Lun a Vie';
  if (hasSplit && from2 && to2) {
    return `${daysStr}: ${from1} a ${to1} y ${from2} a ${to2} hs`;
  }
  return `${daysStr}: ${from1} a ${to1} hs`;
}
