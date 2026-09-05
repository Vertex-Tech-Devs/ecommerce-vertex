import type { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import type { DeliveryMethodConfig, StorePickupLocation } from '@core/models/store-config.model';
import { DEFAULT_DELIVERY_CONFIG, formatSchedule } from './delivery.constants';

export function createDeliveryForm(
  fb: FormBuilder,
  config?: Partial<DeliveryMethodConfig>,
): FormGroup {
  const initial = { ...DEFAULT_DELIVERY_CONFIG, ...config };
  return fb.group({
    enableHomeDelivery: [initial.enableHomeDelivery],
    enableStorePickup: [initial.enableStorePickup],
    homeDeliveryDescription: [initial.homeDeliveryDescription],
    pickupLocations: fb.array([]),
  });
}

export function createPickupLocationGroup(
  fb: FormBuilder,
  location?: Partial<StorePickupLocation>,
): FormGroup {
  const days = location?.days ?? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
  const timeFrom1 = location?.timeFrom1 ?? '09:00';
  const timeTo1 = location?.timeTo1 ?? '18:00';
  const hasSplit = location?.hasSplitSchedule ?? false;
  const timeFrom2 = location?.timeFrom2 ?? '16:30';
  const timeTo2 = location?.timeTo2 ?? '20:30';
  const initialSchedule =
    location?.schedule ?? formatSchedule(days, timeFrom1, timeTo1, hasSplit, timeFrom2, timeTo2);

  return fb.group({
    id: [
      location?.id ??
        (typeof crypto !== 'undefined' && crypto.randomUUID
          ? crypto.randomUUID()
          : Date.now().toString()),
    ],
    name: [location?.name ?? '', Validators.required],
    address: [location?.address ?? '', Validators.required],
    city: [location?.city ?? '', Validators.required],
    days: [days],
    timeFrom1: [timeFrom1],
    timeTo1: [timeTo1],
    hasSplitSchedule: [hasSplit],
    timeFrom2: [timeFrom2],
    timeTo2: [timeTo2],
    schedule: [initialSchedule, Validators.required],
    notes: [location?.notes ?? ''],
    enabled: [location?.enabled ?? true],
  });
}
