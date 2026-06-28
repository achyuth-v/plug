import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_DROPS, getFeaturedDrops } from '../data/mockDrops';
import { CATEGORIES } from '../data/categories';
import { DropCard } from '../components/DropCard';
import { useAuth } from '../context/AuthContext';

export function Feed() {
  const { user } = useAuth();
  const [activeCat, setActiveCat] = useState('all');
  const featured = getFeaturedDrops()[0];

  const filteredDrops = useMemo(() => {
    const without = MOCK_DROPS.filter(d => d.id !== featured?.id);
    if (activeCat === 'all') return without;
    return without.filter(d => d.category === activeCat);
  }, [activeCat, featured]);

  return (
    <div className="page-container">
      {/* Welcome banner */}
      <div className="feed-welcome">
        <div>
          <p className="hero-eyebrow">★ WEEK 24 ARENA — LIVE NOW ★</p>
          <h1 className="page-title">welcome back, @{user?.handle}.</h1>
          <p className="page-sub">
            {MOCK_DROPS.length} drops live. 4d 12h left to vote.
          </p>
        </div>
        <Link to="/create" className="cta-btn cta-primary cta-big">
          + new drop
        </Link>
      </div>

      {/* Featured */}
      {featured && (
        <section style={{ marginBottom: 40 }}>
          <h2 className="section-heading">featured drop</h2>
          <DropCard drop={featured} variant="featured" />
        </section>
      )}

      {/* Category filter */}
      <section>
        <div className="section-head-row">
          <h2 className="section-heading">all drops</h2>
        </div>
        <div className="cat-pills">
          <button className={`cat-pill ${activeCat === 'all' ? 'active' : ''}`} onClick={() => setActiveCat('all')}>
            all
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat.slug}
              className={`cat-pill ${activeCat === cat.slug ? 'active' : ''}`}
              onClick={() => setActiveCat(cat.slug)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Drops grid */}
      <section className="drops-grid">
        {filteredDrops.length === 0 ? (
          <div className="grid-empty">no drops in this category yet — make one!</div>
        ) : (
          filteredDrops.map(drop => <DropCard key={drop.id} drop={drop} />)
        )}
      </section>

      {/* Bottom CTA */}
      <section className="bottom-cta">
        <h3 className="bottom-cta-title">got a vibe?</h3>
        <p className="bottom-cta-sub">stack the products. enter the arena. earn forever.</p>
        <Link to="/create" className="cta-btn cta-primary cta-big">
          + new drop →
        </Link>
      </section>
    </div>
  );
}
