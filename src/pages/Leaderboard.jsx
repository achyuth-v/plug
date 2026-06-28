import React, { useState, useMemo } from 'react';
import { MOCK_DROPS } from '../data/mockDrops';
import { CATEGORIES } from '../data/categories';
import { DropCard } from '../components/DropCard';

export function Leaderboard() {
  const [activeCat, setActiveCat] = useState('all');

  const ranked = useMemo(() => {
    let list = [...MOCK_DROPS];
    if (activeCat !== 'all') list = list.filter(d => d.category === activeCat);
    return list.sort((a, b) => b.votes - a.votes);
  }, [activeCat]);

  return (
    <div className="page-container">
      <div className="page-header">
        <p className="hero-eyebrow">★ LEADERBOARD ★</p>
        <h1 className="page-title">top drops, week 24.</h1>
        <p className="page-sub">top 3 in each category take the bonus pot.</p>
      </div>

      <div className="cat-pills" style={{ marginBottom: 30 }}>
        <button
          className={`cat-pill ${activeCat === 'all' ? 'active' : ''}`}
          onClick={() => setActiveCat('all')}
        >
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

      <section className="drops-grid">
        {ranked.length === 0 ? (
          <div className="grid-empty">no drops in this category yet</div>
        ) : (
          ranked.map((drop, i) => (
            <DropCard key={drop.id} drop={drop} rank={i + 1} />
          ))
        )}
      </section>
    </div>
  );
}
