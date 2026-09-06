import type { HeaderFontPreset } from '@core/models/store-config.model';

export interface FontPresetItem {
  id: HeaderFontPreset;
  name: string;
  category: string;
  fontFamily: string;
}

export const FONT_PRESETS: FontPresetItem[] = [
  {
    id: 'system',
    name: 'Predeterminada',
    category: 'Sistema',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  {
    id: 'inter',
    name: 'Inter',
    category: 'Moderna',
    fontFamily: "'Inter', sans-serif",
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    category: 'Versátil',
    fontFamily: "'Montserrat', sans-serif",
  },
  {
    id: 'poppins',
    name: 'Poppins',
    category: 'Redondeada',
    fontFamily: "'Poppins', sans-serif",
  },
  {
    id: 'raleway',
    name: 'Raleway',
    category: 'Sofisticada',
    fontFamily: "'Raleway', sans-serif",
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    category: 'Editorial',
    fontFamily: "'Playfair Display', Georgia, serif",
  },
  {
    id: 'dancing-script',
    name: 'Dancing Script',
    category: 'Cursiva',
    fontFamily: "'Dancing Script', cursive",
  },
  {
    id: 'bebas-neue',
    name: 'Bebas Neue',
    category: 'Urbana',
    fontFamily: "'Bebas Neue', sans-serif",
  },
  {
    id: 'cormorant',
    name: 'Cormorant Garamond',
    category: 'Elegante',
    fontFamily: "'Cormorant Garamond', serif",
  },
  {
    id: 'cinzel',
    name: 'Cinzel',
    category: 'Clásica',
    fontFamily: "'Cinzel', serif",
  },
  {
    id: 'tenor-sans',
    name: 'Tenor Sans',
    category: 'Minimalista',
    fontFamily: "'Tenor Sans', sans-serif",
  },
  {
    id: 'quicksand',
    name: 'Quicksand',
    category: 'Amigable',
    fontFamily: "'Quicksand', sans-serif",
  },
  {
    id: 'comfortaa',
    name: 'Comfortaa',
    category: 'Lúdica',
    fontFamily: "'Comfortaa', cursive",
  },
  {
    id: 'space-grotesk',
    name: 'Space Grotesk',
    category: 'Tech',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  {
    id: 'oswald',
    name: 'Oswald',
    category: 'Condensada',
    fontFamily: "'Oswald', sans-serif",
  },
];
