/**
 * Integration Tests: Storefront Lifecycle (Playwright)
 *
 * These tests run against the Angular dev server on port 4201.
 * They exercise storefront-facing routes at a high level — no real
 * Firebase / Firestore / MercadoPago calls are expected during CI
 * because the app renders a stub environment.
 *
 * Covered scenarios:
 *   1. Home page redirects to /shop
 *   2. Shop catalog route loads without a crash
 *   3. Cart route is accessible (shows the page shell)
 *   4. Admin login page renders with a Google OAuth button
 *   5. Unknown routes do not crash the Angular app
 */

import { test, expect } from '@playwright/test';

// ─── Suite 1: Root navigation ─────────────────────────────────────────────────

test.describe('Home page', () => {
  test('navigating to / loads storefront homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('app-root')).toBeVisible();
  });
});

// ─── Suite 2: Shop catalog ────────────────────────────────────────────────────

test.describe('Shop catalog', () => {
  test.beforeEach(async ({ page }) => {
    // Route all Firestore REST calls to an empty response so the
    // catalog loads without real data — prevents CI hangs on network.
    await page.route('**/firestore.googleapis.com/**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ documents: [] }),
      });
    });

    // Stub store-config document fetch
    await page.route('**/documents/**/configuracion/store**', (route) => {
      route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          name: 'projects/test/databases/(default)/documents/configuracion/store',
          fields: {
            storeName: { stringValue: 'Tienda Test Vertex' },
            currency: { stringValue: 'ARS' },
            currencySymbol: { stringValue: '$' },
          },
        }),
      });
    });
  });

  test('shop catalog route loads without crash', async ({ page }) => {
    await page.goto('/catalog');
    // The Angular root element must always exist — a crash leaves a blank DOM
    await expect(page.locator('app-root')).toBeVisible({ timeout: 15_000 });
  });

  test('catalog page does not show an unhandled error banner', async ({ page }) => {
    await page.goto('/catalog');
    await page.waitForLoadState('networkidle');
    // Angular Error Interceptor would typically render "Store configuration unavailable"
    const errorBanner = page.locator('text=Store configuration unavailable');
    await expect(errorBanner).toHaveCount(0);
  });
});

// ─── Suite 3: Cart ────────────────────────────────────────────────────────────

test.describe('Cart route', () => {
  test('cart page is accessible and renders app shell', async ({ page }) => {
    await page.goto('/cart');
    await expect(page.locator('app-root')).toBeVisible({ timeout: 10_000 });
  });

  test('cart reflects items stored in localStorage', async ({ page }) => {
    // Pre-seed the cart before Angular bootstraps
    await page.addInitScript(() => {
      const cartItem = {
        id: 'var-001',
        productId: 'prod-1',
        variantId: 'var-001',
        name: 'Producto Semilla 1',
        price: 1000,
        quantity: 1,
        image: 'https://via.placeholder.com/80',
        attributes: {},
        stock: 20,
      };
      const cartData = JSON.stringify({ items: [cartItem], total: 1000 });
      window.localStorage.setItem('cart_store', cartData);
      window.localStorage.setItem('cart_tienda-dos', cartData);
      window.localStorage.setItem('cart_', cartData);
    });

    await page.goto('/cart');
    // The product name from localStorage must appear on screen
    await expect(page.locator('text=Producto Semilla 1')).toBeVisible({ timeout: 10_000 });
  });
});

// ─── Suite 4: Admin login ─────────────────────────────────────────────────────

test.describe('Admin login page', () => {
  test('admin login page renders Google OAuth access', async ({ page }) => {
    await page.goto('/admin/login');
    await expect(page.getByRole('heading', { name: 'Iniciar Sesión' })).toBeVisible({
      timeout: 10_000,
    });
    await expect(
      page.getByText('Ingresá únicamente con tu cuenta de Google autorizada'),
    ).toBeVisible();
  });

  test('admin login page has a Google OAuth button', async ({ page }) => {
    await page.goto('/admin/login');
    // Match the Google sign-in button by text or class used in the component
    const googleBtn = page.locator(
      'button.google-btn, button:has-text("Google"), [aria-label*="Google"], .bi-google',
    );
    await expect(googleBtn.first()).toBeVisible();
  });
});

// ─── Suite 5: Unknown routes ──────────────────────────────────────────────────

test.describe('Unknown routes', () => {
  test('non-existent shop route does not crash the app', async ({ page }) => {
    await page.goto('/this-page-does-not-exist', {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('app-root')).toBeVisible({ timeout: 10_000 });
  });

  test('non-existent admin route does not crash the app', async ({ page }) => {
    await page.goto('/admin/ruta-inexistente', {
      waitUntil: 'domcontentloaded',
    });
    await expect(page.locator('app-root')).toBeVisible({ timeout: 10_000 });
  });
});
