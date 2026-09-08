import type { OnInit } from '@angular/core';
import { Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ClientService } from '../../../../../core/services/client.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { environment } from '../../../../../../environments/environment';
import { resolveTenantId } from '@core/utils/tenant';
import type { Client } from '../../../../../core/models/client.model';
import type { Observable } from 'rxjs';
import {
  BehaviorSubject,
  combineLatest,
  map,
  debounceTime,
  distinctUntilChanged,
  catchError,
  of,
} from 'rxjs';

import { AdminSearchBar } from '@shared/components/admin-search-bar/admin-search-bar';
import { AdminPagination } from '@shared/components/admin-pagination/admin-pagination';

@Component({
  selector: 'app-clients-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, AdminSearchBar, AdminPagination],
  templateUrl: './clients-list.html',
  styleUrl: './clients-list.scss',
})
export class ClientsList implements OnInit {
  searchTermSubject = new BehaviorSubject<string>('');
  currentPageSubject = new BehaviorSubject<number>(1);
  itemsPerPageSubject = new BehaviorSubject<number>(10);

  itemsPerPageOptions = [5, 10, 20, 30];

  totalClients = 0;
  totalPages = 0;

  readonly isLoading = signal<boolean>(true);
  clients$!: Observable<Client[]>;
  private rawClients$ = new BehaviorSubject<Client[]>([]);

  private _clientService = inject(ClientService);
  private _auth = inject(AuthService);
  private _functions = inject(Functions);
  readonly isSuperAdmin = signal(false);
  readonly deleteTarget = signal<Client | null>(null);
  readonly deleteArmed = signal(false);
  readonly deletingId = signal<string | null>(null);
  private _router = inject(Router);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.loadClients();
    this._auth.isSuperAdmin$
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => this.isSuperAdmin.set(v));

    this.clients$ = combineLatest([
      this.rawClients$,
      this.searchTermSubject.pipe(debounceTime(300), distinctUntilChanged()),
      this.currentPageSubject,
      this.itemsPerPageSubject,
    ]).pipe(
      map(([allClients, searchTerm, currentPage, itemsPerPage]) => {
        let filteredClients = allClients;
        if (searchTerm) {
          const lowerCaseSearchTerm = searchTerm.toLowerCase();
          filteredClients = filteredClients.filter(
            (client) =>
              client.fullName.toLowerCase().includes(lowerCaseSearchTerm) ||
              client.email.toLowerCase().includes(lowerCaseSearchTerm),
          );
        }

        this.totalClients = filteredClients.length;
        this.totalPages = Math.ceil(this.totalClients / itemsPerPage);

        let correctedPage = currentPage;
        if (currentPage > this.totalPages && this.totalPages > 0) {
          correctedPage = this.totalPages;
        } else if (this.totalPages === 0) {
          correctedPage = 1;
        }

        const startIndex = (correctedPage - 1) * itemsPerPage;
        return filteredClients.slice(startIndex, startIndex + itemsPerPage);
      }),
    );
  }

  loadClients(): void {
    this.isLoading.set(true);
    this._clientService
      .getClients()
      .pipe(
        catchError((err) => {
          console.error('Error al cargar la lista de clientes:', err);
          return of([] as Client[]);
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((clients) => {
        this.rawClients$.next(clients);
        this.isLoading.set(false);
      });
  }

  onSearchChange(newValue: string): void {
    this.searchTermSubject.next(newValue);
    this.currentPageSubject.next(1);
  }

  onItemsPerPageChange(newValue: number | string): void {
    this.itemsPerPageSubject.next(Number(newValue));
    this.currentPageSubject.next(1);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPageSubject.next(page);
    }
  }

  async deleteClientFlow(client: Client): Promise<void> {
    if (!client?.id) {
      return;
    }
    if (this.deleteArmed() && this.deleteTarget()?.id === client.id) {
      // segundo click: borrar de verdad
      this.deletingId.set(client.id);
      try {
        const fn = httpsCallable<
          { tenantProjectId: string; storeId: string; clientDocId: string },
          { success: boolean }
        >(this._functions, 'adminDeleteClient');
        await fn({
          tenantProjectId: environment.firebaseConfig.projectId,
          storeId: resolveTenantId(),
          clientDocId: client.id,
        });
        this.loadClients();
      } finally {
        this.deletingId.set(null);
        this.deleteArmed.set(false);
        this.deleteTarget.set(null);
      }
      return;
    }
    this.deleteTarget.set(client);
    this.deleteArmed.set(true);
  }

  cancelDelete(): void {
    this.deleteArmed.set(false);
    this.deleteTarget.set(null);
  }

  viewClientHistory(email: string): void {
    void this._router.navigate(['/admin/customers', email]);
  }
}
