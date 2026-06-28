import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { getCurator } from '../data/mockCurators';

export function DropCard({ drop, variant = 'default', rank = null }) {
  const products = drop.product_ids
    .map(id => MOCK_PRODUCTS.find(p => p.id === id))
    .filter(Boolean);
  const total = products.reduce((s, p) => s + p.price, 0);
  const curator = getCurator(drop.curator_id);
  const preview = products.slice(0, 4);

  if (variant === 'featured') {
    return (
      <Link to={`/drop/${drop.id}`} className="drop-card drop-card-featured">
        <div className="drop-card-featured-left">
          <div className="drop-preview-grid">
            {preview.map((p, i) => (
              <div key={p.id} className={`preview-tile preview-${i}`}>
                <span className="preview-emoji">{p.emoji}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="drop-card-featured-right">
          <span className="featured-tag">★ FEATURED THIS WEEK</span>
          <h3 className="drop-name-lg">{drop.name}</h3>
          <p className="drop-pitch">{drop.pitch}</p>
          <div className="drop-meta">
            <span className="curator-line">
              by <span className="handle">@{curator?.handle}</span> · LVL {curator?.tier}
            </span>
          </div>
          <div className="drop-vibes">
            {drop.vibes.slice(0, 3).map(v => (
              <span key={v} className="vibe-tag">{v}</span>
            ))}
          </div>
          <div className="drop-stats">
            <span className="stat-pill stat-votes">★ {drop.votes}</span>
            <span className="stat-pill stat-products">{products.length} items</span>
            <span className="stat-pill stat-total">${total}</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link to={`/drop/${drop.id}`} className="drop-card">
      {rank !== null && <div className="rank-badge">#{rank}</div>}
      <div className="drop-preview-grid drop-preview-sm">
        {preview.map((p, i) => (
          <div key={p.id} className={`preview-tile preview-${i}`}>
            <span className="preview-emoji">{p.emoji}</span>
          </div>
        ))}
      </div>
      <div className="drop-card-body">
        <h3 className="drop-name">{drop.name}</h3>
        <div className="drop-meta">
          <span className="curator-line">@{curator?.handle}</span>
          <span className="dot-sep">·</span>
          <span className="cat-line">{drop.category}</span>
        </div>
        <div className="drop-vibes">
          {drop.vibes.slice(0, 2).map(v => (
            <span key={v} className="vibe-tag">{v}</span>
          ))}
        </div>
        <div className="drop-stats">
          <span className="stat-mini">★ {drop.votes}</span>
          <span className="stat-mini">${total}</span>
        </div>
      </div>
    </Link>
  );
}
