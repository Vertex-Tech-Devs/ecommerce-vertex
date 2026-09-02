import {
  loadGoogleFont,
  computeHeaderCustomProperties,
  HEADER_FONT_STACK_MAP,
} from './font-loader';
import { DEFAULT_HEADER_APPEARANCE, type HeaderFontPreset } from '@core/models/store-config.model';

describe('font-loader', () => {
  beforeEach(() => {
    document.querySelectorAll('link[id^="google-font-"]').forEach((el) => el.remove());
  });

  afterEach(() => {
    document.querySelectorAll('link[id^="google-font-"]').forEach((el) => el.remove());
  });

  describe('loadGoogleFont', () => {
    it('does nothing when font is undefined, empty, or system', () => {
      loadGoogleFont(undefined);
      loadGoogleFont('');
      loadGoogleFont('system');
      expect(document.getElementById('google-font-system')).toBeNull();
      expect(document.getElementById('google-font-')).toBeNull();
    });

    it('does nothing when font is not a known preset with URL', () => {
      loadGoogleFont('unknown-font-id' as unknown as HeaderFontPreset);
      expect(document.getElementById('google-font-unknown-font-id')).toBeNull();
    });

    it('creates and appends a link element for a valid font preset', () => {
      loadGoogleFont('inter');
      const link = document.getElementById('google-font-inter') as HTMLLinkElement | null;
      expect(link).not.toBeNull();
      expect(link?.rel).toBe('stylesheet');
      expect(link?.href).toContain('fonts.googleapis.com');

      // Calling again should not duplicate
      loadGoogleFont('inter');
      expect(document.querySelectorAll('#google-font-inter').length).toBe(1);
    });
  });

  describe('computeHeaderCustomProperties', () => {
    it('uses default appearance when appearance is null or undefined', () => {
      const resultNull = computeHeaderCustomProperties(null);
      expect(resultNull['--header-bg']).toBe(DEFAULT_HEADER_APPEARANCE.backgroundColor);
      expect(resultNull['--header-text']).toBe(DEFAULT_HEADER_APPEARANCE.textColor);
      expect(resultNull['--header-accent']).toBe(DEFAULT_HEADER_APPEARANCE.accentColor);
      expect(resultNull['--header-font-family']).toBe(HEADER_FONT_STACK_MAP.system);

      const resultUndef = computeHeaderCustomProperties(undefined);
      expect(resultUndef['--header-bg']).toBe(DEFAULT_HEADER_APPEARANCE.backgroundColor);
    });

    it('applies custom properties when provided', () => {
      const custom = computeHeaderCustomProperties({
        backgroundColor: '#123456',
        textColor: '#abcdef',
        accentColor: '#ff0000',
        fontFamily: 'montserrat',
      });

      expect(custom['--header-bg']).toBe('#123456');
      expect(custom['--header-text']).toBe('#abcdef');
      expect(custom['--header-accent']).toBe('#ff0000');
      expect(custom['--header-font-family']).toBe(HEADER_FONT_STACK_MAP.montserrat);
    });

    it('falls back to system font when unknown font preset is provided', () => {
      const custom = computeHeaderCustomProperties({
        fontFamily: 'nonexistent' as unknown as HeaderFontPreset,
      });
      expect(custom['--header-font-family']).toBe(HEADER_FONT_STACK_MAP.system);
    });
  });
});
