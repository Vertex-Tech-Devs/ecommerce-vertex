import { Injectable, inject, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, addDoc, setDoc, doc, getDocs, deleteDoc } from '@angular/fire/firestore';
import { HeroBanner, FeaturedCategory } from '@core/models/home-content.model';
import { Category } from '@core/models/category.model';
import { SweetAlertService } from './sweet-alert.service';

interface SeedProduct {
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  categoryName: string;
  stock: number;
  rating: number;
  reviews: number;
  sku: string;
  isNew: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class SeedDataService {
  private firestore = inject(Firestore);
  private sweetAlertService = inject(SweetAlertService);
  private injector = inject(Injector);

  private readonly heroImages = [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=900&fit=crop&q=95&auto=format&crop=entropy&cs=tinysrgb',
    'https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&h=900&fit=crop&q=95&auto=format&crop=entropy&cs=tinysrgb',
    'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1600&h=900&fit=crop&q=95&auto=format&crop=entropy&cs=tinysrgb',
    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1600&h=900&fit=crop&q=95&auto=format&crop=entropy&cs=tinysrgb',
  ];

  private categories: Category[] = [
    {
      id: 'cat-001',
      name: 'Electrónica',
      slug: 'electronica',
      parentId: null,
      filterableAttributes: ['marca', 'precio', 'características'],
    },
    {
      id: 'cat-002',
      name: 'Moda',
      slug: 'moda',
      parentId: null,
      filterableAttributes: ['talla', 'color', 'material'],
    },
    {
      id: 'cat-003',
      name: 'Hogar',
      slug: 'hogar',
      parentId: null,
      filterableAttributes: ['estilo', 'material', 'tamaño'],
    },
    {
      id: 'cat-004',
      name: 'Deportes',
      slug: 'deportes',
      parentId: null,
      filterableAttributes: ['tipo', 'intensidad', 'nivel'],
    },
    {
      id: 'cat-005',
      name: 'Belleza',
      slug: 'belleza',
      parentId: null,
      filterableAttributes: ['tipo_piel', 'ingrediente', 'marca'],
    },
  ];

  private readonly productTemplates = {
    'cat-001': {
      prefixes: ['Pro', 'Ultra', 'Max', 'Plus', 'Elite', 'Premium', 'Gaming'],
      baseNames: ['Smartphone', 'Tablet', 'Laptop', 'Monitor', 'Cámara', 'Router', 'Headset'],
      suffixes: ['Series', 'Edition', 'Model', 'X', 'Pro', 'Lite', '5G'],
      descriptions: [
        'Último modelo con tecnología de punta',
        'Rendimiento excepcional y diseño premium',
        'Equipado con características avanzadas',
        'Experiencia de usuario inmejorable',
      ],
      priceRange: [99.99, 1999.99],
      images: [
        'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop&q=80&auto=format',
        'https://images.unsplash.com/photo-1588872657840-790ff3bda245?w=500&h=500&fit=crop&q=80&auto=format',
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&q=80&auto=format',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop&q=80&auto=format',
      ],
    },
    'cat-002': {
      prefixes: ['Clásico', 'Moderno', 'Premium', 'Elegante', 'Sport', 'Casual'],
      baseNames: ['Chaqueta', 'Zapatillas', 'Reloj', 'Camiseta', 'Pantalones', 'Abrigo', 'Jersey'],
      suffixes: ['Collection', 'Line', 'Style', 'Series', 'Edition', 'Fit'],
      descriptions: [
        'Diseño exclusivo y de calidad premium',
        'Comodidad y estilo en uno',
        'Material de alta calidad y duradero',
        'Perfecto para cualquier ocasión',
      ],
      priceRange: [29.99, 399.99],
      images: [
        'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop&q=80&auto=format',
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&q=80&auto=format',
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&q=80&auto=format',
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500&h=500&fit=crop&q=80&auto=format',
      ],
    },
    'cat-003': {
      prefixes: ['Smart', 'Premium', 'Deluxe', 'Pro', 'Elite', 'Comfort'],
      baseNames: ['Lámpara', 'Almohada', 'Cafetera', 'Sofá', 'Mesa', 'Silla', 'Cortinas'],
      suffixes: ['Home', 'Series', 'Edition', 'Plus', 'Pro', 'Living'],
      descriptions: [
        'Transforma tu espacio con elegancia',
        'Diseño moderno y funcional',
        'Confort y durabilidad garantizados',
        'Perfecto para tu hogar moderno',
      ],
      priceRange: [49.99, 499.99],
      images: [
        'https://images.unsplash.com/photo-1565636192335-14e9edc4b8a3?w=500&h=500&fit=crop&q=80&auto=format',
        'https://images.unsplash.com/photo-1578500494198-246f612d03b3?w=500&h=500&fit=crop&q=80&auto=format',
        'https://images.unsplash.com/photo-1517668808822-9ebb02ae2a0e?w=500&h=500&fit=crop&q=80&auto=format',
        'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=500&fit=crop&q=80&auto=format',
      ],
    },
    'cat-004': {
      prefixes: ['Pro', 'Sport', 'Elite', 'Performance', 'Active', 'Power'],
      baseNames: ['Bicicleta', 'Mancuernas', 'Colchoneta', 'Casco', 'Patines', 'Balón'],
      suffixes: ['Gear', 'Equipment', 'Pro', 'Edition', 'Series', 'Plus'],
      descriptions: [
        'Optimizado para máximo rendimiento',
        'Equipo profesional de calidad',
        'Ideal para deportistas dedicados',
        'Material resistente y duradero',
      ],
      priceRange: [39.99, 599.99],
      images: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop&q=80&auto=format',
        'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=500&fit=crop&q=80&auto=format',
        'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=500&fit=crop&q=80&auto=format',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&h=500&fit=crop&q=80&auto=format',
      ],
    },
    'cat-005': {
      prefixes: ['Luxury', 'Natural', 'Organic', 'Premium', 'Pure', 'Deluxe'],
      baseNames: ['Sérum', 'Crema', 'Kit', 'Mascarilla', 'Tónico', 'Champú'],
      suffixes: ['Care', 'Collection', 'Treatment', 'Essence', 'Complex', 'Plus'],
      descriptions: [
        'Fórmula científicamente probada',
        'Ingredientes naturales cuidadosamente seleccionados',
        'Transforma tu rutina de belleza',
        'Cuidado profesional en casa',
      ],
      priceRange: [19.99, 149.99],
      images: [
        'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&h=500&fit=crop&q=80&auto=format',
        'https://images.unsplash.com/photo-1564661133-2c1e09e6e2ab?w=500&h=500&fit=crop&q=80&auto=format',
        'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop&q=80&auto=format',
        'https://images.unsplash.com/photo-1596217325052-e0e6db873b7c?w=500&h=500&fit=crop&q=80&auto=format',
      ],
    },
  };

