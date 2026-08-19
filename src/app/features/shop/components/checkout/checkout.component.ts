import type { OnInit } from '@angular/core';
import {
  Component,
  inject,
  ChangeDetectionStrategy,
  signal,
  computed,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { FormGroup, AbstractControl } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import type { WithFieldValue } from '@angular/fire/firestore';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { CartService } from '@core/services/cart.service';
import type { CartItem } from '@core/models/cart.model';
import { PaymentService } from '@core/services/payment.service';
import { SweetAlertService } from '@core/services/sweet-alert.service';
import { OrderService } from '@core/services/order.service';
import type {
  Order,
  OrderItem,
  DeliveryType,
  OrderDeliverySelection,
} from '@core/models/order.model';
import { StoreConfigService } from '@core/services/store-config.service';
import type { StorePickupLocation, DeliveryMethodConfig } from '@core/models/store-config.model';
import { DEFAULT_DELIVERY_METHOD_CONFIG } from '@core/models/store-config.model';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, OrderSummaryComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  cartService = inject(CartService);
  private paymentService = inject(PaymentService);
  private sweetAlertService = inject(SweetAlertService);
  private orderService = inject(OrderService);
  private storeConfigService = inject(StoreConfigService);
  private router = inject(Router);

  checkoutForm!: FormGroup;
  isProcessingPayment = signal(false);

  // Delivery method signals
  readonly deliveryConfig = computed<DeliveryMethodConfig>(
    () => this.storeConfigService.storeConfig()?.deliveryMethods ?? DEFAULT_DELIVERY_METHOD_CONFIG,
  );

  readonly availablePickupLocations = computed<StorePickupLocation[]>(() =>
    (this.deliveryConfig().pickupLocations ?? []).filter((location) => location.enabled),
  );

  readonly selectedDeliveryType = signal<DeliveryType>('home_delivery');
  readonly selectedPickupLocationId = signal<string | null>(null);

  readonly selectedPickupLocation = computed<StorePickupLocation | null>(() => {
    const locations = this.availablePickupLocations();
    const id = this.selectedPickupLocationId();
    return locations.find((loc) => loc.id === id) ?? locations[0] ?? null;
  });

  constructor() {
    effect(
      () => {
        const config = this.deliveryConfig();
        const locations = this.availablePickupLocations();

        // Intelligently set delivery type if configuration forces only pickup
        if (config.enableStorePickup && !config.enableHomeDelivery) {
          if (this.selectedDeliveryType() !== 'store_pickup') {
            this.selectedDeliveryType.set('store_pickup');
            this.updateShippingValidators(false);
          }
        } else if (!config.enableStorePickup && config.enableHomeDelivery) {
          if (this.selectedDeliveryType() !== 'home_delivery') {
            this.selectedDeliveryType.set('home_delivery');
            this.updateShippingValidators(true);
          }
        }

        // Initialize selected pickup location ID if null and locations exist
        if (!this.selectedPickupLocationId() && locations.length > 0) {
          this.selectedPickupLocationId.set(locations[0].id);
        }
      },
      { allowSignalWrites: true },
    );
  }

  ngOnInit(): void {
    this.checkoutForm = this.fb.group({
      contactInfo: this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [Validators.required, Validators.pattern('^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$')],
        ],
        dni: ['', [Validators.required, Validators.pattern('^[0-9]{7,8}$')]],
      }),
      shippingInfo: this.fb.group({
        address: ['', [Validators.required, Validators.minLength(5)]],
        city: ['', [Validators.required, Validators.minLength(3)]],
        zipCode: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9- ]{3,10}$')]],
        province: ['', [Validators.required, Validators.minLength(4)]],
      }),
    });

    if (this.selectedDeliveryType() === 'store_pickup') {
      this.updateShippingValidators(false);
    }
  }

  get contactControls(): { [key: string]: AbstractControl } {
    return (this.checkoutForm.get('contactInfo') as FormGroup).controls;
  }
  get shippingControls(): { [key: string]: AbstractControl } {
    return (this.checkoutForm.get('shippingInfo') as FormGroup).controls;
  }

  setDeliveryType(type: DeliveryType): void {
    this.selectedDeliveryType.set(type);
    if (type === 'store_pickup') {
      if (!this.selectedPickupLocationId() && this.availablePickupLocations().length > 0) {
        this.selectedPickupLocationId.set(this.availablePickupLocations()[0].id);
      }
      this.updateShippingValidators(false);
    } else {
      this.updateShippingValidators(true);
    }
  }

  setPickupLocation(locationId: string): void {
    this.selectedPickupLocationId.set(locationId);
  }

  private updateShippingValidators(isHomeDelivery: boolean): void {
    if (!this.checkoutForm) {
      return;
    }
    const shippingGroup = this.checkoutForm.get('shippingInfo') as FormGroup;
    if (!shippingGroup) {
      return;
    }

    if (isHomeDelivery) {
      shippingGroup.get('address')?.setValidators([Validators.required, Validators.minLength(5)]);
      shippingGroup.get('city')?.setValidators([Validators.required, Validators.minLength(3)]);
      shippingGroup
        .get('zipCode')
        ?.setValidators([Validators.required, Validators.pattern('^[a-zA-Z0-9- ]{3,10}$')]);
      shippingGroup.get('province')?.setValidators([Validators.required, Validators.minLength(4)]);
    } else {
      shippingGroup.get('address')?.clearValidators();
      shippingGroup.get('city')?.clearValidators();
      shippingGroup.get('zipCode')?.clearValidators();
      shippingGroup.get('province')?.clearValidators();
    }

    Object.keys(shippingGroup.controls).forEach((key) => {
      shippingGroup.get(key)?.updateValueAndValidity();
    });
  }

  async onSubmit(): Promise<void> {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      this.sweetAlertService.error(
        'Formulario Incompleto',
        'Por favor, completa todos los campos requeridos.',
      );
      return;
    }

    this.isProcessingPayment.set(true);
    this.sweetAlertService.loading('Preparando tu pago...', 'Por favor, espera.');

    const cart = this.cartService.cart();

    if (!cart || cart.items.length === 0) {
      this.sweetAlertService.error('Carrito Vacío', 'No puedes proceder al pago sin productos.');
      this.isProcessingPayment.set(false);
      void this.router.navigate(['/shop/cart']);
      return;
    }

    let orderId: string | null = null;

    try {
      orderId = await this.createOrder(cart.items, cart.total);

      const contactValue = this.checkoutForm.get('contactInfo')?.value;
      const payer = {
        firstName: contactValue?.firstName,
        lastName: contactValue?.lastName,
        email: contactValue?.email,
        dni: contactValue?.dni,
      };

      const paymentResult = await this.paymentService.initiatePayment(cart.items, orderId, payer);

      if (paymentResult.success && paymentResult.init_point) {
        this.cartService.clearCart();
        window.location.href = paymentResult.init_point;
      } else {
        throw new Error(paymentResult.error ?? 'No se pudo obtener la URL de pago.');
      }
    } catch (error: unknown) {
      console.error('Error en el proceso de checkout:', error);

      // Cancel the orphaned order if it was created before payment failed
      if (orderId) {
        try {
          await this.orderService.updateOrder(orderId, { status: 'cancelled' as const });
        } catch {
          console.warn('No se pudo cancelar la orden huérfana:', orderId);
        }
      }

      let errorMessage = 'Ocurrió un error inesperado al procesar tu pago.';
      const err = error as { code?: string; message?: string };
      if (err.code === 'resource-exhausted' || (err.message ?? '').includes('insuficiente')) {
        errorMessage = `¡Stock insuficiente! ${err.message}. Por favor, revisa tu carrito.`;
      } else if ((err.message ?? '').includes('precio inválido')) {
        errorMessage = `Uno de los productos en tu carrito tiene un precio inválido. Por favor, revisa tu carrito.`;
      } else if (err.message) {
        errorMessage = err.message;
      }

      this.sweetAlertService.error('Pago Rechazado', errorMessage);
      this.isProcessingPayment.set(false);
    }
  }

  private async createOrder(cartItems: CartItem[], total: number): Promise<string> {
    const { contactInfo, shippingInfo } = this.checkoutForm.value;

    const orderItems: OrderItem[] = cartItems.map((item) => ({
      productId: item.productId,
      variantId: item.variantId,
      productName: item.name,
      quantity: item.quantity,
      price: item.price,
      productImage: item.image ?? '',
      attributes: item.attributes,
    }));

    const isPickup = this.selectedDeliveryType() === 'store_pickup';
    const pickupLoc = this.selectedPickupLocation();

    const deliverySelection: OrderDeliverySelection = {
      type: this.selectedDeliveryType(),
      pickupLocationId: isPickup ? pickupLoc?.id : undefined,
      pickupAddressFormatted:
        isPickup && pickupLoc
          ? `${pickupLoc.name} - ${pickupLoc.address}, ${pickupLoc.city}`
          : undefined,
      notes: isPickup ? pickupLoc?.notes : undefined,
    };

    const newOrder: WithFieldValue<Omit<Order, 'id'>> = {
      userId: 'anonymous-user',
      clientName: `${contactInfo.firstName} ${contactInfo.lastName}`,
      clientEmail: contactInfo.email,
      clientPhone: contactInfo.phone,
      orderDate: new Date(),
      total,
      status: 'pending',
      items: orderItems,
      shippingAddress:
        isPickup && pickupLoc
          ? {
              street: pickupLoc.address,
              city: pickupLoc.city,
              state: pickupLoc.city,
              zipCode: '0000',
              country: 'Argentina',
            }
          : {
              street: shippingInfo.address,
              city: shippingInfo.city,
              state: shippingInfo.province,
              zipCode: shippingInfo.zipCode,
              country: 'Argentina',
            },
      paymentDetails: {
        paymentMethod: 'Mercado Pago',
        subtotal: total,
        shippingCost: 0,
        taxAmount: 0,
      },
      deliverySelection,
      stockDecremented: false,
    };

    try {
      const orderRef = await this.orderService.createOrder(newOrder);
      return orderRef.id;
    } catch (error) {
      console.error('Error al guardar el pedido:', error);
      throw new Error('No pudimos registrar tu pedido. Intenta de nuevo.');
    }
  }
}
