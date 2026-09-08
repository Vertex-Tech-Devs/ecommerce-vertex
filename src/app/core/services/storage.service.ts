import { Injectable, inject } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import type { StorageReference, UploadTask, UploadTaskSnapshot } from 'firebase/storage';
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';
import { Observable, from, race, share, shareReplay, throwError, timer } from 'rxjs';
import { map as rxMap, mergeMap } from 'rxjs/operators';
import { catchError, map } from 'rxjs/operators';
import { SweetAlertService } from './sweet-alert.service';
import { resolveTenantId } from '@core/utils/tenant';

export interface Upload {
  progress$: Observable<number>;
  downloadUrl$: Observable<string>;
}

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storage: Storage = inject(Storage);
  private sweetAlertService = inject(SweetAlertService);

  protected getStorageRef(path: string): StorageReference {
    return ref(this.storage, path);
  }

  protected uploadBytes(storageRef: StorageReference, file: File): UploadTask {
    return uploadBytesResumable(storageRef, file);
  }

  protected async getDownloadUrl(taskRef: StorageReference): Promise<string> {
    return getDownloadURL(taskRef);
  }

  protected async deleteStorageObject(storageRef: StorageReference): Promise<void> {
    return deleteObject(storageRef);
  }

  private isHeic(file: File): boolean {
    return (
      /\.heic$/i.test(file.name) ||
      /\.heif$/i.test(file.name) ||
      file.type === 'image/heic' ||
      file.type === 'image/heif'
    );
  }

  /**
   * Convierte HEIC/HEIF a WebP (calidad 0.85) en el cliente mediante heic2any
   * (carga lazy). Devuelve el archivo original si no es HEIC/HEIF.
   */
  async prepareUploadFile(file: File, onStatus?: (label: string) => void): Promise<File> {
    if (!this.isHeic(file)) {
      return file;
    }
    onStatus?.('Optimizando imagen de alta resolución...');
    const { default: heic2any } = await import('heic2any');
    const result = (await heic2any({
      blob: file,
      toType: 'image/webp',
      quality: 0.85,
    })) as Blob | Blob[];
    const out = Array.isArray(result) ? result[0] : result;
    const name = file.name.replace(/\.(heic|heif)$/i, '') + '.webp';
    return new File([out], name, { type: 'image/webp' });
  }

  /**
   * Sube un archivo; si es HEIC/HEIF lo convierte a WebP (0.85) antes de subir.
   */
  uploadFile(file: File, path: string): Upload {
    if (!this.isHeic(file)) {
      return this.startUpload(file, path);
    }
    const prepared$ = from(this.prepareUploadFile(file)).pipe(
      rxMap((converted) => this.startUpload(converted, path)),
      shareReplay({ bufferSize: 1, refCount: false }),
    );
    return {
      progress$: prepared$.pipe(mergeMap((u) => u.progress$)),
      downloadUrl$: prepared$.pipe(mergeMap((u) => u.downloadUrl$)),
    };
  }

  private startUpload(file: File, path: string): Upload {
    // Namespace multi-tenant: stores/{storeId}/... (validado en storage.rules)
    const storeId = resolveTenantId() || 'store';
    const filePath = `stores/${storeId}/${path}/${Date.now()}_${this.sanitizeFileName(file.name)}`;

    const storageRef = this.getStorageRef(filePath);
    const uploadTask = this.uploadBytes(storageRef, file);

    // share(): un único listener al UploadTask aunque haya varios suscriptores
    // (evita doble registro y errores sin handler que dejan el spinner colgado).
    const progress$ = new Observable<number>((observer) => {
      const unsubscribe = uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          observer.next(progress);
        },
        (error) => observer.error(error),
        () => observer.complete(),
      );
      return (): void => {
        unsubscribe();
      };
    }).pipe(share());

    // Anti-hang: si la sesión resumable no emite nada en 90s (ni progreso ni error),
    // lo convertimos en un error visible para que el spinner nunca quede en 0% para
    // siempre. La descarga (downloadUrl$) seguirá su propio curso y reportará el error.
    const progressWithTimeout$ = race([
      progress$,
      timer(90_000).pipe(
        map(() => {
          throw new Error('Upload stalled: no progress from Firebase Storage in 90s.');
        }),
      ),
    ]).pipe(share());

    const downloadUrl$ = new Observable<string>((observer) => {
      uploadTask
        .then((snapshot) => {
          this.getDownloadUrl(snapshot.ref)
            .then((url) => {
              observer.next(url);
              observer.complete();
            })
            .catch((error) => observer.error(error));
        })
        .catch((error) => observer.error(error));
    });

    return { progress$: progressWithTimeout$, downloadUrl$ };
  }

  private sanitizeFileName(name: string): string {
    const lastDot = name.lastIndexOf('.');
    const ext = lastDot > 0 ? name.slice(lastDot).toLowerCase() : '';
    const base =
      (lastDot > 0 ? name.slice(0, lastDot) : name)
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^\w.-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
        .slice(0, 100) || 'file';

    return `${base}${ext}`;
  }

  deleteFileByUrl(imageUrl: string): Observable<void> {
    try {
      const parsedUrl = new URL(imageUrl);
      if (parsedUrl.hostname !== 'firebasestorage.googleapis.com') {
        return from(Promise.resolve());
      }
    } catch {
      return from(Promise.resolve());
    }

    const imageRef = this.getStorageRef(imageUrl);
    return from(this.deleteStorageObject(imageRef)).pipe(
      catchError((error) => {
        if (error.code === 'storage/object-not-found') {
          console.warn(
            `El archivo en la URL ${imageUrl} no se encontró. Pudo haber sido eliminado previamente.`,
          );
          return from(Promise.resolve());
        }
        console.error('Error al eliminar la imagen:', error);
        this.sweetAlertService.error('Error de Borrado', 'No se pudo eliminar la imagen anterior.');
        return throwError(() => error);
      }),
    );
  }
}
