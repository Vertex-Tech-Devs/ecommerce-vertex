import type { OnInit, OnDestroy } from '@angular/core';
import { Component, inject, signal } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import type { Subscription, Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, catchError, shareReplay } from 'rxjs/operators';

import { ClientService } from '../../../../../core/services/client.service';
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

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
  }

  goBackToList(): void {
    void this._router.navigate(['/admin/customers']);
  }
}
