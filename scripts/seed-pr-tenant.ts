import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { PRODUCT_CATALOGUE } from '../src/app/core/constants/seed-products.constants';

function u(id: string, w: number, h: number): string {
  return `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80&auto=format`;
}

async function main(): Promise<void> {
  const prNumber = process.env['PR_NUMBER'];
  const saJson = process.env['FIREBASE_SERVICE_ACCOUNT_DEV'];

  if (!prNumber) {
    console.log('No PR_NUMBER specified. Skipping seeding.');
    return;
  }

  if (!saJson) {
    console.log('No FIREBASE_SERVICE_ACCOUNT_DEV provided. Skipping seeding.');
    return;
  }

  const tenantId = `vtx-pr-${prNumber}`;
  const storeName = `Tienda Preview PR #${prNumber}`;

  console.log(`Pre-seeding Firestore data for PR #${prNumber} (tenantId: ${tenantId}, storeName: "${storeName}")...`);

  const credentials = JSON.parse(saJson);
  if (!getApps().length) {
    initializeApp({
      credential: cert(credentials),
    });
  }

  const db = getFirestore();

  // 1. Seed Attributes
  const attributesList = [
    { name: 'Talle (ropa)', values: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
    { name: 'Talle (calzado)', values: ['36', '37', '38', '39', '40', '41', '42', '43', '44'] },
    { name: 'Talle (pantalón)', values: ['28', '30', '32', '34', '36', '38'] },
    {
      name: 'Color',
      values: ['Negro', 'Blanco', 'Gris', 'Azul', 'Rojo', 'Verde', 'Beige', 'Marrón', 'Rosa', 'Caqui'],
    },
    { name: 'Material', values: ['Algodón', 'Poliéster', 'Lino', 'Cuero', 'Denim', 'Lana'] },
  ];

  for (const attr of attributesList) {
    await db.collection('attributes').add({
      ...attr,
      storeId: tenantId,
    });
  }

  // 2. Seed Categories
  const categoryDefs = [
    { slug: 'remeras', name: 'Remeras', attrs: ['talle', 'color'], img: '1521572163474-6864f9cf17ab' },
    { slug: 'pantalones', name: 'Pantalones', attrs: ['talle', 'color'], img: '1542272604-787c3835535d' },
    { slug: 'zapatillas', name: 'Zapatillas', attrs: ['talle', 'color'], img: '1542291026-7eec264c27ff' },
    { slug: 'accesorios', name: 'Accesorios', attrs: ['color'], img: '1511499767150-a48a237f0083' },
    { slug: 'camperas', name: 'Camperas', attrs: ['talle', 'color'], img: '1551028719-00167b16eac5' },
  ];

  const catMap: Record<string, { id: string; name: string }> = {};
  for (const catDef of categoryDefs) {
    const ref = await db.collection('categories').add({
      name: catDef.name,
      slug: catDef.slug,
      parentId: null,
      filterableAttributes: catDef.attrs,
      imageUrl: u(catDef.img, 400, 400),
      storeId: tenantId,
      createdAt: new Date(),
    });
    catMap[catDef.slug] = { id: ref.id, name: catDef.name };
  }

  // 3. Seed Products
  for (const catGroup of PRODUCT_CATALOGUE) {
    const catInfo = catMap[catGroup.slug];
    if (!catInfo) continue;

    for (const item of catGroup.items) {
      await db.collection('products').add({
        name: item.name,
        description: item.desc,
        price: item.price,
        compareAtPrice: item.discount > 0 ? Math.round(item.price / (1 - item.discount / 100)) : null,
        discountPercentage: item.discount,
        images: item.imgs.map((id) => u(id, 800, 800)),
        imageUrl: u(item.imgs[0] || '1521572163474-6864f9cf17ab', 800, 800),
        categoryId: catInfo.id,
        categoryName: catInfo.name,
        stock: 25,
        isActive: true,
        featured: item.featured,
        variants: [
          { sku: `SKU-${catGroup.slug}-S-NEGRO`, attributes: { talle: 'S', color: 'Negro' }, price: item.price, stock: 10 },
          { sku: `SKU-${catGroup.slug}-M-NEGRO`, attributes: { talle: 'M', color: 'Negro' }, price: item.price, stock: 15 },
        ],
        storeId: tenantId,
        createdAt: new Date(),
      });
    }
  }

  // 4. Seed Banners & Pages
  const heroPhotos = [
    '1558769132-cb1aea458c5e',
    '1483985988355-763728e1935b',
    '1469334031218-e382a71b716b',
    '1445205170230-053b83016050',
  ];

  await db.collection('banners').doc(`home_${tenantId}`).set({
    storeId: tenantId,
    heroImages: heroPhotos.map((id) => ({ imageUrl: u(id, 1920, 700) })),
    carouselSettings: { interval: 4500, showIndicators: true },
    title: `Bienvenido a ${storeName}`,
    buttonText: 'Explorar todo',
    buttonLink: '/shop/catalog',
    featuredCategories: [
      { categoryId: catMap['remeras']?.id ?? '', name: 'Remeras', slug: 'remeras', imageUrl: u('1523381240423-59b6e0c53abe', 600, 400) },
      { categoryId: catMap['camperas']?.id ?? '', name: 'Camperas', slug: 'camperas', imageUrl: u('1551537482-f2075a1d41f2', 600, 400) },
      { categoryId: catMap['zapatillas']?.id ?? '', name: 'Zapatillas', slug: 'zapatillas', imageUrl: u('1491553895911-0055eca6402d', 600, 400) },
    ],
    lastUpdated: new Date(),
  });

  await db.collection('pages').doc(`aboutUs_${tenantId}`).set({
    storeId: tenantId,
    bannerTitle: 'Quiénes Somos',
    bannerSubtitle: 'Moda argentina con identidad propia y alcance nacional.',
    bannerImageUrl: u('1558769132-cb1aea458c5e', 1920, 600),
    centralTitle: 'Nuestra Historia',
    centralImageUrl: u('1483985988355-763728e1935b', 800, 600),
    centralDescription: `${storeName} es un entorno de prueba efímero generado dinámicamente en el CI/CD de Vertex Solutions.`,
    cardsSectionTitle: '¿Por qué elegirnos?',
    featureCards: [
      { title: 'Calidad sin compromiso', content: 'Prendas confeccionadas con materiales de primera línea.' },
      { title: 'Envíos en 24-72 hs', content: 'Despachamos a todo el país.' },
    ],
  });

  // 5. Seed Store Config
  await db.collection('configuracion').doc(`store_${tenantId}`).set({
    tenantId,
    storeId: tenantId,
    storeName,
    tagline: 'Instancia de prueba para Pull Request',
    colors: {
      primary: '#ea580c',
      accent: '#ef4444',
      background: '#ffffff',
    },
    payments: {
      mercadoPagoPublicKey: 'TEST-PUBLIC-KEY-PREVIEW',
    },
    contact: {
      phone: '+54 11 4567-8900',
      email: `pr-${prNumber}@vertex-dev.com`,
      whatsApp: 'https://wa.me/5491145678900',
      instagram: 'https://instagram.com/vertex',
      facebook: 'https://facebook.com/vertex',
    },
    seo: {
      metaDescription: `Instancia de prueba efímera para PR #${prNumber} de Vertex Solutions.`,
    },
    setupCompleted: true,
    contactPhone: '+54 11 4567-8900',
    contactEmail: `pr-${prNumber}@vertex-dev.com`,
    socialInstagramUrl: 'https://instagram.com/vertex',
    socialFacebookUrl: 'https://facebook.com/vertex',
    socialWhatsAppUrl: 'https://wa.me/5491145678900',
    copyrightText: `© 2026 ${storeName}. Todos los derechos reservados.`,
    updatedAt: new Date().toISOString(),
  });

  console.log(`Successfully pre-seeded Firestore for tenant ${tenantId} (${storeName}).`);
}

main().catch((err) => {
  console.error('Error pre-seeding PR tenant data:', err);
  process.exit(1);
});
