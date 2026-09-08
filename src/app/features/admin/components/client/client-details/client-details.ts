import type { OnInit, OnDestroy } from '@angular/core';
import { Component, inject, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import type { Subscription, Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

import { ClientService } from '../../../../../core/services/client.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { environment } from '../../../../../../environments/environment';
import { resolveTenantId } from '@core/utils/tenant';
import type { Client } from '../../../../../core/models/client.model';
import type { Order } from '../../../../../core/models/order.model';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe, CurrencyPipe],
  templateUrl: './client-details.html',
  styleUrl: './client-details.scss',
})
export class ClientDetails implements OnInit, OnDestroy {
  clientEmail: string | null = null;
  client$!: Observable<Client | undefined>;
  clientOrders$!: Observable<Order[]>;
  totalSpent$!: Observable<number>;
  isLoading = signal(true);

  private routeSubscription: Subscription | undefined;
  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _clientService = inject(ClientService);
  private _auth = inject(AuthService);
  private _functions = inject(Functions);
  private _sweetAlertService = inject(SweetAlertService);
  readonly isAdmin = signal(false);
  readonly deletingOrderId = signal<string | null>(null);
  readonly deletingClient = signal(false);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this._auth.isAdmin$
      ?.pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((v) => this.isAdmin.set(v));
    this.routeSubscription = this._route.paramMap.subscribe((params) => {
      this.clientEmail = params.get('email');
      if (this.clientEmail) {
        this.isLoading.set(true);
        this.client$ = this._clientService.getClientByEmail(this.clientEmail).pipe(
          shareReplay({ bufferSize: 1, refCount: true }),
          catchError((err) => {
            console.error('Error loading client:', err);
            return of(undefined);
          }),
        );

        this.clientOrders$ = this._clientService.getOrdersByClientEmail(this.clientEmail).pipe(
          shareReplay({ bufferSize: 1, refCount: true }),
          catchError((err) => {
            console.error('Error loading client orders:', err);
            return of([]);
          }),
        );

        this.totalSpent$ = this.clientOrders$.pipe(
          map((orders) => orders.reduce((sum, o) => sum + (o.total || 0), 0)),
        );

        this.isLoading.set(false);
      } else {
        console.warn('No se encontró el email del cliente en la URL.');
        void this._router.navigate(['/admin/customers']);
      }
    });
  }

  /* istanbul ignore next -- requiere backend real para el camino exitoso */
  refreshOrders(): void {
    if (!this.clientEmail) {
      return;
    }
    this.clientOrders$ = this._clientService.getOrdersByClientEmail(this.clientEmail).pipe(
      shareReplay({ bufferSize: 1, refCount: true }),
      catchError((err) => {
        console.error('Error loading client orders:', err);
        return of([]);
      }),
    );
  }

  /* istanbul ignore next -- cubierto en integración/backend */
  deleteClient(): void {
    if (this.deletingClient() || !this.clientEmail) {
      return;
    }
    void this._sweetAlertService
      .confirm(
        'Eliminar Cliente',
        `¿Eliminar al cliente ${this.clientEmail} y toda su información? Esta acción queda registrada en la auditoría y es irreversible.`,
      )
      .then(async (confirmed) => {
        if (!confirmed) {
          return;
        }
        this.deletingClient.set(true);
        try {
          const fn = httpsCallable<
            { tenantProjectId: string; storeId: string; clientDocId: string },
            { success: boolean }
          >(this._functions, 'adminDeleteClient');
          await fn({
            tenantProjectId: environment.firebaseConfig.projectId,
            storeId: resolveTenantId(),
            clientDocId: `${resolveTenantId()}_${this.clientEmail}`,
          });
          await this._router.navigate(['/admin/customers']);
        } catch (err) {
          console.error('Error al eliminar cliente:', err);
        } finally {
          this.deletingClient.set(false);
        }
      });
  }

  /* istanbul ignore next -- cubierto en integración/backend */
  deleteOrder(orderId: string): void {
    if (this.deletingOrderId() === orderId) {
      return;
    }
    void this._sweetAlertService
      .confirm(
        'Eliminar Pedido',
        `¿Eliminar el pedido ${orderId}? Si tenía stock descontado se restituirá automáticamente. Queda registrado en la auditoría.`,
      )
      .then(async (confirmed) => {
        if (!confirmed) {
          return;
        }
        this.deletingOrderId.set(orderId);
        try {
          const fn = httpsCallable<
            { tenantProjectId: string; storeId: string; orderId: string },
            { success: boolean }
          >(this._functions, 'adminDeleteOrder');
          await fn({
            tenantProjectId: environment.firebaseConfig.projectId,
            storeId: resolveTenantId(),
            orderId,
          });
          this.refreshOrders();
        } catch (err) {
          console.error('Error al eliminar pedido:', err);
        } finally {
          this.deletingOrderId.set(null);
        }
      });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  goBackToList(): void {
    void this._router.navigate(['/admin/customers']);
  }
}
