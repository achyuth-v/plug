import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="container container-narrow">
      <div className="page-header" style={{ textAlign: 'center' }}>
        <p className="hero-eyebrow">★ 404 ★</p>
        <h1 className="page-title">lost the plug.</h1>
        <p className="page-sub">this page doesn't exist. probably got dropped.</p>
        <Link to="/" className="cta-btn cta-primary cta-big" style={{ marginTop: 24 }}>
          back to arena →
        </Link>
      </div>
    </div>
  );
}
