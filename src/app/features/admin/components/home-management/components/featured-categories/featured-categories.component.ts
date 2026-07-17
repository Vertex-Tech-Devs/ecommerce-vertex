import { Component, EventEmitter, Input, Output, inject, ChangeDetectorRef, DestroyRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import type { FormGroup, FormArray } from '@angular/forms';
import { take } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from '@core/services/storage.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { Category } from '@core/models/category.model';

@Component({
  selector: 'app-featured-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './featured-categories.component.html',
  styleUrl: './featured-categories.component.scss',
})
export class FeaturedCategoriesComponent {
  @Input({ required: true }) formArray!: FormArray;
  @Input({ required: true }) categories: Category[] = [];
  @Input({ required: true }) previewUrls: (string | null)[] = [];

  @Output() add = new EventEmitter<void>();
  @Output() remove = new EventEmitter<number>();
  @Output() categoryChange = new EventEmitter<{ index: number; event: Event }>();
  @Output() fileChange = new EventEmitter<{ index: number; event: Event }>();

  private cdr = inject(ChangeDetectorRef);
  private storageService = inject(StorageService);
  private sweetAlertService = inject(SweetAlertService);
  private destroyRef = inject(DestroyRef);

  categoryUploadProgress: (number | null)[] = [null, null, null];

  getFormGroup(index: number): FormGroup {
    return this.formArray.at(index) as FormGroup;
  }

  onFileSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    if (!file.type.startsWith('image/')) {
      this.sweetAlertService.error(
        'Archivo no válido',
        'Por favor, selecciona un archivo de imagen.',
      );
      input.value = '';
      return;
    }

    this.categoryUploadProgress[index] = 0;
    this.cdr.markForCheck();

    const oldUrl = this.formArray.at(index).get('imageUrl')?.value;
    if (oldUrl && !oldUrl.startsWith('file-')) {
      this.storageService.deleteFileByUrl(oldUrl).pipe(take(1)).subscribe();
    }

    const categoryImagePath = `site-images/featured-category-${index}`;
    const upload = this.storageService.uploadFile(file, categoryImagePath);

    upload.progress$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (progress) => {
        this.categoryUploadProgress[index] = Math.round(progress);
        this.cdr.markForCheck();
      },
    });

    upload.downloadUrl$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (url) => {
        this.categoryUploadProgress[index] = null;
        this.previewUrls[index] = url;
        this.previewUrls = [...this.previewUrls]; // Immutable update to trigger OnPush input check
        this.formArray.at(index).get('imageUrl')?.setValue(url);
        this.formArray.parent?.markAsDirty();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error uploading category image:', err);
        this.categoryUploadProgress[index] = null;
        this.cdr.markForCheck();
      },
    });

    input.value = '';
  }
}

