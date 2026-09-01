import type {
  HeaderAppearanceConfig,
  HeaderFontPreset,
  HeaderShadowPreset,
} from '@core/models/store-config.model';
import { DEFAULT_HEADER_APPEARANCE } from '@core/models/store-config.model';

export const HEADER_SHADOW_MAP: Record<HeaderShadowPreset, string> = {
  none: 'none',
  'border-bottom': 'none',
  subtle: '0 1px 3px rgba(0, 0, 0, 0.07)',
  medium: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
  floating: '0 10px 15px -3px rgba(0, 0, 0, 0.08)',
};

export const HEADER_FONT_STACK_MAP: Record<HeaderFontPreset, string> = {
  system:
    'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
  inter: "'Inter', sans-serif",
  montserrat: "'Montserrat', sans-serif",
  poppins: "'Poppins', sans-serif",
  playfair: "'Playfair Display', Georgia, serif",
  raleway: "'Raleway', sans-serif",
};

export const GOOGLE_FONT_URLS: Partial<Record<HeaderFontPreset, string>> = {
  inter: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
  montserrat:
    'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
  poppins: 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap',
  playfair:
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap',
  raleway: 'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600;700&display=swap',
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
  const shadowPreset: HeaderShadowPreset =
    appearance?.shadowStyle ?? DEFAULT_HEADER_APPEARANCE.shadowStyle;
  const fontPreset: HeaderFontPreset =
    appearance?.fontFamily ?? DEFAULT_HEADER_APPEARANCE.fontFamily;

  const shadowValue = HEADER_SHADOW_MAP[shadowPreset] ?? HEADER_SHADOW_MAP.subtle;
  const borderBottomValue =
    shadowPreset === 'border-bottom' ? '1px solid rgba(0, 0, 0, 0.1)' : 'transparent';
  const fontValue = HEADER_FONT_STACK_MAP[fontPreset] ?? HEADER_FONT_STACK_MAP.system;

  return {
    '--header-bg': bg,
    '--header-text': text,
    '--header-accent': accent,
    '--header-shadow': shadowValue,
    '--header-border-bottom': borderBottomValue,
    '--header-font-family': fontValue,
  };
}
