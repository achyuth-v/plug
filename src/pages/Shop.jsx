import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { MOCK_DROPS } from '../data/mockDrops';
import { CATEGORIES, getCategory } from '../data/categories';
import { getCurator } from '../data/mockCurators';
import { Toast } from '../components/Toast';
import { useToast } from '../hooks/useToast';

export function Shop() {
  const { toast, show: showToast } = useToast();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sort, setSort] = useState('trending');

  // For each product, find drops that include it
  const productsWithDrops = useMemo(() => {
    return MOCK_PRODUCTS.map(p => {
      const drops = MOCK_DROPS.filter(d => d.product_ids.includes(p.id));
      return { ...p, drops };
    });
  }, []);

  const filtered = useMemo(() => {
    let list = [...productsWithDrops];
    if (category !== 'all') list = list.filter(p => p.cat === category);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q));
    }
    if (sort === 'trending') list.sort((a, b) => b.drops.length - a.drops.length);
    else if (sort === 'price-low') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-high') list.sort((a, b) => b.price - a.price);
    return list;
  }, [productsWithDrops, search, category, sort]);

  const handleBuy = (product) => {
    showToast(`buying ${product.name}…`, true);
    setTimeout(() => showToast('connect stripe to checkout', true), 800);
  };

  // Top selling products (just first 4 with most drops)
  const trendingHero = [...productsWithDrops]
    .sort((a, b) => b.drops.length - a.drops.length)[0];
  const trendingCurator = trendingHero?.drops[0]
    ? getCurator(trendingHero.drops[0].curator_id)
    : null;

  return (
    <div className="page-container">
      {/* Shop hero */}
      <div className="shop-hero">
        <div className="shop-hero-text">
          <p className="hero-eyebrow">★ THE SHOP ★</p>
          <h1 className="page-title">shop the good stuff.</h1>
          <p className="page-sub">
            every product curated by a real person. buy any item solo — no bundles,
            no minimums. your purchase pays the curator who put you onto it.
          </p>
          <div className="shop-hero-stats">
            <div className="shero-stat">
              <span className="shero-num">{MOCK_PRODUCTS.length}+</span>
              <span className="shero-key">products</span>
            </div>
            <div className="shero-stat">
              <span className="shero-num">{CATEGORIES.length}</span>
              <span className="shero-key">categories</span>
            </div>
            <div className="shero-stat">
              <span className="shero-num">100%</span>
              <span className="shero-key">curated</span>
            </div>
          </div>
        </div>

        {trendingHero && (
          <Link to={`/drop/${trendingHero.drops[0]?.id}`} className="shop-hero-feature">
            <div className="featured-tag">★ TRENDING NOW</div>
            <div className="feature-emoji">{trendingHero.emoji}</div>
            <div className="feature-info">
              <h3>{trendingHero.name}</h3>
              <p className="feature-curator">
                in {trendingHero.drops.length} drop{trendingHero.drops.length === 1 ? '' : 's'} ·
                @{trendingCurator?.handle}
              </p>
              <div className="feature-price-row">
                <span className="feature-price">${trendingHero.price}</span>
                <button
                  className="buy-btn"
                  onClick={(e) => { e.preventDefault(); handleBuy(trendingHero); }}
                >
                  buy →
                </button>
              </div>
            </div>
          </Link>
        )}
      </div>

      {/* Search + sort */}
      <div className="shop-controls">
        <div className="search-bar">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="text"
            placeholder="search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="sort-row">
          <button className={`sort-btn ${sort === 'trending' ? 'active' : ''}`} onClick={() => setSort('trending')}>
            trending
          </button>
          <button className={`sort-btn ${sort === 'price-low' ? 'active' : ''}`} onClick={() => setSort('price-low')}>
            price ↑
          </button>
          <button className={`sort-btn ${sort === 'price-high' ? 'active' : ''}`} onClick={() => setSort('price-high')}>
            price ↓
          </button>
        </div>
      </div>

      {/* Category pills */}
      <div className="cat-pills" style={{ marginBottom: 24 }}>
        <button className={`cat-pill ${category === 'all' ? 'active' : ''}`} onClick={() => setCategory('all')}>
          all
        </button>
        {CATEGORIES.map(cat => (
          <button
            key={cat.slug}
            className={`cat-pill ${category === cat.slug ? 'active' : ''}`}
            onClick={() => setCategory(cat.slug)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <section className="shop-grid">
        {filtered.length === 0 ? (
          <div className="grid-empty">nothing matches</div>
        ) : (
          filtered.map(product => {
            const cat = getCategory(product.cat);
            const firstDrop = product.drops[0];
            const curator = firstDrop ? getCurator(firstDrop.curator_id) : null;
            return (
              <div key={product.id} className="shop-card">
                <div
                  className="shop-thumb"
                  style={{ background: cat?.bg }}
                >
                  <span className="shop-cat-tag">{product.cat}</span>
                  <span className="shop-emoji">{product.emoji}</span>
                </div>
                <div className="shop-info">
                  <h4 className="shop-name">{product.name}</h4>
                  {product.drops.length > 0 ? (
                    <p className="shop-curator">
                      featured by{' '}
                      <Link to={`/curator/${curator?.id}`}>@{curator?.handle}</Link>
                      {product.drops.length > 1 && ` + ${product.drops.length - 1} more`}
                    </p>
                  ) : (
                    <p className="shop-curator" style={{ opacity: 0.5 }}>uncurated · be the first</p>
                  )}
                  <div className="shop-bottom-row">
                    <span className="shop-price">${product.price}</span>
                    <button className="buy-btn" onClick={() => handleBuy(product)}>
                      buy →
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </section>

      {/* Bottom CTA - become a curator */}
      <section className="shop-cta">
        <div className="shop-cta-inner">
          <div>
            <h3 className="shop-cta-title">like what you see?</h3>
            <p className="shop-cta-sub">curate your own drop. earn commission when others buy from it.</p>
          </div>
          <Link to="/create" className="cta-btn cta-primary cta-big">
            + make a drop →
          </Link>
        </div>
      </section>

      <Toast text={toast.text} visible={toast.visible} />
    </div>
  );
}
