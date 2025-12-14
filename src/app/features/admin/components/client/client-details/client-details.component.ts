import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { ClientService } from '../../../../../core/services/client.service';
import { Client } from '../../../../../core/models/client.model';
import { Order } from '../../../../../core/models/order.model';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DatePipe,
  ],
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss'],
})
export class ClientDetailsComponent implements OnInit, OnDestroy {
  clientEmail: string | null = null;
  clientDetails: Client | undefined;
  clientOrders$!: Observable<Order[]>;

  private routeSubscription: Subscription | undefined;
  private clientSubscription: Subscription | undefined;


  private _route = inject(ActivatedRoute);
  private _router = inject(Router);
  private _clientService = inject(ClientService);

  constructor() { }

  ngOnInit(): void {
    this.routeSubscription = this._route.paramMap.pipe(
      switchMap(params => {
        this.clientEmail = params.get('email');
        if (this.clientEmail) {
          console.log('Cargando detalles para el cliente con email:', this.clientEmail);
          this.loadClientDetails(this.clientEmail);
          return this._clientService.getOrdersByClientEmail(this.clientEmail);
        } else {
          console.warn('No se encontró el email del cliente en la URL.');
          this._router.navigate(['/admin/customers']);
          return new Observable<Order[]>();
        }
      })
    ).subscribe(
      orders => {
        this.clientOrders$ = new Observable(observer => {
          observer.next(orders);
          observer.complete();
        });
      },
      error => console.error('Error al cargar los pedidos del cliente:', error)
    );
  }

  loadClientDetails(email: string): void {
    this.clientSubscription = this._clientService.getClients().subscribe({
      next: (clients) => {
        this.clientDetails = clients.find((client) => client.email === email);
        if (!this.clientDetails) {
          console.warn(`Cliente con email ${email} no encontrado.`);
          this._router.navigate(['/admin/customers']);
        }
      },
      error: (err) => {
        console.error('Error al cargar detalles del cliente:', err);
      },
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.clientSubscription?.unsubscribe();
  }

  goBackToList(): void {
    this._router.navigate(['/admin/customers']);
  }
}