  private generateDynamicProduct(
    categoryId: keyof typeof this.productTemplates, 
    categoryName: string
  ): SeedProduct {
    const template = this.productTemplates[categoryId];
    const prefix = template.prefixes[Math.floor(Math.random() * template.prefixes.length)];
    const baseName = template.baseNames[Math.floor(Math.random() * template.baseNames.length)];
    const suffix = template.suffixes[Math.floor(Math.random() * template.suffixes.length)];
    const name = `${prefix} ${baseName} ${suffix}`;
    const description = template.descriptions[Math.floor(Math.random() * template.descriptions.length)];
    const price = Math.random() * (template.priceRange[1] - template.priceRange[0]) + template.priceRange[0];
    const image = template.images[Math.floor(Math.random() * template.images.length)];
    const sku = `${categoryName.substring(0, 3).toUpperCase()}-${name.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

    return {
      name,
      description,
      price: parseFloat(price.toFixed(2)),
      image,
      categoryId,
      categoryName,
      stock: Math.floor(Math.random() * 100),
      rating: parseFloat((Math.random() * (5 - 3) + 3).toFixed(1)),
      reviews: Math.floor(Math.random() * 200),
      sku,
      isNew: Math.random() > 0.5,
    };
  }

  async seedAllData(deleteExisting: boolean = false): Promise<void> {
    try {
      this.sweetAlertService.loading(
        deleteExisting ? 'Regenerando datos de prueba...' : 'Generando datos de prueba...',
        'Por favor, espera mientras se cargan los datos'
      );

      if (deleteExisting) {
        await this.clearCollections();
        console.log('🗑️ Datos anteriores eliminados');
      }

      await this.seedCategories();
      console.log('✅ Categorías creadas');

      await this.seedProducts();
      console.log('✅ Productos creados');

      try {
        await this.seedHeroBanner();
        console.log('✅ Banner hero creado');
      } catch (error: any) {
        if (error.message?.includes('permission')) {
          console.warn('⚠️ Permiso denegado para banner. Solo los admins pueden crear site-content.');
        } else {
          throw error;
        }
      }

      try {
        await this.seedAboutUs();
        console.log('✅ Información "Acerca de" creada');
      } catch (error: any) {
        if (error.message?.includes('permission')) {
          console.warn('⚠️ Permiso denegado para about-us. Solo los admins pueden crear site-content.');
        } else {
          throw error;
        }
      }

      this.sweetAlertService.close();
      this.sweetAlertService.success(
        '¡Éxito!',
        'Base de datos poblada con datos de prueba. La aplicación está lista para testing.'
      );
    } catch (error: any) {
      console.error('❌ Error en seed:', error);
      this.sweetAlertService.close();
      this.sweetAlertService.error(
        'Error al Generar Datos',
        `${error.message}\n\nAsegúrate de:\n• Tener permisos de admin\n• Tener conexión a internet\n• Las reglas de Firestore permitan escritura`
      );
      throw error;
    }
  }

  private async clearCollections(): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const collections = ['products', 'categories', 'site-content'];
      for (const collectionName of collections) {
        const collectionRef = collection(this.firestore, collectionName);
        const snapshot = await getDocs(collectionRef);
        for (const docSnap of snapshot.docs) {
          await deleteDoc(docSnap.ref);
        }
      }
    });
  }

  private async seedCategories(): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const categoriesRef = collection(this.firestore, 'categories');
      for (const category of this.categories) {
        await addDoc(categoriesRef, {
          ...category,
          createdAt: new Date(),
        });
      }
    });
  }

  private async seedProducts(): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const productsRef = collection(this.firestore, 'products');
      const categoryIds = Object.keys(this.productTemplates) as Array<keyof typeof this.productTemplates>;

      for (const categoryId of categoryIds) {
        const category = this.categories.find((c) => c.id === categoryId);
        if (!category) continue;

        for (let i = 0; i < 3; i++) {
          const product = this.generateDynamicProduct(categoryId, category.name);
          const productData = {
            name: product.name,
            description: product.description,
            price: product.price,
            image: product.image,
            categoryId: product.categoryId,
            categoryName: product.categoryName,
            variants: [
              {
                id: `variant-${Date.now()}-${Math.random()}`,
                name: 'Color: Estándar',
                sku: product.sku,
                stock: product.stock,
                price: product.price,
              },
            ],
            rating: product.rating,
            reviews: product.reviews,
            sku: product.sku,
            isNew: product.isNew,
            createdAt: product.isNew ? new Date() : new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
          };
          await addDoc(productsRef, productData);
        }
      }
    });
  }

  private async seedHeroBanner(): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const siteContentRef = collection(this.firestore, 'site-content');
      const homeDocRef = doc(siteContentRef, 'home');
      const featuredCategories: FeaturedCategory[] = [
        {
          categoryId: 'cat-001',
          name: 'Electrónica',
          slug: 'electronica',
          imageUrl: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?w=400&h=400&fit=crop&q=80&auto=format',
        },
        {
          categoryId: 'cat-002',
          name: 'Moda',
          slug: 'moda',
          imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop&q=80&auto=format',
        },
        {
          categoryId: 'cat-003',
          name: 'Hogar',
          slug: 'hogar',
          imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop&q=80&auto=format',
        },
      ];
      const heroBanner: HeroBanner = {
        heroImages: this.heroImages,
        carouselSettings: {
          interval: 5000,
          showIndicators: true,
        },
        title: 'Bienvenido a Vertex',
        buttonText: 'Explorar Ahora',
        buttonLink: '/shop/catalog',
        featuredCategories: featuredCategories,
        lastUpdated: new Date(),
      };
      await setDoc(homeDocRef, heroBanner);
    });
  }

  private async seedAboutUs(): Promise<void> {
    return runInInjectionContext(this.injector, async () => {
      const siteContentRef = collection(this.firestore, 'site-content');
      const aboutDocRef = doc(siteContentRef, 'about-us');
      const aboutUs = {
        title: 'Acerca de Vertex',
        subtitle: 'Somos líderes en e-commerce',
        description: `
          En Vertex, nos dedicamos a ofrecer los mejores productos del mercado con una experiencia de compra excepcional.
          Con más de 10 años en la industria, hemos ganado la confianza de miles de clientes en toda América Latina.
          Nuestro compromiso es garantizar calidad, rapidez en las entregas y atención al cliente de primera clase.
        `,
        bannerImage: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=600&fit=crop&q=80&auto=format',
        centralImage: 'https://images.unsplash.com/photo-1552765753-b9b9f43e0c83?w=500&h=500&fit=crop&q=80&auto=format',
        statistics: [
          { label: 'Productos', value: '15000+' },
          { label: 'Clientes Satisfechos', value: '250K+' },
          { label: 'Países Cubiertos', value: '12' },
          { label: 'Años de Experiencia', value: '10+' },
        ],
        values: [
          {
            title: 'Calidad',
            description: 'Seleccionamos cuidadosamente cada producto',
            icon: 'star',
          },
          {
            title: 'Rapidez',
            description: 'Entrega en 24-48 horas',
            icon: 'lightning',
          },
          {
            title: 'Confianza',
            description: 'Garantía en todos nuestros productos',
            icon: 'shield-check',
          },
          {
            title: 'Soporte',
            description: 'Atención 24/7 para ayudarte',
            icon: 'headset',
          },
        ],
        lastUpdated: new Date(),
      };
      await setDoc(aboutDocRef, aboutUs);
    });
  }
}
