// ============================================
// CJ Dropshipping integration
// ============================================
// CJ's public API requires server-side auth (CJ_EMAIL + CJ_API_KEY).
// Frontend should call your Express/Railway backend, which proxies CJ.
// Reuse the CJ client you already built for Nook — copy that file into
// the backend repo and expose these endpoints:
//   GET  /api/products/search?q=...&cat=...
//   GET  /api/products/:id
//
// For now this module returns mock data so you can develop the UI without
// the backend running. Flip USE_MOCK to false once your backend endpoints
// are live.

import { MOCK_PRODUCTS } from '../data/mockProducts';

const USE_MOCK = true; // flip when backend is wired up
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Search the catalog for products.
 * @param {object} opts
 * @param {string} opts.query - free-text search
 * @param {string} opts.category - category slug (or 'all')
 * @returns {Promise<Array>} list of products
 */
export async function searchProducts({ query = '', category = 'all' } = {}) {
  if (USE_MOCK) {
    return MOCK_PRODUCTS.filter(p => {
      if (category !== 'all' && p.cat !== category) return false;
      if (query && !p.name.toLowerCase().includes(query.toLowerCase())) return false;
      return true;
    });
  }

  const url = new URL(`${API_URL}/api/products/search`);
  if (query) url.searchParams.set('q', query);
  if (category && category !== 'all') url.searchParams.set('cat', category);

  const res = await fetch(url);
  if (!res.ok) throw new Error('Product search failed');
  return res.json();
}

/**
 * Get a single product by id.
 * @param {string} id
 */
export async function getProduct(id) {
  if (USE_MOCK) {
    return MOCK_PRODUCTS.find(p => p.id === id) || null;
  }
  const res = await fetch(`${API_URL}/api/products/${id}`);
  if (!res.ok) throw new Error('Product fetch failed');
  return res.json();
}
