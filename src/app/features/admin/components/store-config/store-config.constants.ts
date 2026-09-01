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
    name: 'Sistema',
    category: 'Nativo del dispositivo',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  {
    id: 'inter',
    name: 'Inter',
    category: 'Moderno & Limpio (Sans-serif)',
    fontFamily: "'Inter', sans-serif",
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    category: 'Geométrico & Versátil (Sans-serif)',
    fontFamily: "'Montserrat', sans-serif",
  },
  {
    id: 'poppins',
    name: 'Poppins',
    category: 'Amigable & Redondeado (Sans-serif)',
    fontFamily: "'Poppins', sans-serif",
  },
  {
    id: 'raleway',
    name: 'Raleway',
    category: 'Elegante & Sofisticado (Sans-serif)',
    fontFamily: "'Raleway', sans-serif",
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    category: 'Editorial & Clásico (Serif)',
    fontFamily: "'Playfair Display', Georgia, serif",
  },
  {
    id: 'dancing-script',
    name: 'Dancing Script',
    category: 'Cursiva Elegante (Joyería, Perfumería)',
    fontFamily: "'Dancing Script', cursive",
  },
  {
    id: 'bebas-neue',
    name: 'Bebas Neue',
    category: 'Urbano & Disruptivo (Streetwear, Motos)',
    fontFamily: "'Bebas Neue', sans-serif",
  },
  {
    id: 'cormorant',
    name: 'Cormorant Garamond',
    category: 'Femenino & Boutique (Alta Costura)',
    fontFamily: "'Cormorant Garamond', serif",
  },
  {
    id: 'cinzel',
    name: 'Cinzel',
    category: 'Lujo & Distinción (Relojería, Vinos Premium)',
    fontFamily: "'Cinzel', serif",
  },
  {
    id: 'tenor-sans',
    name: 'Tenor Sans',
    category: 'Minimalista & Moda (Indumentaria)',
    fontFamily: "'Tenor Sans', sans-serif",
  },
  {
    id: 'quicksand',
    name: 'Quicksand',
    category: 'Cálido & Pet Shop (Mascotas, Niños)',
    fontFamily: "'Quicksand', sans-serif",
  },
  {
    id: 'comfortaa',
    name: 'Comfortaa',
    category: 'Lúdico & Naturaleza (Orgánico, Pastelería)',
    fontFamily: "'Comfortaa', cursive",
  },
  {
    id: 'space-grotesk',
    name: 'Space Grotesk',
    category: 'Tech & Innovación (Gadgets, Celulares)',
    fontFamily: "'Space Grotesk', sans-serif",
  },
  {
    id: 'oswald',
    name: 'Oswald',
    category: 'Fuerza & Fitness (Gimnasios, Ferretería)',
    fontFamily: "'Oswald', sans-serif",
  },
];

export function formatSchedule(
  days: string[],
  from1: string,
  to1: string,
  hasSplit: boolean,
  from2: string,
  to2: string,
): string {
  const daysStr = days.length > 0 ? days.join(', ') : 'Lun a Vie';
  if (hasSplit && from2 && to2) {
    return `${daysStr}: ${from1} a ${to1} y ${from2} a ${to2} hs`;
  }
  return `${daysStr}: ${from1} a ${to1} hs`;
}
