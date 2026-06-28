import React from 'react';
import { MAX_PRODUCTS } from '../hooks/useDropState';

export function DeployBar({
  count,
  total,
  earn,
  ready,
  buttonLabel,
  onDeploy,
}) {
  return (
    <div className="deploy-wrap">
      <div className={`deploy-bar ${ready ? 'ready' : ''}`}>
        <div className="deploy-meter">
          {Array.from({ length: MAX_PRODUCTS }).map((_, i) => (
            <div key={i} className={`meter-dot ${i < count ? 'filled' : ''}`} />
          ))}
        </div>
        <div className="deploy-stats">
          <div className="stat-block">
            <span className="stat-key">total</span>
            <span className="stat-val">${total}</span>
          </div>
          <div className="stat-block">
            <span className="stat-key">you earn</span>
            <span className="stat-val earn">${earn}</span>
          </div>
        </div>
        <button
          className={`deploy-btn ${ready ? 'ready' : ''}`}
          disabled={!ready}
          onClick={onDeploy}
        >
          <span>{buttonLabel}</span>
          <span>→</span>
        </button>
      </div>
    </div>
  );
}
