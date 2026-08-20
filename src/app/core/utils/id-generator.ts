const SAFE_ALPHABET = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';

/**
 * Generates a short, readable, collision-resistant alphanumeric ID.
 * Defaults to 8 characters. Uses cryptographically secure random values when available.
 */
export function generateShortId(length = 8): string {
  const alphabetLength = SAFE_ALPHABET.length;
  let result = '';

  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    const randomBytes = new Uint8Array(length);
    crypto.getRandomValues(randomBytes);
    for (let i = 0; i < length; i++) {
      result += SAFE_ALPHABET[randomBytes[i] % alphabetLength];
    }
  } else {
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * alphabetLength);
      result += SAFE_ALPHABET[randomIndex];
    }
  }

  return result;
}
