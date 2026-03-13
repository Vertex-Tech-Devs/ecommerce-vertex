import { Injectable, inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import {
  Firestore, collection, addDoc, setDoc, doc, getDocs, deleteDoc,
} from '@angular/fire/firestore';
import { SweetAlertService } from './sweet-alert.service';

// ─── image helpers ────────────────────────────────────────────────────────────

/** Unsplash CDN – specific fashion photo by ID */
function u(id: string, w: number, h: number): string {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;
}

// ─── Curated Unsplash photo IDs for e-commerce fashion ───────────────────────
// Hero banners (1920×700)
const HERO = [
  '1558769132-cb1aea458c5e', // ropa colgada en tienda
  '1483985988355-763728e1935b', // mujer de compras
  '1469334031218-e382a71b716b', // pasarela de moda
  '1445205170230-053b83016050', // show de moda
  '1490481651871-ab68de25d43d', // colección colgada
];
// Categories (400×400)
const CAT = {
  remeras:    '1521572163474-6864f9cf17ab',
  pantalones: '1542272604-787c3835535d',
  zapatillas: '1542291026-7eec264c27ff',
  accesorios: '1511499767150-a48a237f0083',
  camperas:   '1551028719-00167b16eac5',
};
// Featured categories (600×400)
const FEAT = {
  remeras:    '1523381240423-59b6e0c53abe',
  zapatillas: '1491553895911-0055eca6402d',
  camperas:   '1551537482-f2075a1d41f2',
};

// ─── types ────────────────────────────────────────────────────────────────────

interface SeedProduct { id: string; name: string; finalPrice: number; image: string; categoryName: string; }
interface SeedClient  { id: string; fullName: string; email: string; phone: string; }

// ─── service ──────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class SeedDataService {
  private firestore = inject(Firestore);
  private sweetAlert = inject(SweetAlertService);
  private injector   = inject(EnvironmentInjector);

  private run<T>(fn: () => Promise<T>): Promise<T> {
    return runInInjectionContext(this.injector, fn);
  }

  // ── main entry point (always full reset) ─────────────────────────────────

  async seedAllData(): Promise<void> {
    this.sweetAlert.loading('Regenerando datos…');
    try {
      await this.clearAll();
      await this.seedAttributes();
      const cats    = await this.seedCategories();
      const prods   = await this.seedProducts(cats);
      const clients = await this.seedClients();
      await this.seedOrders(prods, clients);
      await this.seedHeroBanner(cats);
      await this.seedAboutUs();
      await this.seedFooter();

      this.sweetAlert.close();
      this.sweetAlert.success('¡Listo!', 'Base de datos regenerada con todos los datos de prueba.');
    } catch (err) {
      console.error('Seed error:', err);
      this.sweetAlert.error('Error', 'Revisá la consola para más detalles.');
    }
  }

  // ── clear everything ──────────────────────────────────────────────────────

  private async clearAll(): Promise<void> {
    const cols = ['products', 'categories', 'clients', 'orders', 'attributes'];
    for (const col of cols) {
      const snap = await this.run(() => getDocs(collection(this.firestore, col)));
      for (const d of snap.docs) await this.run(() => deleteDoc(d.ref));
    }
    for (const [c, d] of [['siteContent','homePage'], ['pages','aboutUs'], ['configuracion','footer']] as const) {
      await this.run(() => deleteDoc(doc(this.firestore, c, d)));
    }
  }

  // ── attributes ────────────────────────────────────────────────────────────

  private async seedAttributes(): Promise<void> {
    const list = [
      { name: 'Talle (ropa)',      values: ['XS','S','M','L','XL','XXL'] },
      { name: 'Talle (calzado)',   values: ['36','37','38','39','40','41','42','43','44'] },
      { name: 'Talle (pantalón)', values: ['28','30','32','34','36','38'] },
      { name: 'Color',             values: ['Negro','Blanco','Gris','Azul','Rojo','Verde','Beige','Marrón','Rosa','Caqui'] },
      { name: 'Material',          values: ['Algodón','Poliéster','Lino','Cuero','Denim','Lana'] },
    ];
    for (const a of list) await this.run(() => addDoc(collection(this.firestore, 'attributes'), a));
  }

  // ── categories ────────────────────────────────────────────────────────────

  private async seedCategories(): Promise<Record<string, { id: string; name: string }>> {
    const defs = [
      { slug: 'remeras',    name: 'Remeras',    attrs: ['talle','color'] },
      { slug: 'pantalones', name: 'Pantalones', attrs: ['talle','color'] },
      { slug: 'zapatillas', name: 'Zapatillas', attrs: ['talle','color'] },
      { slug: 'accesorios', name: 'Accesorios', attrs: ['color'] },
      { slug: 'camperas',   name: 'Camperas',   attrs: ['talle','color'] },
    ];
    const out: Record<string, { id: string; name: string }> = {};
    for (const d of defs) {
      const ref = await this.run(() =>
        addDoc(collection(this.firestore, 'categories'), {
          name: d.name, slug: d.slug, parentId: null,
          filterableAttributes: d.attrs,
          imageUrl: u(CAT[d.slug as keyof typeof CAT], 400, 400),
          createdAt: new Date(),
        })
      );
      out[d.slug] = { id: ref.id, name: d.name };
    }
    return out;
  }

  // ── products ──────────────────────────────────────────────────────────────

  private async seedProducts(cats: Record<string, { id: string; name: string }>): Promise<SeedProduct[]> {
    const catalogue = [

      // ── REMERAS ────────────────────────────────────────────────────────────
      {
        slug: 'remeras', talles: ['XS','S','M','L','XL','XXL'], colors: ['Negro','Blanco','Gris','Azul','Rojo'],
        variants: ['talle','color'],
        items: [
          {
            name: 'Remera Básica Pima 180g', featured: true, price: 8500, discount: 0,
            desc: 'Confeccionada en algodón Pima 180 g/m² con certificado GOTS. Costuras reforzadas, cuello canalé y lavados garantizados sin deformación. La base ideal para cualquier look.',
            imgs: ['1521572163474-6864f9cf17ab','1503342217505-b0a15ec3261c','1523381240423-59b6e0c53abe','1576566588028-4147f3842f27'],
          },
          {
            name: 'Remera Oversize Drop Shoulder', featured: false, price: 10900, discount: 15,
            desc: 'Corte oversize con hombro caído y largo extendido. Tela jersey 220 g/m², efecto delavado suave. Ideal para combinar con joggers o jeans baggy.',
            imgs: ['1567113463300-102a7eb3cb26','1503342217505-b0a15ec3261c','1571945153237-4929e783af4a','1523381240423-59b6e0c53abe'],
          },
          {
            name: 'Remera Polo Piqué Premium', featured: false, price: 15200, discount: 10,
            desc: 'Polo de tela piqué doble torsión 240 g/m². Cuello y puños acanalados, botones de nácar en frente. Corte slim fit que moldea sin apretar. Disponible en cinco colores clásicos.',
            imgs: ['1576566588028-4147f3842f27','1521572163474-6864f9cf17ab','1503342217505-b0a15ec3261c','1571945153237-4929e783af4a'],
          },
          {
            name: 'Remera Manga Larga Térmica', featured: false, price: 13800, discount: 0,
            desc: 'Tejido térmico de doble cara (algodón exterior, poliéster termoaislante interior). Puños ajustados antipilling. La capa base perfecta para días fríos o actividades outdoor.',
            imgs: ['1571945153237-4929e783af4a','1567113463300-102a7eb3cb26','1521572163474-6864f9cf17ab','1576566588028-4147f3842f27'],
          },
          {
            name: 'Remera Estampada Artesanal', featured: false, price: 12400, discount: 0,
            desc: 'Serigrafía artesanal de cuatro colores sobre tela 100% algodón ring spun. Cada estampado es numerado. Diseños exclusivos de artistas locales en colaboración con Vertex.',
            imgs: ['1523381240423-59b6e0c53abe','1521572163474-6864f9cf17ab','1567113463300-102a7eb3cb26','1503342217505-b0a15ec3261c'],
          },
        ],
      },

      // ── PANTALONES ─────────────────────────────────────────────────────────
      {
        slug: 'pantalones', talles: ['28','30','32','34','36','38'], colors: ['Azul índigo','Negro','Beige','Gris','Verde militar'],
        variants: ['talle','color'],
        items: [
          {
            name: 'Jean Slim Fit Índigo 12oz', featured: true, price: 22500, discount: 0,
            desc: 'Denim selvático 100% algodón 12 oz con lavado índigo profundo. Corte slim que abraza la silueta sin limitar el movimiento. Cinco bolsillos clásicos, costura naranja característica.',
            imgs: ['1542272604-787c3835535d','1541099649105-f69ad21f3246','1604176354204-9268737828e4','1624378439575-d8705ad7ae80'],
          },
          {
            name: 'Jean Recto Wide Leg', featured: false, price: 24800, discount: 0,
            desc: 'Corte recto amplio desde la cadera hasta el tobillo. Tela denim 380 g/m² de alta estabilidad. Versátil: queda bien con zapatillas, botas o mocasines.',
            imgs: ['1604176354204-9268737828e4','1542272604-787c3835535d','1624378439575-d8705ad7ae80','1541099649105-f69ad21f3246'],
          },
          {
            name: 'Jogger Premium Fleece 320g', featured: false, price: 18900, discount: 20,
            desc: 'Interior de felpa de algodón 320 g/m², exterior liso antipilling. Pretina ancha con cordón plano, puños con elástico doble. Dos bolsillos laterales profundos y bolsillo trasero con cierre.',
            imgs: ['1624378439575-d8705ad7ae80','1541099649105-f69ad21f3246','1604176354204-9268737828e4','1542272604-787c3835535d'],
          },
          {
            name: 'Pantalón Chino Gabardina Slim', featured: false, price: 19500, discount: 0,
            desc: 'Gabardina de algodón-elastano 260 g/m² con 4% stretch para mayor comodidad. Corte slim levemente cónico. Ideal para looks business casual o smartcasual. Cinco bolsillos.',
            imgs: ['1541099649105-f69ad21f3246','1604176354204-9268737828e4','1542272604-787c3835535d','1624378439575-d8705ad7ae80'],
          },
          {
            name: 'Pantalón Cargo Ripstop', featured: false, price: 26500, discount: 10,
            desc: 'Tela ripstop 65/35 poliéster-algodón, resistente al desgarro y a la humedad. Seis bolsillos funcionales con cierre YKK. Pretina elástica trasera. El utilitario que no sacrifica el estilo.',
            imgs: ['1624378439575-d8705ad7ae80','1604176354204-9268737828e4','1541099649105-f69ad21f3246','1542272604-787c3835535d'],
          },
        ],
      },

      // ── ZAPATILLAS ─────────────────────────────────────────────────────────
      {
        slug: 'zapatillas', talles: ['38','39','40','41','42','43','44'], colors: ['Blanco/Negro','Negro total','Gris/Azul','Beige/Crema','Rojo/Blanco'],
        variants: ['talle','color'],
        items: [
          {
            name: 'Zapatilla Running Air Zoom V3', featured: true, price: 52000, discount: 0,
            desc: 'Mediasuela de espuma EVA + cámara de aire en talón y antepié. Upper de malla 3D ultraliviana con refuerzos de TPU. Suela de goma con canales multidireccionales. Peso: 285 g (talle 42).',
            imgs: ['1542291026-7eec264c27ff','1491553895911-0055eca6402d','1539185441755-769473a23570','1525966222134-fcfa99b8ae77'],
          },
          {
            name: 'Zapatilla Urbana Canvas Vulc', featured: false, price: 32000, discount: 15,
            desc: 'Upper de lona canvas 100% algodón con refuerzo en puntera. Suela vulcanizada clásica con textura cuadriculada. La base del armario urbano desde 1960. Disponible en 5 colores.',
            imgs: ['1525966222134-fcfa99b8ae77','1542291026-7eec264c27ff','1491553895911-0055eca6402d','1539185441755-769473a23570'],
          },
          {
            name: 'Zapatilla Retro 94 Leather', featured: false, price: 58000, discount: 0,
            desc: 'Reedición limitada inspirada en clásicos de los 90. Upper de cuero full grain + panel de nylon. Amortiguación con tecnología vintage foam. Logo bordado lateral. Caja de edición coleccionable.',
            imgs: ['1491553895911-0055eca6402d','1539185441755-769473a23570','1525966222134-fcfa99b8ae77','1542291026-7eec264c27ff'],
          },
          {
            name: 'Zapatilla Training Functional', featured: false, price: 46000, discount: 0,
            desc: 'Construida para HIIT, functional training y crossfit. Suela plana de 4 mm para máxima estabilidad en sentadillas. Upper de malla de ventilación zonal. Cordones planos preatados.',
            imgs: ['1539185441755-769473a23570','1491553895911-0055eca6402d','1542291026-7eec264c27ff','1525966222134-fcfa99b8ae77'],
          },
          {
            name: 'Zapatilla Chunky Platform 4cm', featured: false, price: 44000, discount: 25,
            desc: 'Plataforma de 4 cm en suela de goma inyectada. Upper de cuero sintético premium con costuras decorativas. El modelo favorito del streetwear contemporáneo. Sin cordones, cierre velcro oculto.',
            imgs: ['1525966222134-fcfa99b8ae77','1542291026-7eec264c27ff','1539185441755-769473a23570','1491553895911-0055eca6402d'],
          },
        ],
      },

      // ── ACCESORIOS ─────────────────────────────────────────────────────────
      {
        slug: 'accesorios', talles: ['Único'], colors: ['Negro','Marrón','Azul navy','Beige','Oliva'],
        variants: ['color'],
        items: [
          {
            name: 'Gorra Snapback 6 Paneles', featured: true, price: 7500, discount: 0,
            desc: 'Six-panel en twill de algodón 100%. Visera plana pre-curvada. Panel frontal con bordado 3D. Cierre snapback metálico ajustable talla única. Transpirabilidad garantizada por malla lateral.',
            imgs: ['1534307671554-9a6d81f4d629','1511499767150-a48a237f0083','1548036328-c9fa89d128fa','1553062407-98eeb64c6a62'],
          },
          {
            name: 'Riñonera Crossbody 2L', featured: false, price: 9800, discount: 10,
            desc: 'Cuerpo principal + bolsillo frontal con cierre YKK y organizador interior. Correa ajustable doble uso: cintura o bandolera. Tela ripstop resistente al agua con cremalleras plastificadas.',
            imgs: ['1548036328-c9fa89d128fa','1553062407-98eeb64c6a62','1534307671554-9a6d81f4d629','1511499767150-a48a237f0083'],
          },
          {
            name: 'Cinturón Cuero Full Grain 35mm', featured: false, price: 14500, discount: 0,
            desc: 'Cuero full grain primera selección curtido al vegetal. Hebilla de zamak con acabado matte. Ancho 35 mm, largo ajustable hasta 120 cm. Incluye pasacinturón extra. Garantía de 3 años.',
            imgs: ['1553062407-98eeb64c6a62','1534307671554-9a6d81f4d629','1548036328-c9fa89d128fa','1511499767150-a48a237f0083'],
          },
          {
            name: 'Mochila Urban Tech 25L', featured: false, price: 38000, discount: 0,
            desc: 'Compartimento laptop hasta 16" con espuma protectora. Bolsa delantera organizada con 8 divisiones. Puerto USB integrado. Espalda ergonómica con malla 3D transpirable. Peso: 820 g.',
            imgs: ['1553062407-98eeb64c6a62','1548036328-c9fa89d128fa','1511499767150-a48a237f0083','1534307671554-9a6d81f4d629'],
          },
          {
            name: 'Gafas de Sol Polarizadas Wayfarer', featured: false, price: 19500, discount: 20,
            desc: 'Lentes polarizados CAT 3 con filtro UV400. Montura wayfarer de acetato italiano inyectado. Bisagras de primavera reforzadas. Incluye estuche rígido, paño microfibra y certificado de autenticidad.',
            imgs: ['1511499767150-a48a237f0083','1534307671554-9a6d81f4d629','1553062407-98eeb64c6a62','1548036328-c9fa89d128fa'],
          },
        ],
      },

      // ── CAMPERAS ───────────────────────────────────────────────────────────
      {
        slug: 'camperas', talles: ['XS','S','M','L','XL','XXL'], colors: ['Negro','Marrón','Caqui','Navy','Rojo'],
        variants: ['talle','color'],
        items: [
          {
            name: 'Campera Rompevientos Packable', featured: true, price: 38000, discount: 0,
            desc: 'Membrana impermeabilizante 3.000 mm de presión hídrica. Costuras termoselladas. Empacable en su propio bolsillo trasero formando una pochette de 20×15 cm. Peso total: 340 g.',
            imgs: ['1551028719-00167b16eac5','1551537482-f2075a1d41f2','1495105787522-5334e3ffa0ef','1520975661595-6453be3f7070'],
          },
          {
            name: 'Campera Cuero Biker Matte', featured: false, price: 72000, discount: 10,
            desc: 'Cuero sintético PU de alta densidad con acabado matte. Forro de satín con bolsillos internos. Cierres metálicos YKK en diagonal, mangas y cuello. Hombros estructurados con padding.',
            imgs: ['1520975661595-6453be3f7070','1551028719-00167b16eac5','1551537482-f2075a1d41f2','1495105787522-5334e3ffa0ef'],
          },
          {
            name: 'Bomber Classic MA-1 Reversible', featured: false, price: 45000, discount: 0,
            desc: 'Reversible: cara exterior en nylon ripstop, cara interior en satín naranja. Inspirada en el MA-1 original. Puños, cuello y dobladillo trenzados. Logo bordado en pecho. Icónica y atemporal.',
            imgs: ['1551537482-f2075a1d41f2','1495105787522-5334e3ffa0ef','1520975661595-6453be3f7070','1551028719-00167b16eac5'],
          },
          {
            name: 'Campera Puffer 600 Fill DWR', featured: false, price: 62000, discount: 15,
            desc: 'Relleno de pluma sintética 600 fill power con tratamiento DWR (repelente al agua). Costuras de canalón para distribución uniforme del calor. Cremallera YKK doble tirador. Peso: 520 g.',
            imgs: ['1547949003-9792a18a2601','1551028719-00167b16eac5','1551537482-f2075a1d41f2','1495105787522-5334e3ffa0ef'],
          },
          {
            name: 'Campera Denim Sherpa Contrast', featured: false, price: 52000, discount: 0,
            desc: 'Denim 14 oz lavado a la piedra con cuello, solapa y forro de sherpa de 300 g/m². Botones metálicos envejecidos. Bolsillos pecho y laterales funcionales. El clásico que nunca se va.',
            imgs: ['1495105787522-5334e3ffa0ef','1520975661595-6453be3f7070','1547949003-9792a18a2601','1551037482-f2075a1d41f2'],
          },
        ],
      },
    ];

    const seeded: SeedProduct[] = [];
    for (const cat of catalogue) {
      const catData = cats[cat.slug];
      if (!catData) continue;
      const isAcc = cat.slug === 'accesorios';
      const inStock = isAcc
        ? { color: cat.colors }
        : { talle: cat.talles, color: cat.colors };

      for (const item of cat.items) {
        const mainImg = u(item.imgs[0], 600, 600);
        const extraImgs = item.imgs.slice(1).map(id => u(id, 600, 600));
        const fp = item.discount > 0
          ? Math.round(item.price * (1 - item.discount / 100))
          : item.price;

        const ref = await this.run(() =>
          addDoc(collection(this.firestore, 'products'), {
            name:             item.name,
            description:      item.desc,
            categoryId:       catData.id,
            price:            item.price,
            discount:         item.discount,
            finalPrice:       fp,
            image:            mainImg,
            images:           [mainImg, ...extraImgs],
            totalStock:       80,
            inStockAttributes: inStock,
            variantAttributes: cat.variants,
            featured:         item.featured,
            active:           true,
            createdAt:        new Date(),
          })
        );
        seeded.push({ id: ref.id, name: item.name, finalPrice: fp, image: mainImg, categoryName: catData.name });
      }
    }
    return seeded;
  }

  // ── clients ───────────────────────────────────────────────────────────────

  private async seedClients(): Promise<SeedClient[]> {
    const data: Omit<SeedClient, 'id'>[] = [
      { fullName: 'Valentina García',   email: 'valenti.garcia@gmail.com',   phone: '+54 9 11 4523-8801' },
      { fullName: 'Mateo Rodríguez',    email: 'mateo.rodriguez@gmail.com',  phone: '+54 9 11 5634-9912' },
      { fullName: 'Camila López',       email: 'camila.lopez@outlook.com',   phone: '+54 9 11 4712-3345' },
      { fullName: 'Santiago Martínez',  email: 'santi.martinez@gmail.com',   phone: '+54 9 11 6789-2200' },
      { fullName: 'Lucía González',     email: 'luci.gonzalez@yahoo.com.ar', phone: '+54 9 11 3345-6678' },
      { fullName: 'Tomás Pérez',        email: 'tomas.perez@gmail.com',      phone: '+54 9 11 5512-8890' },
      { fullName: 'Sofía Sánchez',      email: 'sofia.sanchez@icloud.com',   phone: '+54 9 11 4401-7723' },
      { fullName: 'Nicolás Romero',     email: 'nico.romero@gmail.com',      phone: '+54 9 11 6623-4415' },
      { fullName: 'Isabella Torres',    email: 'isabella.torres@gmail.com',  phone: '+54 9 11 7745-1122' },
      { fullName: 'Facundo Flores',     email: 'facu.flores@hotmail.com',    phone: '+54 9 11 5500-3389' },
      { fullName: 'Agustina Díaz',      email: 'agus.diaz@gmail.com',        phone: '+54 9 11 4489-6634' },
      { fullName: 'Ignacio Moreno',     email: 'nacho.moreno@gmail.com',     phone: '+54 9 11 3367-8812' },
      { fullName: 'Martina Álvarez',    email: 'marti.alvarez@outlook.com',  phone: '+54 9 11 6645-2278' },
      { fullName: 'Joaquín Ruiz',       email: 'joaco.ruiz@gmail.com',       phone: '+54 9 11 5523-9001' },
      { fullName: 'Florencia Jiménez',  email: 'flor.jimenez@yahoo.com.ar',  phone: '+54 9 11 4478-5563' },
      { fullName: 'Benjamín Herrera',   email: 'benja.herrera@gmail.com',    phone: '+54 9 11 7712-0044' },
      { fullName: 'Milagros Castro',    email: 'mili.castro@gmail.com',      phone: '+54 9 11 3390-7789' },
      { fullName: 'Lautaro Vargas',     email: 'lauta.vargas@hotmail.com',   phone: '+54 9 11 5567-3312' },
      { fullName: 'Renata Medina',      email: 'renata.medina@gmail.com',    phone: '+54 9 11 4434-8856' },
      { fullName: 'Ezequiel Acosta',    email: 'ezequiel.acosta@gmail.com',  phone: '+54 9 11 6601-2245' },
    ];

    const seeded: SeedClient[] = [];
    const daysList = [340,280,210,180,150,120,95,70,50,30,25,20,15,12,10,8,6,5,3,1];
    for (let i = 0; i < data.length; i++) {
      const d    = data[i];
      const days = daysList[i] ?? 30;
      const ref  = await this.run(() =>
        addDoc(collection(this.firestore, 'clients'), {
          ...d,
          firstOrderDate: new Date(Date.now() - days * 86_400_000),
          lastOrderDate:  new Date(Date.now() - Math.max(1, Math.floor(days / 4)) * 86_400_000),
          numberOfOrders: [12, 9, 7, 6, 5, 5, 4, 4, 3, 3, 3, 2, 2, 2, 2, 1, 1, 1, 1, 1][i] ?? 1,
        })
      );
      seeded.push({ id: ref.id, ...d });
    }
    return seeded;
  }

  // ── orders ────────────────────────────────────────────────────────────────

  private async seedOrders(prods: SeedProduct[], clients: SeedClient[]): Promise<void> {
    type OS = 'pending'|'processing'|'shipped'|'delivered'|'cancelled';

    // 20 fully static, realistic orders
    const orders: Array<{
      clientIdx: number; daysAgo: number; status: OS;
      lines: Array<{ prodIdx: number; qty: number; talle?: string; color: string }>;
      paymentMethod: string; shippingCost: number;
      street: string; city: string; state: string; zip: string;
      notes?: string;
    }> = [
      { clientIdx:0,  daysAgo:2,   status:'delivered', paymentMethod:'MercadoPago',             shippingCost:1200, street:'Av. Corrientes 4531',   city:'Buenos Aires',   state:'Buenos Aires', zip:'1414', lines:[{prodIdx:0,qty:2,talle:'M',color:'Negro'},{prodIdx:5,qty:1,talle:'32',color:'Azul índigo'}] },
      { clientIdx:1,  daysAgo:5,   status:'delivered', paymentMethod:'Tarjeta de crédito',       shippingCost:800,  street:'San Martín 882',         city:'Córdoba',        state:'Córdoba',       zip:'5000', lines:[{prodIdx:10,qty:1,talle:'42',color:'Blanco/Negro'}] },
      { clientIdx:2,  daysAgo:8,   status:'shipped',   paymentMethod:'Transferencia bancaria',   shippingCost:1500, street:'Av. Rivadavia 3200',     city:'Rosario',        state:'Santa Fe',      zip:'2000', lines:[{prodIdx:20,qty:1,color:'Negro'},{prodIdx:23,qty:1,color:'Marrón'}] },
      { clientIdx:3,  daysAgo:3,   status:'delivered', paymentMethod:'MercadoPago',             shippingCost:1200, street:'Belgrano 145',            city:'Mendoza',        state:'Mendoza',       zip:'5500', lines:[{prodIdx:1,qty:1,talle:'L',color:'Blanco'},{prodIdx:15,qty:1,talle:'41',color:'Negro total'}] },
      { clientIdx:4,  daysAgo:1,   status:'processing',paymentMethod:'Débito',                   shippingCost:900,  street:'9 de Julio 2200',        city:'La Plata',       state:'Buenos Aires',  zip:'1900', lines:[{prodIdx:7,qty:1,talle:'34',color:'Negro'}] },
      { clientIdx:5,  daysAgo:14,  status:'delivered', paymentMethod:'MercadoPago',             shippingCost:2200, street:'Mitre 567',               city:'Mar del Plata',  state:'Buenos Aires',  zip:'7600', lines:[{prodIdx:3,qty:2,talle:'S',color:'Gris'},{prodIdx:22,qty:1,color:'Azul navy'}] },
      { clientIdx:6,  daysAgo:20,  status:'delivered', paymentMethod:'Tarjeta de crédito',       shippingCost:1800, street:'Sarmiento 1100',         city:'Tucumán',        state:'Tucumán',       zip:'4000', lines:[{prodIdx:12,qty:1,talle:'40',color:'Gris/Azul'},{prodIdx:21,qty:1,color:'Negro'}] },
      { clientIdx:7,  daysAgo:0,   status:'pending',   paymentMethod:'MercadoPago',             shippingCost:1200, street:'Av. Santa Fe 3888',       city:'Buenos Aires',   state:'Buenos Aires',  zip:'1425', lines:[{prodIdx:24,qty:1,talle:'M',color:'Caqui'}] },
      { clientIdx:8,  daysAgo:35,  status:'delivered', paymentMethod:'Transferencia bancaria',   shippingCost:1500, street:'Colón 456',               city:'Salta',          state:'Salta',         zip:'4400', lines:[{prodIdx:6,qty:1,talle:'30',color:'Beige'},{prodIdx:19,qty:1,color:'Oliva'}] },
      { clientIdx:9,  daysAgo:7,   status:'shipped',   paymentMethod:'MercadoPago',             shippingCost:1200, street:'Florida 855',             city:'Buenos Aires',   state:'Buenos Aires',  zip:'1005', lines:[{prodIdx:4,qty:1,talle:'XL',color:'Rojo'},{prodIdx:16,qty:1,talle:'43',color:'Rojo/Blanco'}] },
      { clientIdx:10, daysAgo:50,  status:'delivered', paymentMethod:'Débito',                   shippingCost:900,  street:'Hipólito Yrigoyen 2054', city:'Buenos Aires',   state:'Buenos Aires',  zip:'1089', lines:[{prodIdx:9,qty:1,talle:'32',color:'Verde militar'},{prodIdx:2,qty:1,talle:'M',color:'Azul'}] },
      { clientIdx:11, daysAgo:4,   status:'processing',paymentMethod:'Tarjeta de crédito',       shippingCost:1500, street:'Maipú 750',               city:'Córdoba',        state:'Córdoba',       zip:'5000', lines:[{prodIdx:11,qty:2,talle:'39',color:'Blanco/Negro'}] },
      { clientIdx:12, daysAgo:90,  status:'delivered', paymentMethod:'MercadoPago',             shippingCost:2000, street:'Av. Colón 1400',          city:'Mendoza',        state:'Mendoza',       zip:'5500', lines:[{prodIdx:20,qty:1,color:'Negro'},{prodIdx:23,qty:1,color:'Beige'}] },
      { clientIdx:13, daysAgo:6,   status:'cancelled', paymentMethod:'MercadoPago',             shippingCost:1200, street:'San Lorenzo 900',         city:'Rosario',        state:'Santa Fe',      zip:'2000', lines:[{prodIdx:14,qty:1,talle:'XXL',color:'Negro'}] },
      { clientIdx:14, daysAgo:12,  status:'shipped',   paymentMethod:'Transferencia bancaria',   shippingCost:1500, street:'Rivadavia 500',           city:'La Plata',       state:'Buenos Aires',  zip:'1900', lines:[{prodIdx:5,qty:1,talle:'36',color:'Negro'},{prodIdx:8,qty:1,talle:'32',color:'Gris'}] },
      { clientIdx:15, daysAgo:25,  status:'delivered', paymentMethod:'MercadoPago',             shippingCost:1200, street:'Pellegrini 1200',         city:'Buenos Aires',   state:'Buenos Aires',  zip:'1074', lines:[{prodIdx:17,qty:1,talle:'44',color:'Negro total'},{prodIdx:21,qty:2,color:'Marrón'}] },
      { clientIdx:16, daysAgo:60,  status:'delivered', paymentMethod:'Débito',                   shippingCost:800,  street:'Laprida 400',             city:'Mar del Plata',  state:'Buenos Aires',  zip:'7600', lines:[{prodIdx:24,qty:1,talle:'S',color:'Navy'}] },
      { clientIdx:17, daysAgo:3,   status:'processing',paymentMethod:'Tarjeta de crédito',       shippingCost:1500, street:'Tucumán 1500',            city:'Buenos Aires',   state:'Buenos Aires',  zip:'1049', lines:[{prodIdx:0,qty:1,talle:'XS',color:'Blanco'},{prodIdx:22,qty:1,color:'Azul navy'},{prodIdx:10,qty:1,talle:'38',color:'Gris/Azul'}] },
      { clientIdx:18, daysAgo:45,  status:'delivered', paymentMethod:'MercadoPago',             shippingCost:1800, street:'Paraguay 2600',           city:'Buenos Aires',   state:'Buenos Aires',  zip:'1121', lines:[{prodIdx:13,qty:1,talle:'XL',color:'Caqui'}] },
      { clientIdx:19, daysAgo:9,   status:'shipped',   paymentMethod:'MercadoPago',             shippingCost:2200, street:'Av. Cabildo 3100',        city:'Buenos Aires',   state:'Buenos Aires',  zip:'1429', lines:[{prodIdx:18,qty:1,talle:'38',color:'Beige/Crema'},{prodIdx:3,qty:2,talle:'M',color:'Blanco'}] },
    ];

    for (let i = 0; i < orders.length; i++) {
      const o = orders[i];
      const cl = clients[o.clientIdx] ?? clients[0];
      const orderDate = new Date(Date.now() - o.daysAgo * 86_400_000);

      let subtotal = 0;
      const items = o.lines.map(line => {
        const p = prods[line.prodIdx] ?? prods[0];
        subtotal += p.finalPrice * line.qty;
        const attrs: Record<string,string> = { color: line.color };
        if (line.talle) attrs['talle'] = line.talle;
        return {
          productId: p.id, variantId: `var-${p.id}`, productName: p.name,
          quantity: line.qty, price: p.finalPrice, productImage: p.image, attributes: attrs,
        };
      });

      await this.run(() =>
        addDoc(collection(this.firestore, 'orders'), {
          userId: `user-${cl.id}`, clientName: cl.fullName,
          clientEmail: cl.email, clientPhone: cl.phone,
          orderDate, total: subtotal + o.shippingCost,
          status: o.status, items,
          shippingAddress: { street: o.street, city: o.city, state: o.state, zipCode: o.zip, country: 'Argentina' },
          paymentDetails: { paymentMethod: o.paymentMethod, shippingCost: o.shippingCost, taxAmount: Math.round(subtotal * 0.21), subtotal },
          stockDecremented: o.status !== 'cancelled',
          notes: i % 5 === 0 ? 'Cliente solicitó embalaje de regalo.' : null,
        })
      );
    }
  }

  // ── hero banner ───────────────────────────────────────────────────────────

  private async seedHeroBanner(cats: Record<string, { id: string; name: string }>): Promise<void> {
    await this.run(() =>
      setDoc(doc(this.firestore, 'siteContent', 'homePage'), {
        heroImages: HERO.map(id => u(id, 1920, 700)),
        carouselSettings: { interval: 4500, showIndicators: true },
        title: 'Nueva Colección 2026',
        buttonText: 'Explorar todo',
        buttonLink: '/shop/catalog',
        featuredCategories: [
          { categoryId: cats['remeras']?.id    ?? '', name: 'Remeras',    slug: 'remeras',    imageUrl: u(FEAT.remeras,    600, 400) },
          { categoryId: cats['camperas']?.id   ?? '', name: 'Camperas',   slug: 'camperas',   imageUrl: u(FEAT.camperas,   600, 400) },
          { categoryId: cats['zapatillas']?.id ?? '', name: 'Zapatillas', slug: 'zapatillas', imageUrl: u(FEAT.zapatillas, 600, 400) },
        ],
        lastUpdated: new Date(),
      })
    );
  }

  // ── about us ──────────────────────────────────────────────────────────────

  private async seedAboutUs(): Promise<void> {
    await this.run(() =>
      setDoc(doc(this.firestore, 'pages', 'aboutUs'), {
        bannerTitle:     'Quiénes Somos',
        bannerSubtitle:  'Moda argentina con identidad propia desde 2015.',
        bannerImageUrl:  u('1558769132-cb1aea458c5e', 1920, 600),
        centralTitle:    'Nuestra Historia',
        centralImageUrl: u('1483985988355-763728e1935b', 800, 600),
        centralDescription:
          'Vertex nació en 2015 en el barrio de Palermo (Buenos Aires) con un objetivo claro: ' +
          'democratizar la moda de calidad. Trabajamos exclusivamente con proveedores certificados, ' +
          'materiales de primera línea y diseños propios que reflejan la identidad urbana argentina.\n\n' +
          'Hoy somos un equipo de 30 personas, despachamos a todo el país y contamos con más de 50.000 ' +
          'clientes activos que nos eligen por la calidad, el servicio y los precios justos.',
        cardsSectionTitle: '¿Por qué elegirnos?',
        featureCards: [
          { title: 'Calidad sin compromiso',  content: 'Cada prenda pasa por tres etapas de control de calidad antes de llegar a tus manos. Solo trabajamos con materiales de primera línea y proveedores certificados.' },
          { title: 'Envíos en 24-72 hs',      content: 'Despachamos a cualquier punto de Argentina en 24 a 72 horas hábiles con seguimiento en tiempo real. Envío sin costo en compras superiores a $30.000.' },
          { title: 'Cambios sin burocracia',  content: 'Si el talle no es el correcto o algo no te convenció, gestionamos el cambio o devolución en menos de 48 horas sin preguntas ni costos adicionales.' },
          { title: 'Producción responsable',  content: 'Embalajes 100% reciclables, tintas a base de agua y apoyo activo a marcas locales y talleres de producción justa.' },
        ],
      })
    );
  }

  // ── footer ────────────────────────────────────────────────────────────────

  private async seedFooter(): Promise<void> {
    await this.run(() =>
      setDoc(doc(this.firestore, 'configuracion', 'footer'), {
        contactPhone:       '+54 11 4567-8900',
        contactEmail:       'hola@vertex.com.ar',
        socialInstagramUrl: 'https://instagram.com/vertex.moda',
        socialFacebookUrl:  'https://facebook.com/vertexropa',
        socialWhatsAppUrl:  'https://wa.me/5491145678900',
        copyrightText:      '© 2026 Vertex. Todos los derechos reservados.',
      })
    );
  }
}
