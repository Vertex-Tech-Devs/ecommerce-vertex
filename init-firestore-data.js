// Copiar y ejecutar esto en la consola del navegador (F12 > Console)
// Primero asegúrate que tengas Firebase inicializado en la app

// Datos de prueba para el hero banner
const testHeroData = {
  heroImages: [
    'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&h=400&fit=crop',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&h=400&fit=crop'
  ],
  carouselSettings: {
    interval: 4000,
    showIndicators: true
  },
  title: 'Bienvenido a Vertex',
  buttonText: 'Comprar Ahora',
  buttonLink: '/shop/catalog',
  featuredCategories: [
    {
      categoryId: 'electronics',
      name: 'Electrónica',
      slug: 'electronics',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop'
    },
    {
      categoryId: 'accessories',
      name: 'Accesorios',
      slug: 'accessories',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
    }
  ],
  lastUpdated: new Date()
};

// Usar la función getAuth y getFirestore de Firebase
import('https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js').then(() => {
  import('https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js').then(() => {
    const { getFirestore, doc, setDoc } = window.firebase.firestore;
    const db = getFirestore();
    
    const docRef = doc(db, 'siteContent', 'homePage');
    
    setDoc(docRef, testHeroData, { merge: true })
      .then(() => {
        console.log('✅ Datos del hero banner guardados exitosamente');
        location.reload();
      })
      .catch((error) => {
        console.error('❌ Error al guardar datos:', error);
      });
  });
});
