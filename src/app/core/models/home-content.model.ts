export interface FeaturedCategory {
  categoryId: string;
  name: string;
  slug: string;
  imageUrl: string;
}

export interface CarouselSettings {
  interval: number; // Intervalo en milisegundos (default: 4000)
  showIndicators: boolean; // Mostrar puntos de navegación (default: true)
}

export interface HeroBanner {
  id?: string;
  imageUrl?: string; // Mantener para compatibilidad con datos legacy
  heroImages?: string[]; // Array de URLs de imágenes para el carrusel
  carouselSettings?: CarouselSettings; // Configuración del carrusel
  title?: string;
  buttonText?: string;
  buttonLink?: string;
  featuredCategories?: FeaturedCategory[];
  lastUpdated?: Date;
}
