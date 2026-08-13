import { Injectable, inject } from '@angular/core';
import type { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { StorageService } from '@core/services/storage.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { resolveTenantId } from '@core/utils/tenant';
import type { Observable } from 'rxjs';
import { finalize, catchError, throwError } from 'rxjs';

/**
 * Servicio encargado de la gestión y subida de archivos multimedia de productos a Firebase Storage.
 * Garantiza el aislamiento multi-tenant almacenando imágenes bajo la ruta `tenants/${storeId}/products/...`.
 */
@Injectable({ providedIn: 'root' })
export class ProductMediaService {
  private storageService = inject(StorageService);
  private sweetAlertService = inject(SweetAlertService);

  /**
   * Sube la imagen principal de un producto a Firebase Storage bajo el namespace del tenant activo.
   *
   * @param file Archivo binario de la imagen a subir.
   * @param onProgress Callback invocado con el porcentaje de progreso (0-100).
   * @param onComplete Callback invocado con la URL pública descargable al finalizar.
   * @returns Observable del porcentaje de progreso de carga.
   */
  uploadMainImage(
    file: File,
    productId: string,
    onProgress: (p: number) => void,
    onComplete: (url: string) => void,
  ): Observable<number> {
    const storeId = resolveTenantId() || 'store';
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `tenants/${storeId}/products/${productId || 'new'}/${timestamp}_${cleanFileName}`;

    const { progress$, downloadUrl$ } = this.storageService.uploadFile(file, path);
    progress$.subscribe(onProgress);
    downloadUrl$
      .pipe(
        catchError((err) => {
          console.error('Error al subir la imagen principal:', err);
          this.sweetAlertService.error('Error de Carga', 'No se pudo subir la imagen principal.');
          return throwError(() => err);
        }),
        finalize(() => {
          onProgress(0);
        }),
      )
      .subscribe(onComplete);
    return progress$;
  }

  /**
   * Sube una imagen adicional de la galería de un producto a Firebase Storage bajo el namespace del tenant activo.
   *
   * @param file Archivo binario de la imagen a subir.
   * @param productId ID del producto (o 'new').
   * @param index Índice de la imagen dentro del FormArray de la galería.
   * @param onProgress Callback invocado con el índice y el porcentaje de progreso (0-100) o null al finalizar.
   * @param onComplete Callback invocado con la URL pública descargable al finalizar.
   * @returns Observable del porcentaje de progreso de carga.
   */
  uploadGalleryImage(
    file: File,
    productId: string,
    index: number,
    onProgress: (index: number, p: number | null) => void,
    onComplete: (url: string) => void,
  ): Observable<number> {
    const storeId = resolveTenantId() || 'store';
    const timestamp = Date.now();
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `tenants/${storeId}/products/${productId || 'new'}/${timestamp}_${cleanFileName}`;

    const { progress$, downloadUrl$ } = this.storageService.uploadFile(file, path);
    progress$.subscribe((p) => onProgress(index, p));
    downloadUrl$
      .pipe(
        catchError((err) => {
          console.error(`Error al subir la imagen de galería #${index}:`, err);
          this.sweetAlertService.error('Error de Carga', 'No se pudo subir la imagen adicional.');
          return throwError(() => err);
        }),
        finalize(() => {
          onProgress(index, null);
        }),
      )
      .subscribe(onComplete);
    return progress$;
  }

  /**
   * Crea y retorna un FormControl validado para almacenar una URL de imagen.
   *
   * @param fb Instancia del FormBuilder.
   * @param url URL inicial del control.
   * @returns FormControl con validación de obligatoriedad y formato URL (http/https).
   */
  createImageControl(fb: FormBuilder, url = ''): FormControl {
    return fb.control(url, [Validators.required, Validators.pattern('https?://.+')]);
  }

  /**
   * Solicita confirmación visual al usuario antes de remover una imagen de la galería.
   *
   * @param images FormArray que contiene los controles de las imágenes adicionales.
   * @param index Índice de la imagen a remover.
   * @returns Promesa que resuelve a `true` si la imagen fue eliminada o `false` si fue cancelada.
   */
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
