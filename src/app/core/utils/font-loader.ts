import type { HeaderAppearanceConfig, HeaderFontPreset } from '@core/models/store-config.model';
import { DEFAULT_HEADER_APPEARANCE } from '@core/models/store-config.model';

export const HEADER_FONT_STACK_MAP: Record<HeaderFontPreset, string> = {
  system:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  inter: "'Inter', sans-serif",
  montserrat: "'Montserrat', sans-serif",
  poppins: "'Poppins', sans-serif",
  raleway: "'Raleway', sans-serif",
  playfair: "'Playfair Display', Georgia, serif",
  'dancing-script': "'Dancing Script', cursive",
  'bebas-neue': "'Bebas Neue', sans-serif",
  cormorant: "'Cormorant Garamond', serif",
  cinzel: "'Cinzel', serif",
  'tenor-sans': "'Tenor Sans', sans-serif",
  quicksand: "'Quicksand', sans-serif",
  comfortaa: "'Comfortaa', cursive",
  'space-grotesk': "'Space Grotesk', sans-serif",
  oswald: "'Oswald', sans-serif",
};

export const GOOGLE_FONT_URLS: Partial<Record<HeaderFontPreset, string>> = {
  inter: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  montserrat:
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
  poppins: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
  raleway: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap',
  playfair:
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap',
  'dancing-script':
    'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500;700&display=swap',
  'bebas-neue': 'https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap',
  cormorant:
    'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;700&display=swap',
  cinzel: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&display=swap',
  'tenor-sans': 'https://fonts.googleapis.com/css2?family=Tenor+Sans&display=swap',
  quicksand: 'https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&display=swap',
  comfortaa: 'https://fonts.googleapis.com/css2?family=Comfortaa:wght@500;700&display=swap',
  'space-grotesk':
    'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&display=swap',
  oswald: 'https://fonts.googleapis.com/css2?family=Oswald:wght@500;700&display=swap',
};

export function loadGoogleFont(font?: HeaderFontPreset | string): void {
  if (!font || font === 'system') {
    return;
  }
  const url = GOOGLE_FONT_URLS[font as HeaderFontPreset];
  if (!url) {
    return;
  }
  if (typeof document === 'undefined') {
    return;
  }

  const linkId = `google-font-${font}`;
  if (!document.getElementById(linkId)) {
    const link = document.createElement('link');
    link.id = linkId;
    link.rel = 'stylesheet';
    link.href = url;
    document.head.appendChild(link);
  }
}

export function computeHeaderCustomProperties(
  appearance?: Partial<HeaderAppearanceConfig> | null,
): Record<string, string> {
  const bg = appearance?.backgroundColor ?? DEFAULT_HEADER_APPEARANCE.backgroundColor;
  const text = appearance?.textColor ?? DEFAULT_HEADER_APPEARANCE.textColor;
  const accent = appearance?.accentColor ?? DEFAULT_HEADER_APPEARANCE.accentColor;
  const fontPreset: HeaderFontPreset =
    appearance?.fontFamily ?? DEFAULT_HEADER_APPEARANCE.fontFamily;

  const fontValue = HEADER_FONT_STACK_MAP[fontPreset] ?? HEADER_FONT_STACK_MAP.system;

  return {
    '--header-bg': bg,
    '--header-text': text,
    '--header-accent': accent,
    '--header-font-family': fontValue,
  };
}
