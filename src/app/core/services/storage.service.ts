import { Injectable, inject } from '@angular/core';
import { Storage } from '@angular/fire/storage';
import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  UploadTaskSnapshot,
} from 'firebase/storage';
import { Observable, from, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SweetAlertService } from './sweet-alert.service';

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

  uploadFile(file: File, path: string): Upload {
    const filePath = `${path}/${Date.now()}_${file.name}`;

    const storageRef = ref(this.storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);


    const progress$ = new Observable<number>(observer => {
      const unsubscribe = uploadTask.on('state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          observer.next(progress);
        },
        (error) => observer.error(error),
        () => observer.complete()
      );
      return () => unsubscribe();
    });

    const downloadUrl$ = new Observable<string>(observer => {
      uploadTask.then(snapshot => {
        getDownloadURL(snapshot.ref).then(url => {
          observer.next(url);
          observer.complete();
        }).catch(error => observer.error(error));
      }).catch(error => observer.error(error));
    });

    return { progress$, downloadUrl$ };
  }

  deleteFileByUrl(imageUrl: string): Observable<void> {
    if (!imageUrl || !imageUrl.includes('firebasestorage.googleapis.com')) {
      return from(Promise.resolve());
    }

    const imageRef = ref(this.storage, imageUrl);
    return from(deleteObject(imageRef)).pipe(
      catchError(error => {
        if (error.code === 'storage/object-not-found') {
          console.warn(
            `El archivo en la URL ${imageUrl} no se encontró. Pudo haber sido eliminado previamente.`
          );
          return from(Promise.resolve());
        }
        console.error('Error al eliminar la imagen:', error);
        this.sweetAlertService.error(
          'Error de Borrado',
          'No se pudo eliminar la imagen anterior.'
        );
        return throwError(() => error);
      })
    );
  }
}
