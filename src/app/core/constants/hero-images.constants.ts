/**
 * URLs de imágenes de ejemplo públicas de alta calidad para el carrusel hero
 * Estas imágenes están en proporción 16:9 y son de buena resolución
 * 
 * Alternativa: Usar imágenes locales optimizadas
 */

export const HERO_IMAGES_EXAMPLES = {
  urls: [
    'https://images.unsplash.com/photo-1557821552-17105176677c?w=1600&h=900&fit=crop',
    'https://images.unsplash.com/photo-1460925895917-adf4e5d6f1d7?w=1600&h=900&fit=crop',
    'https://images.unsplash.com/photo-1555731463-760f3dcc4719?w=1600&h=900&fit=crop',
    'https://images.unsplash.com/photo-1516062423479-7ce3d694ab8b?w=1600&h=900&fit=crop',
  ],
  descriptions: [
    'Colecciones Nuevas',
    'Productos Premium',
    'Ofertas Exclusivas',
    'Envío Gratis Disponible',
  ],
  recommendations: {
    idealResolution: '1600x900px (16:9)',
    minResolution: '1200x675px (16:9)',
    maxFileSize: '2MB',
    formats: 'WebP, JPG, PNG',
    tips: [
      '✓ Usa imágenes en formato WebP para mejor compresión',
      '✓ Respeta la proporción 16:9 para que se vea bien en todos los dispositivos',
      '✓ Asegúrate de que el archivo no supere 2MB',
      '✓ Usa herramientas como TinyPNG, ImageOptim o Squoosh para comprimir',
      '✓ Las imágenes muy pixeladas o borrosas afectarán la experiencia del usuario',
    ],
  },
};

/**
 * Guía para optimizar imágenes:
 * 1. Abre la imagen en un editor (Photoshop, GIMP, etc.)
 * 2. Redimensiona a 1600x900px (proporción 16:9)
 * 3. Exporta como WebP o JPG de alta calidad
 * 4. Comprime con TinyPNG o similar
 * 5. Verifica que sea menor a 2MB
 * 6. Sube en el admin del sitio
 */
