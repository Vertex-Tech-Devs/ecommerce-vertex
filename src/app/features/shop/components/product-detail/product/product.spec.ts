import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Product } from './product';
import { ProductService } from '@core/services/product.service';
import { CartService } from '@core/services/cart.service';
import { AttributeService } from '@core/services/attribute.service';
import type { Product as ProductModel, ProductVariant } from '@core/models/product.model';
import type { Attribute } from '@core/models/attribute.model';

const mockProductWithVariants: ProductModel = {
  id: 'prod-var-1',
  name: 'Remera Estampada',
  description: 'Remera 100% algodón',
  price: 25000,
  categoryId: 'cat-1',
  image: 'https://example.com/remera.jpg',
  images: ['https://example.com/remera-back.jpg'],
  variantAttributes: ['attr-color', 'attr-talle'],
  totalStock: 15,
  inStockAttributes: {},
  createdAt: new Date(),
};

const mockVariants: ProductVariant[] = [
  {
    id: 'var-1',
    productId: 'prod-var-1',
    sku: 'REM-RED-M',
    stock: 5,
    attributes: { 'attr-color': 'Rojo', 'attr-talle': 'M' },
  },
  {
    id: 'var-2',
    productId: 'prod-var-1',
    sku: 'REM-BLUE-L',
    stock: 10,
    attributes: { 'attr-color': 'Azul', 'attr-talle': 'L' },
  },
];

const mockSimpleProduct: ProductModel = {
  id: 'prod-simple-1',
  name: 'Libro de Diseño Web',
  description: 'Guía práctica de diseño',
  price: 18000,
  categoryId: 'cat-books',
  image: 'https://example.com/libro.jpg',
  images: [],
  variantAttributes: [],
  totalStock: 8,
  inStockAttributes: {},
  createdAt: new Date(),
};

const mockSimpleVariants: ProductVariant[] = [
  {
    id: 'var-simple-1',
    productId: 'prod-simple-1',
    sku: 'LIB-001',
    stock: 8,
    attributes: {},
  },
];

const mockAttributes: Attribute[] = [
  { id: 'attr-color', name: 'Color', values: ['Rojo', 'Azul'] },
  { id: 'attr-talle', name: 'Talle', values: ['M', 'L'] },
];

describe('Product Component (Storefront)', () => {
  let component: Product;
  let fixture: ComponentFixture<Product>;
  let productServiceSpy: jasmine.SpyObj<ProductService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;
  let attributeServiceSpy: jasmine.SpyObj<AttributeService>;

  const setupTestBed = (productData: { product: ProductModel; variants: ProductVariant[] }) => {
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getProductWithVariants']);
    cartServiceSpy = jasmine.createSpyObj('CartService', ['addItem']);
    attributeServiceSpy = jasmine.createSpyObj('AttributeService', ['getAttributes']);

    productServiceSpy.getProductWithVariants.and.returnValue(of(productData));
    attributeServiceSpy.getAttributes.and.returnValue(of(mockAttributes));

    TestBed.configureTestingModule({
      imports: [Product],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
        { provide: AttributeService, useValue: attributeServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ id: productData.product.id })),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Product);
    component = fixture.componentInstance;
    fixture.detectChanges();
  };

  describe('Products with variants', () => {
    beforeEach(() => {
      setupTestBed({ product: mockProductWithVariants, variants: mockVariants });
    });

    it('should create and load product with variants', () => {
      expect(component).toBeTruthy();
      expect(component.product()?.name).toBe('Remera Estampada');
      expect(component.attributes().length).toBe(2);
      expect(component.selectedVariant()).toBeUndefined();
    });

    it('should allow selecting attributes and resolve selectedVariant', () => {
      component.selectAttribute('attr-color', 'Rojo');
      component.selectAttribute('attr-talle', 'M');

      expect(component.selectedVariant()?.id).toBe('var-1');
    });

    it('should call cartService.addItem when variant is selected and addToCart is clicked', () => {
      component.selectAttribute('attr-color', 'Rojo');
      component.selectAttribute('attr-talle', 'M');
      component.increaseQuantity();
      component.addToCart();

      expect(cartServiceSpy.addItem).toHaveBeenCalledWith(
        mockProductWithVariants,
        mockVariants[0],
        2,
      );
    });

    it('should change main image when changeMainImage is called', () => {
      component.changeMainImage('https://example.com/remera-back.jpg');
      expect(component.mainImage()).toBe('https://example.com/remera-back.jpg');
    });
  });

  describe('Simple products without attributes', () => {
    beforeEach(() => {
      setupTestBed({ product: mockSimpleProduct, variants: mockSimpleVariants });
    });

    it('should automatically select the default base variant without requiring attribute selection', () => {
      expect(component).toBeTruthy();
      expect(component.product()?.name).toBe('Libro de Diseño Web');
      expect(component.attributes().length).toBe(0);
      expect(component.selectedVariant()?.id).toBe('var-simple-1');
    });

    it('should allow immediate addition to cart for simple products', () => {
      component.addToCart();
      expect(cartServiceSpy.addItem).toHaveBeenCalledWith(
        mockSimpleProduct,
        mockSimpleVariants[0],
        1,
      );
    });

    it('should respect quantity increment and decrement', () => {
      component.increaseQuantity();
      expect(component.quantity()).toBe(2);

      component.decreaseQuantity();
      expect(component.quantity()).toBe(1);

      component.decreaseQuantity();
      expect(component.quantity()).toBe(1); // Min 1
    });
  });
});
