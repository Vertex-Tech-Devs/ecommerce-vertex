import { Injectable, inject } from '@angular/core';
import type { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StorageService } from '@core/services/storage.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import type { Observable } from 'rxjs';
import { finalize } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductMediaService {
  private storageService = inject(StorageService);
  private sweetAlertService = inject(SweetAlertService);

  uploadMainImage(
    file: File,
    onProgress: (p: number) => void,
    onComplete: (url: string) => void,
  ): Observable<number> {
    const { progress$, downloadUrl$ } = this.storageService.uploadFile(file, 'products/images');
    progress$.subscribe(onProgress);
    downloadUrl$
      .pipe(
        finalize(() => {
          onProgress(0);
        }),
      )
      .subscribe(onComplete);
    return progress$;
  }

  uploadGalleryImage(
    file: File,
    index: number,
    onProgress: (index: number, p: number | null) => void,
    onComplete: (url: string) => void,
  ): Observable<number> {
    const { progress$, downloadUrl$ } = this.storageService.uploadFile(file, 'products/gallery');
    progress$.subscribe((p) => onProgress(index, p));
    downloadUrl$
      .pipe(
        finalize(() => {
          onProgress(index, null);
        }),
      )
      .subscribe(onComplete);
    return progress$;
  }

  createImageControl(fb: FormBuilder, url = ''): FormControl {
    return fb.control(url, [Validators.required, Validators.pattern('https?://.+')]);
  }

  async confirmRemoveImage(images: FormArray, index: number): Promise<boolean> {
    const isConfirmed = await this.sweetAlertService.confirm(
      '¿Estás seguro?',
      '¿Estás seguro de eliminar la imagen?',
    );
    if (isConfirmed) {
      images.removeAt(index);
      return true;
    }
    return false;
  }
}
