import React, { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function MarketingLayout() {
  return (
    <div className="marketing-wrap">
      <PublicNav />
      <Outlet />
      <MarketingFooter />
    </div>
  );
}

function PublicNav() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="public-nav">
      <Link to="/" className="logo" onClick={() => setOpen(false)}>
        <span className="logo-mark">plug<span className="dot">.</span></span>
      </Link>

      <div className={`public-nav-links ${open ? 'open' : ''}`}>
        <a href="#how" onClick={() => setOpen(false)}>how it works</a>
        <a href="#shop" onClick={() => setOpen(false)}>shop</a>
        <a href="#earn" onClick={() => setOpen(false)}>earn</a>
        <a href="#about" onClick={() => setOpen(false)}>about</a>
      </div>

      <div className="public-nav-cta">
        {isAuthenticated ? (
          <button className="nav-cta" onClick={() => navigate('/feed')}>open app →</button>
        ) : (
          <>
            <Link to="/login" className="nav-link-text">sign in</Link>
            <Link to="/signup" className="nav-cta">sign up</Link>
          </>
        )}
      </div>

      <button
        className="hamburger"
        onClick={() => setOpen(!open)}
        aria-label="menu"
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}

function MarketingFooter() {
  return (
    <footer className="marketing-footer">
      <div className="footer-grid">
        <div>
          <div className="logo">
            <span className="logo-mark" style={{ fontSize: 22 }}>
              plug<span className="dot">.</span>
            </span>
          </div>
          <p className="footer-tagline">make a drop, win the week.</p>
        </div>
        <div>
          <h4>product</h4>
          <Link to="/feed">browse drops</Link>
          <Link to="/shop">shop</Link>
          <Link to="/create">make a drop</Link>
          <Link to="/leaderboard">top drops</Link>
        </div>
        <div>
          <h4>company</h4>
          <a href="#about">about</a>
          <a href="#how">how it works</a>
          <a href="#earn">for curators</a>
          <a href="#shop">for shoppers</a>
        </div>
        <div>
          <h4>account</h4>
          <Link to="/signup">sign up</Link>
          <Link to="/login">sign in</Link>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 plug. all drops are unsponsored. curators earn commission on every sale.</p>
      </div>
    </footer>
  );
}
