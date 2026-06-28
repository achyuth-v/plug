// ============================================
// Stripe — individual product checkout
// ============================================
// Each product in a drop is purchasable individually. Checkout goes through
// your Express backend, which creates a Stripe Checkout session attributed
// to the source drop. Curator commission is calculated server-side and paid
// out via Stripe Connect (Week 4 of the build plan).
//
// Backend endpoint to implement:
//   POST /api/checkout
//   body: { productId, dropId }
//   → returns { sessionUrl }

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

/**
 * Start checkout for a single product, attributed to a drop.
 * @param {object} opts
 * @param {string} opts.productId
 * @param {string} opts.dropId - the drop the buyer came from (for commission attribution)
 */
export async function checkoutProduct({ productId, dropId }) {
  const res = await fetch(`${API_URL}/api/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId, dropId }),
  });
  if (!res.ok) throw new Error('Checkout failed');
  const { sessionUrl } = await res.json();
  window.location.href = sessionUrl;
}
