import React, { useState, useEffect } from 'react';
import { searchProducts } from '../lib/cjApi';
import { CATEGORIES, getCategory } from '../data/categories';

export function ProductPicker({ selectedIds, onToggle, onMaxHit, maxProducts, minProducts, categoryFilter }) {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState(categoryFilter || 'all');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Sync filter with category selection upstream
  useEffect(() => {
    if (categoryFilter && categoryFilter !== filter) {
      setFilter(categoryFilter);
    }
  }, [categoryFilter]); // eslint-disable-line

  // Fetch products on filter/search change
  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const list = await searchProducts({ query: search, category: filter });
        if (!cancelled) setProducts(list);
      } catch (e) {
        console.error('Product fetch failed:', e);
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [search, filter]);

  const handleAdd = (id) => {
    if (!selectedIds.includes(id) && selectedIds.length >= maxProducts) {
      onMaxHit?.();
      return;
    }
    onToggle(id);
  };

  // Only show filter pills for "popular" categories to avoid clutter — rest accessible via search
  const POPULAR = ['all', 'tech', 'home', 'fitness', 'fashion', 'desk', 'beauty'];

  return (
    <section className="card">
      <div className="card-header">
        <div className="card-num">4</div>
        <h2 className="card-title">stack the goods</h2>
      </div>
      <p className="card-hint">
        add at least {minProducts} (up to {maxProducts}) — click to add.
      </p>

      <div className="search-bar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2.5" aria-hidden="true">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="text"
          placeholder="search products from CJ / AliExpress…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-row">
        {POPULAR.map(slug => (
          <button
            key={slug}
            className={`filter ${filter === slug ? 'active' : ''}`}
            onClick={() => setFilter(slug)}
          >
            {slug}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {loading && (
          <div className="grid-empty">loading…</div>
        )}
        {!loading && products.length === 0 && (
          <div className="grid-empty">nothing matches</div>
        )}
        {!loading && products.map(p => {
          const isAdded = selectedIds.includes(p.id);
          const cat = getCategory(p.cat);
          return (
            <div
              key={p.id}
              className={`product ${isAdded ? 'added' : ''}`}
              style={{ '--cat-color': cat?.bg || 'var(--bg-2)' }}
              onClick={() => handleAdd(p.id)}
            >
              <div className="product-thumb">
                <span className="product-cat">{p.cat}</span>
                <span className="product-emoji">{p.emoji}</span>
              </div>
              <div className="product-add">{isAdded ? '✓' : '+'}</div>
              <div className="product-info">
                <div className="product-name">{p.name}</div>
                <div className="product-price">${p.price}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
