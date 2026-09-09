/**
 * Utility functions for URL sanitization and normalization.
 */

const PLATFORM_CONFIG = {
  instagram: {
    domain: 'instagram.com',
    allowedHosts: new Set(['instagram.com', 'www.instagram.com']),
  },
  facebook: {
    domain: 'facebook.com',
    allowedHosts: new Set(['facebook.com', 'www.facebook.com']),
  },
} as const;

/**
 * Normalizes a social media profile URL or handle for Instagram or Facebook.
 * Enforces strict hostname boundary verification using the WHATWG URL parser to prevent
 * incomplete URL substring sanitization vulnerabilities (e.g. `instagram.com.attacker.com`).
 */
function normalizeSocialUrl(
  value: string | null | undefined,
  platform: 'instagram' | 'facebook',
): string {
  if (!value || typeof value !== 'string') {
    return '';
  }

  const trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  const { domain, allowedHosts } = PLATFORM_CONFIG[platform];

  // Handle @handle
  if (trimmed.startsWith('@')) {
    const handle = trimmed.slice(1).trim();
    return handle ? `https://${domain}/${handle}` : '';
  }

  // Handle https://@handle
  if (trimmed.startsWith('https://@')) {
    const handle = trimmed.slice(9).trim();
    return handle ? `https://${domain}/${handle}` : '';
  }

  // Clean leading slashes e.g. /handle or ///
  const cleanCandidate = trimmed.replace(/^\/+/, '');
  if (!cleanCandidate) {
    return '';
  }

  // Check if it's a simple raw handle without domain dots, slashes, or colons
  if (
    !cleanCandidate.includes('.') &&
    !cleanCandidate.includes('/') &&
    !cleanCandidate.includes(':')
  ) {
    return `https://${domain}/${cleanCandidate}`;
  }

  // Attempt to parse as full URL or domain with path
  let candidate = trimmed;
  if (candidate.startsWith('http://')) {
    candidate = 'https://' + candidate.slice(7);
  } else if (!candidate.startsWith('https://')) {
    candidate = 'https://' + candidate;
  }

  try {
    const parsed = new URL(candidate);
    const hostname = parsed.hostname.toLowerCase();
    if (allowedHosts.has(hostname)) {
      parsed.protocol = 'https:';
      const pathAndSearch =
        (parsed.pathname === '/' ? '' : parsed.pathname) + parsed.search + parsed.hash;
      return `https://${hostname}${pathAndSearch}`;
    }
  } catch {
    return '';
  }

  return '';
}

/**
 * Normalizes an Instagram username, handle, or URL into a full HTTPS link.
 * Handles inputs like `@user`, `instagram.com/user`, `http://instagram.com/user`, or `user`.
 * Rejects deceptive hostnames like `instagram.com.attacker.com`.
 */
export function normalizeInstagramUrl(value?: string | null): string {
  return normalizeSocialUrl(value, 'instagram');
}

/**
 * Normalizes a Facebook username, page, or URL into a full HTTPS link.
 * Handles inputs like `@page`, `facebook.com/page`, `http://facebook.com/page`, or `page`.
 * Rejects deceptive hostnames like `facebook.com.malicious.net`.
 */
export function normalizeFacebookUrl(value?: string | null): string {
  return normalizeSocialUrl(value, 'facebook');
}

/**
 * Normalizes a WhatsApp link or phone number into a full https://wa.me/<digits> link.
 * Handles phone numbers (e.g. `+54 9 261 123-4567`), `wa.me/...`, or full `https://wa.me/...`.
 */
export function normalizeWhatsAppUrl(value?: string | null): string {
  if (!value || typeof value !== 'string') {
    return '';
  }

  let trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  // Upgrade http:// to https://
  if (trimmed.startsWith('http://')) {
    trimmed = 'https://' + trimmed.slice(7);
  }

  // Already a full WhatsApp url with scheme
  if (
    trimmed.startsWith('https://wa.me/') ||
    trimmed.startsWith('https://api.whatsapp.com/') ||
    trimmed.startsWith('https://chat.whatsapp.com/')
  ) {
    return trimmed;
  }

  if (
    trimmed.startsWith('wa.me/') ||
    trimmed.startsWith('api.whatsapp.com/') ||
    trimmed.startsWith('chat.whatsapp.com/')
  ) {
    return `https://${trimmed}`;
  }

  // If it contains phone number digits without alphabetic scheme
  const cleanedDigits = trimmed.replace(/\D/g, '');
  if (cleanedDigits.length > 0 && !/[a-zA-Z]/.test(trimmed)) {
    return `https://wa.me/${cleanedDigits}`;
  }

  // If already an https:// URL
  if (trimmed.startsWith('https://')) {
    return trimmed;
  }

  return `https://${trimmed}`;
}
