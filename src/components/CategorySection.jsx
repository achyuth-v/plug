import React from 'react';
import { CATEGORIES } from '../data/categories';

export function CategorySection({ selected, onSelect }) {
  return (
    <section className="card">
      <div className="card-header">
        <div className="card-num">3</div>
        <h2 className="card-title">pick a category</h2>
      </div>
      <p className="card-hint">your drop only battles others in the same one.</p>

      <div className="chips">
        {CATEGORIES.map(cat => {
          const isActive = selected === cat.slug;
          return (
            <button
              key={cat.slug}
              className={`chip cat ${isActive ? `active ${cat.color}` : ''}`}
              onClick={() => onSelect(cat.slug)}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
