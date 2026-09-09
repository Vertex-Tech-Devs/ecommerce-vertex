import { normalizeInstagramUrl, normalizeFacebookUrl, normalizeWhatsAppUrl } from './url.utils';

describe('url.utils', () => {
  describe('normalizeInstagramUrl', () => {
    it('should return empty string for null, undefined, empty string, or non-string', () => {
      expect(normalizeInstagramUrl(null)).toBe('');
      expect(normalizeInstagramUrl(undefined)).toBe('');
      expect(normalizeInstagramUrl('')).toBe('');
      expect(normalizeInstagramUrl('   ')).toBe('');
      expect(normalizeInstagramUrl(123 as unknown as string)).toBe('');
    });

    it('should normalize @username to https://instagram.com/username', () => {
      expect(normalizeInstagramUrl('@tienda_oficial')).toBe('https://instagram.com/tienda_oficial');
      expect(normalizeInstagramUrl('@')).toBe('');
    });

    it('should normalize username without scheme to https://instagram.com/username', () => {
      expect(normalizeInstagramUrl('tienda_oficial')).toBe('https://instagram.com/tienda_oficial');
      expect(normalizeInstagramUrl('/tienda_oficial')).toBe('https://instagram.com/tienda_oficial');
      expect(normalizeInstagramUrl('///')).toBe('');
    });

    it('should normalize instagram.com/user to https://instagram.com/user', () => {
      expect(normalizeInstagramUrl('instagram.com/tienda')).toBe('https://instagram.com/tienda');
      expect(normalizeInstagramUrl('www.instagram.com/tienda')).toBe(
        'https://www.instagram.com/tienda',
      );
    });

    it('should upgrade http:// to https://', () => {
      expect(normalizeInstagramUrl('http://instagram.com/tienda')).toBe(
        'https://instagram.com/tienda',
      );
    });

    it('should preserve already valid https://instagram.com/ urls', () => {
      expect(normalizeInstagramUrl('https://instagram.com/tienda')).toBe(
        'https://instagram.com/tienda',
      );
    });

    it('should handle https://@user properly', () => {
      expect(normalizeInstagramUrl('https://@tienda')).toBe('https://instagram.com/tienda');
      expect(normalizeInstagramUrl('https://@')).toBe('');
    });
  });

  describe('normalizeFacebookUrl', () => {
    it('should return empty string for null, undefined, empty string, or non-string', () => {
      expect(normalizeFacebookUrl(null)).toBe('');
      expect(normalizeFacebookUrl(undefined)).toBe('');
      expect(normalizeFacebookUrl('')).toBe('');
      expect(normalizeFacebookUrl('   ')).toBe('');
      expect(normalizeFacebookUrl(456 as unknown as string)).toBe('');
    });

    it('should normalize @page to https://facebook.com/page', () => {
      expect(normalizeFacebookUrl('@tienda_fb')).toBe('https://facebook.com/tienda_fb');
      expect(normalizeFacebookUrl('@')).toBe('');
    });

    it('should normalize page handle without scheme to https://facebook.com/page', () => {
      expect(normalizeFacebookUrl('tienda_fb')).toBe('https://facebook.com/tienda_fb');
      expect(normalizeFacebookUrl('/tienda_fb')).toBe('https://facebook.com/tienda_fb');
      expect(normalizeFacebookUrl('///')).toBe('');
    });

    it('should normalize facebook.com/page to https://facebook.com/page', () => {
      expect(normalizeFacebookUrl('facebook.com/tienda')).toBe('https://facebook.com/tienda');
      expect(normalizeFacebookUrl('www.facebook.com/tienda')).toBe(
        'https://www.facebook.com/tienda',
      );
    });

    it('should upgrade http:// to https://', () => {
      expect(normalizeFacebookUrl('http://facebook.com/tienda')).toBe(
        'https://facebook.com/tienda',
      );
    });

    it('should preserve valid https://facebook.com/ urls', () => {
      expect(normalizeFacebookUrl('https://facebook.com/tienda')).toBe(
        'https://facebook.com/tienda',
      );
    });
  });

  describe('normalizeWhatsAppUrl', () => {
    it('should return empty string for null, undefined, empty string, or non-string', () => {
      expect(normalizeWhatsAppUrl(null)).toBe('');
      expect(normalizeWhatsAppUrl(undefined)).toBe('');
      expect(normalizeWhatsAppUrl('')).toBe('');
      expect(normalizeWhatsAppUrl('   ')).toBe('');
      expect(normalizeWhatsAppUrl(789 as unknown as string)).toBe('');
    });

    it('should normalize raw phone numbers into https://wa.me/<cleaned-digits>', () => {
      expect(normalizeWhatsAppUrl('+54 9 261 123-4567')).toBe('https://wa.me/5492611234567');
      expect(normalizeWhatsAppUrl('1122334455')).toBe('https://wa.me/1122334455');
    });

    it('should normalize wa.me/<digits> with https://', () => {
      expect(normalizeWhatsAppUrl('wa.me/54911223344')).toBe('https://wa.me/54911223344');
    });

    it('should normalize api.whatsapp.com/send?phone=... and chat.whatsapp.com with https://', () => {
      expect(normalizeWhatsAppUrl('api.whatsapp.com/send?phone=54911223344')).toBe(
        'https://api.whatsapp.com/send?phone=54911223344',
      );
      expect(normalizeWhatsAppUrl('chat.whatsapp.com/invite123')).toBe(
        'https://chat.whatsapp.com/invite123',
      );
    });

    it('should upgrade http:// to https://', () => {
      expect(normalizeWhatsAppUrl('http://wa.me/54911223344')).toBe('https://wa.me/54911223344');
    });

    it('should preserve existing valid https://wa.me/ and other https WhatsApp urls', () => {
      expect(normalizeWhatsAppUrl('https://wa.me/54911223344')).toBe('https://wa.me/54911223344');
      expect(normalizeWhatsAppUrl('https://wa.me/footer')).toBe('https://wa.me/footer');
      expect(normalizeWhatsAppUrl('https://api.whatsapp.com/send')).toBe(
        'https://api.whatsapp.com/send',
      );
      expect(normalizeWhatsAppUrl('https://chat.whatsapp.com/invite')).toBe(
        'https://chat.whatsapp.com/invite',
      );
      expect(normalizeWhatsAppUrl('https://otherdomain.com/link')).toBe(
        'https://otherdomain.com/link',
      );
    });

    it('should prepend https:// for unknown non-phone domain string', () => {
      expect(normalizeWhatsAppUrl('otherdomain.com/link')).toBe('https://otherdomain.com/link');
    });
  });
});
