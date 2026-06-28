import React from 'react';
import { VIBES, MAX_VIBES } from '../data/vibes';

export function VibeSection({ selectedVibes, onToggle, onMaxHit }) {
  const handleClick = (vibe) => {
    if (!selectedVibes.includes(vibe.label) && selectedVibes.length >= MAX_VIBES) {
      onMaxHit?.();
      return;
    }
    onToggle(vibe.label);
  };

  return (
    <section className="card">
      <div className="card-header">
        <div className="card-num">2</div>
        <h2 className="card-title">pick the vibe</h2>
      </div>
      <p className="card-hint">up to {MAX_VIBES} tags — helps the right people find your drop.</p>

      <div className="chips">
        {VIBES.map(vibe => {
          const isActive = selectedVibes.includes(vibe.label);
          return (
            <button
              key={vibe.label}
              className={`chip ${isActive ? `active ${vibe.color}` : ''}`}
              onClick={() => handleClick(vibe)}
            >
              {vibe.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
