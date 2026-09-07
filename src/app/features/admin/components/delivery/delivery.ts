import {
  Component,
  inject,
  signal,
  effect,
  ViewChildren,
  ElementRef,
  ChangeDetectionStrategy,
  type OnInit,
  type QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import type { FormArray, FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { StoreConfigService } from '@core/services/store-config.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { DeliveryMethodConfig, StorePickupLocation } from '@core/models/store-config.model';
import {
  WEEK_DAYS,
  TIME_SLOTS,
  DEFAULT_DELIVERY_CONFIG,
  formatSchedule,
} from './delivery.constants';
import { createDeliveryForm, createPickupLocationGroup } from './delivery.form';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './delivery.html',
  styleUrl: './delivery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Delivery implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly storeConfigService = inject(StoreConfigService);
  private readonly sweetAlert = inject(SweetAlertService);

  readonly weekDays = WEEK_DAYS;
  readonly timeSlots = TIME_SLOTS;

  @ViewChildren('locationNameInput', { read: ElementRef })
  locationNameInputs!: QueryList<ElementRef>;

  readonly saving = signal<boolean>(false);
  readonly loading = signal<boolean>(true);

  readonly form: FormGroup = createDeliveryForm(this.fb);

  get pickupLocationsArray(): FormArray {
    return this.form.get('pickupLocations') as FormArray;
  }

  constructor() {
    effect(() => {
      const cfg = this.storeConfigService.storeConfig();
      if (cfg) {
        this.populateForm(cfg.deliveryMethods);
        this.loading.set(false);
      } else if (!this.storeConfigService.isLoading()) {
        this.loading.set(false);
      }
    });
  }

  ngOnInit(): void {
    if (!this.storeConfigService.storeConfig()) {
      void this.storeConfigService.loadConfig();
    }
  }

  populateForm(delivery?: DeliveryMethodConfig): void {
    const config = delivery ?? DEFAULT_DELIVERY_CONFIG;
    this.form.patchValue({
      enableHomeDelivery: config.enableHomeDelivery ?? true,
      enableStorePickup: config.enableStorePickup ?? false,
      homeDeliveryDescription:
        config.homeDeliveryDescription ?? DEFAULT_DELIVERY_CONFIG.homeDeliveryDescription,
    });

    this.pickupLocationsArray.clear();
    (config.pickupLocations ?? []).forEach((loc) => {
      this.pickupLocationsArray.push(createPickupLocationGroup(this.fb, loc));
    });
    this.form.markAsPristine();
  }

  addPickupLocation(location?: Partial<StorePickupLocation>): void {
    this.pickupLocationsArray.push(createPickupLocationGroup(this.fb, location));
    this.form.markAsDirty();
    setTimeout(() => {
      this.locationNameInputs?.last?.nativeElement?.focus();
    }, 50);
  }

  removePickupLocation(index: number): void {
    this.pickupLocationsArray.removeAt(index);
    this.form.markAsDirty();
  }

  togglePickupLocationStatus(index: number): void {
    const group = this.pickupLocationsArray.at(index) as FormGroup | undefined;
    const enabledCtrl = group?.get('enabled');
    if (enabledCtrl) {
      enabledCtrl.setValue(!enabledCtrl.value);
      enabledCtrl.markAsDirty();
      this.form.markAsDirty();
    }
  }

  syncSchedule(index: number): void {
    const group = this.pickupLocationsArray.at(index) as FormGroup | undefined;
    if (!group) {
      return;
    }
    const {
      days = [],
      timeFrom1 = '09:00',
      timeTo1 = '18:00',
      hasSplitSchedule = false,
      timeFrom2 = '16:30',
      timeTo2 = '20:30',
    } = group.value;

    group
      .get('schedule')
      ?.setValue(formatSchedule(days, timeFrom1, timeTo1, hasSplitSchedule, timeFrom2, timeTo2));
    group.markAsDirty();
    this.form.markAsDirty();
  }

  toggleDay(locationIndex: number, day: string): void {
    const group = this.pickupLocationsArray.at(locationIndex) as FormGroup | undefined;
    if (!group) {
      return;
    }
    const currentDays: string[] = [...(group.get('days')?.value ?? [])];
    const dayIdx = currentDays.indexOf(day);
    if (dayIdx > -1) {
      currentDays.splice(dayIdx, 1);
    } else {
      currentDays.push(day);
    }
    group.get('days')?.setValue(currentDays);
    this.syncSchedule(locationIndex);
  }

  isDaySelected(locationIndex: number, day: string): boolean {
    const group = this.pickupLocationsArray.at(locationIndex) as FormGroup | undefined;
    return (group?.get('days')?.value ?? []).includes(day);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.sweetAlert.error('Formulario inválido', 'Revisá los campos obligatorios.');
      return;
    }

    this.saving.set(true);
    try {
      const payload = this.form.getRawValue() as DeliveryMethodConfig;
      await this.storeConfigService.updateDeliveryConfig(payload);
      this.form.markAsPristine();
      this.sweetAlert.success('¡Listo!', 'Los métodos de entrega fueron guardados con éxito.');
    } catch (err) {
      console.error('Error al guardar métodos de entrega:', err);
      this.sweetAlert.error('Error', 'No se pudo guardar la configuración de entrega.');
    } finally {
      this.saving.set(false);
    }
  }
}
