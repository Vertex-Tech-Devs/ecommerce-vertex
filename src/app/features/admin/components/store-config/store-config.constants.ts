import type { HeaderFontPreset, HeaderShadowPreset } from '@core/models/store-config.model';

export interface ShadowPresetItem {
  id: HeaderShadowPreset;
  label: string;
  description: string;
  icon: string;
}

export interface FontPresetItem {
  id: HeaderFontPreset;
  name: string;
  category: string;
  fontFamily: string;
}

export const SHADOW_PRESETS: ShadowPresetItem[] = [
  {
    id: 'none',
    label: 'Sin sombra',
    description: 'Diseño plano y minimalista',
    icon: 'bi-square',
  },
  {
    id: 'border-bottom',
    label: 'Línea inferior',
    description: 'Delimitador sutil de 1px',
    icon: 'bi-dash-lg',
  },
  {
    id: 'subtle',
    label: 'Sombra sutil',
    description: 'Profundidad ligera y moderna',
    icon: 'bi-layers',
  },
  {
    id: 'medium',
    label: 'Sombra media',
    description: 'Mayor contraste y separación',
    icon: 'bi-shadows',
  },
  {
    id: 'floating',
    label: 'Flotante',
    description: 'Elevación pronunciada',
    icon: 'bi-box-arrow-up',
  },
];

export const FONT_PRESETS: FontPresetItem[] = [
  {
    id: 'system',
    name: 'Sistema',
    category: 'Nativo',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  {
    id: 'inter',
    name: 'Inter',
    category: 'Modern & Clean (Sans-serif)',
    fontFamily: "'Inter', sans-serif",
  },
  {
    id: 'montserrat',
    name: 'Montserrat',
    category: 'Bold & Geometric (Sans-serif)',
    fontFamily: "'Montserrat', sans-serif",
  },
  {
    id: 'poppins',
    name: 'Poppins',
    category: 'Friendly & Rounded (Sans-serif)',
    fontFamily: "'Poppins', sans-serif",
  },
  {
    id: 'playfair',
    name: 'Playfair Display',
    category: 'Classic & Luxury (Serif)',
    fontFamily: "'Playfair Display', Georgia, serif",
  },
  {
    id: 'raleway',
    name: 'Raleway',
    category: 'Elegant & Sophisticated (Sans-serif)',
    fontFamily: "'Raleway', sans-serif",
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
