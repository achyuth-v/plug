import React, { useState } from 'react';
import { Outlet, NavLink, Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { BackgroundDeco } from './BackgroundDeco';

// Icons
const I = {
  feed: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>,
  shop: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  create: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  community: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  top: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  dash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  logout: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  close: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

export function AppLayout() {
  const { isAuthenticated, user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div className="app-layout">
      <BackgroundDeco />
      <Sidebar open={mobileOpen} onClose={() => setMobileOpen(false)} user={user} />
      <div className="app-main">
        <TopBar onMenu={() => setMobileOpen(true)} user={user} />
        <main className="app-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function Sidebar({ open, onClose, user }) {
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const linkClass = ({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`;

  return (
    <>
      {open && <div className="sidebar-backdrop" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'open' : ''}`}>
        <div className="sidebar-top">
          <Link to="/feed" className="logo" onClick={onClose}>
            <span className="logo-mark">plug<span className="dot">.</span></span>
          </Link>
          <button className="sidebar-close" onClick={onClose} aria-label="close">
            {I.close}
          </button>
        </div>

        <nav className="sidebar-nav">
          <NavLink to="/feed" className={linkClass} onClick={onClose}>
            <span className="sidebar-icon">{I.feed}</span>
            <span>feed</span>
          </NavLink>
          <NavLink to="/shop" className={linkClass} onClick={onClose}>
            <span className="sidebar-icon">{I.shop}</span>
            <span>shop</span>
            <span className="sidebar-pill sidebar-pill-coral">hot</span>
          </NavLink>
          <NavLink to="/create" className={linkClass} onClick={onClose}>
            <span className="sidebar-icon">{I.create}</span>
            <span>create</span>
            <span className="sidebar-pill sidebar-pill-lime">+ earn</span>
          </NavLink>
          <NavLink to="/community" className={linkClass} onClick={onClose}>
            <span className="sidebar-icon">{I.community}</span>
            <span>community</span>
          </NavLink>
          <NavLink to="/leaderboard" className={linkClass} onClick={onClose}>
            <span className="sidebar-icon">{I.top}</span>
            <span>top drops</span>
          </NavLink>
          <NavLink to="/dashboard" className={linkClass} onClick={onClose}>
            <span className="sidebar-icon">{I.dash}</span>
            <span>dashboard</span>
          </NavLink>
        </nav>

        <div className="sidebar-divider" />

        <Link to={`/curator/${user?.id}`} className="sidebar-profile" onClick={onClose}>
          <div className="sidebar-avatar">{user?.initials}</div>
          <div className="sidebar-profile-info">
            <div className="sidebar-handle">@{user?.handle}</div>
            <div className="sidebar-tier">LVL {user?.tier} · {user?.xp} XP</div>
          </div>
        </Link>

        <button className="sidebar-link sidebar-signout" onClick={handleSignOut}>
          <span className="sidebar-icon">{I.logout}</span>
          <span>sign out</span>
        </button>
      </aside>
    </>
  );
}

function TopBar({ onMenu, user }) {
  return (
    <header className="topbar">
      <button className="topbar-menu" onClick={onMenu} aria-label="open menu">
        {I.menu}
      </button>

      <div className="topbar-spacer" />

      <Link to="/create" className="topbar-cta">
        + new drop
      </Link>
      <div className="topbar-xp">
        <svg width="12" height="14" viewBox="0 0 12 14" fill="currentColor" aria-hidden="true">
          <path d="M7 0L1 8h4l-2 6L11 5H7z" />
        </svg>
        <span>{user?.xp}</span>
      </div>
    </header>
  );
}
