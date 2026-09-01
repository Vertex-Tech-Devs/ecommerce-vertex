import { CommonModule } from '@angular/common';
import type { OnInit } from '@angular/core';
import { Component, inject, signal } from '@angular/core';
import type { FormArray, FormGroup } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreConfigService } from '@core/services/store-config.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { StoreConfig, StorePickupLocation } from '@core/models/store-config.model';
import { WEEK_DAYS, TIME_SLOTS } from '@core/models/store-config.model';
import { formatSchedule } from '../store-config/store-config.constants';

@Component({
  selector: 'app-branches-management',
  templateUrl: './branches-management.html',
  styleUrl: './branches-management.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class BranchesManagement implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly storeConfigService = inject(StoreConfigService);
  private readonly sweetAlert = inject(SweetAlertService);

  readonly isLoading = signal<boolean>(true);
  readonly isSaving = signal<boolean>(false);
  readonly weekDays = WEEK_DAYS;
  readonly timeSlots = TIME_SLOTS;

  readonly form: FormGroup = this.fb.group({
    enableHomeDelivery: [true],
    homeDeliveryDescription: ['Coordinamos el envío y costo por WhatsApp'],
    enableStorePickup: [false],
    pickupLocations: this.fb.array([]),
  });

  get pickupLocationsArray(): FormArray {
    return this.form.get('pickupLocations') as FormArray;
  }

  ngOnInit(): void {
    void this.loadData();
  }

  async loadData(): Promise<void> {
    this.isLoading.set(true);
    try {
      await this.storeConfigService.loadConfig();
      const config = this.storeConfigService.storeConfig();
      if (config?.deliveryMethods) {
        this.form.patchValue({
          enableHomeDelivery: config.deliveryMethods.enableHomeDelivery ?? true,
          homeDeliveryDescription:
            config.deliveryMethods.homeDeliveryDescription ??
            'Coordinamos el envío y costo por WhatsApp',
          enableStorePickup: config.deliveryMethods.enableStorePickup ?? false,
        });

        this.pickupLocationsArray.clear();
        (config.deliveryMethods.pickupLocations ?? []).forEach((loc) => {
          this.pickupLocationsArray.push(this.createPickupLocationGroup(loc));
        });
      }
    } catch (err) {
      console.error('Error loading branches configuration:', err);
    } finally {
      this.isLoading.set(false);
    }
  }

  createPickupLocationGroup(location?: Partial<StorePickupLocation>): FormGroup {
    const days = location?.days ?? ['Lun', 'Mar', 'Mié', 'Jue', 'Vie'];
    const timeFrom1 = location?.timeFrom1 ?? '09:00';
    const timeTo1 = location?.timeTo1 ?? '18:00';
    const hasSplit = location?.hasSplitSchedule ?? false;
    const timeFrom2 = location?.timeFrom2 ?? '16:30';
    const timeTo2 = location?.timeTo2 ?? '20:30';
    const initialSchedule =
      location?.schedule ?? formatSchedule(days, timeFrom1, timeTo1, hasSplit, timeFrom2, timeTo2);

    return this.fb.group({
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

  addPickupLocation(): void {
    this.pickupLocationsArray.push(this.createPickupLocationGroup());
  }

  removePickupLocation(index: number): void {
    this.pickupLocationsArray.removeAt(index);
  }

  togglePickupLocationStatus(index: number): void {
    const group = this.pickupLocationsArray.at(index) as FormGroup;
    if (group) {
      const current = (group.get('enabled')?.value as boolean | null | undefined) ?? true;
      group.patchValue({ enabled: !current });
    }
  }

  toggleDay(locationIndex: number, day: string): void {
    const group = this.pickupLocationsArray.at(locationIndex) as FormGroup;
    if (!group) {
      return;
    }
    const currentDays = (group.get('days')?.value as string[]) || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter((d) => d !== day)
      : [...currentDays, day];
    group.patchValue({ days: newDays });
    this.updateComputedSchedule(locationIndex);
  }

  updateComputedSchedule(locationIndex: number): void {
    const group = this.pickupLocationsArray.at(locationIndex) as FormGroup;
    if (!group) {
      return;
    }
    const days = (group.get('days')?.value as string[]) || [];
    const timeFrom1 = (group.get('timeFrom1')?.value as string | null | undefined) ?? '09:00';
    const timeTo1 = (group.get('timeTo1')?.value as string | null | undefined) ?? '18:00';
    const hasSplit = (group.get('hasSplitSchedule')?.value as boolean | null | undefined) ?? false;
    const timeFrom2 = (group.get('timeFrom2')?.value as string | null | undefined) ?? '16:30';
    const timeTo2 = (group.get('timeTo2')?.value as string | null | undefined) ?? '20:30';
    const computed = formatSchedule(days, timeFrom1, timeTo1, hasSplit, timeFrom2, timeTo2);
    group.patchValue({ schedule: computed });
  }

  isDaySelected(locationIndex: number, day: string): boolean {
    return (this.pickupLocationsArray.at(locationIndex)?.get('days')?.value ?? []).includes(day);
  }

  async onSubmit(): Promise<void> {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.sweetAlert.warning(
        'Campos incompletos',
        'Por favor, completá los campos obligatorios de tus sucursales.',
      );
      return;
    }

    this.isSaving.set(true);
    try {
      const currentConfig = this.storeConfigService.storeConfig();
      const updatedConfig: StoreConfig = {
        ...(currentConfig ?? ({} as StoreConfig)),
        deliveryMethods: {
          enableHomeDelivery: this.form.get('enableHomeDelivery')?.value ?? true,
          homeDeliveryDescription: this.form.get('homeDeliveryDescription')?.value ?? '',
          enableStorePickup: this.form.get('enableStorePickup')?.value ?? false,
          pickupLocations: this.pickupLocationsArray.value as StorePickupLocation[],
        },
      };

      await this.storeConfigService.saveConfig(updatedConfig);
      this.sweetAlert.success(
        'Guardado exitoso',
        'Sucursales y logística guardadas correctamente.',
      );
    } catch (err) {
      console.error('Error saving branches config:', err);
      this.sweetAlert.error('Error al guardar', 'No se pudieron guardar las sucursales.');
    } finally {
      this.isSaving.set(false);
    }
  }
}
