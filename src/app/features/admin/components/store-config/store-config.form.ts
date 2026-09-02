import type { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import type { StorePickupLocation } from '@core/models/store-config.model';
import { resolveTenantId } from '@core/utils/tenant';
import { formatSchedule } from './store-config.constants';

export function createStoreConfigForm(fb: FormBuilder): FormGroup {
  return fb.group({
    tenantId: [''],
    storeId: [resolveTenantId()],
    storeName: ['', Validators.required],
    logoUrl: [''],
    faviconUrl: [''],
    colors: fb.group({
      primary: ['#ea580c', Validators.required],
      accent: ['#ef4444', Validators.required],
      background: ['#ffffff', Validators.required],
    }),
    setupCompleted: [true],
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
