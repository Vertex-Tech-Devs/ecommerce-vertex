/**
 * Utility functions for URL sanitization and normalization.
 */

/**
 * Normalizes an Instagram username, handle, or URL into a full HTTPS link.
 * Handles inputs like `@user`, `instagram.com/user`, `http://instagram.com/user`, or `user`.
 */
export function normalizeInstagramUrl(value?: string | null): string {
  if (!value || typeof value !== 'string') {
    return '';
  }

  let trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  // Handle @username
  if (trimmed.startsWith('@')) {
    const handle = trimmed.slice(1).trim();
    return handle ? `https://instagram.com/${handle}` : '';
  }

  // Upgrade http:// to https://
  if (trimmed.startsWith('http://')) {
    trimmed = 'https://' + trimmed.slice(7);
  }

  // If starts with https://@handle
  if (trimmed.startsWith('https://@')) {
    const handle = trimmed.slice(9).trim();
    return handle ? `https://instagram.com/${handle}` : '';
  }

  // If already starts with https://
  if (trimmed.startsWith('https://')) {
    return trimmed;
  }

  // If starts with instagram.com or www.instagram.com
  if (trimmed.startsWith('instagram.com') || trimmed.startsWith('www.instagram.com')) {
    return `https://${trimmed}`;
  }

  // Fallback: treat as username/handle
  const cleanHandle = trimmed.replace(/^\/+/, '');
  return cleanHandle ? `https://instagram.com/${cleanHandle}` : '';
}

/**
 * Normalizes a Facebook username, page, or URL into a full HTTPS link.
 * Handles inputs like `@page`, `facebook.com/page`, `http://facebook.com/page`, or `page`.
 */
export function normalizeFacebookUrl(value?: string | null): string {
  if (!value || typeof value !== 'string') {
    return '';
  }

  let trimmed = value.trim();
  if (!trimmed) {
    return '';
  }

  // Handle @page
  if (trimmed.startsWith('@')) {
    const handle = trimmed.slice(1).trim();
    return handle ? `https://facebook.com/${handle}` : '';
  }

  // Upgrade http:// to https://
  if (trimmed.startsWith('http://')) {
    trimmed = 'https://' + trimmed.slice(7);
  }

  // If already starts with https://
  if (trimmed.startsWith('https://')) {
    return trimmed;
  }

  // If starts with facebook.com or www.facebook.com
  if (trimmed.startsWith('facebook.com') || trimmed.startsWith('www.facebook.com')) {
    return `https://${trimmed}`;
  }

  // Fallback: treat as page handle
  const cleanHandle = trimmed.replace(/^\/+/, '');
  return cleanHandle ? `https://facebook.com/${cleanHandle}` : '';
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
