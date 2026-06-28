import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { getCurator, CURRENT_USER } from '../data/mockCurators';
import { getDropsByCurator } from '../data/mockDrops';
import { DropCard } from '../components/DropCard';
import { Toast } from '../components/Toast';
import { useToast } from '../hooks/useToast';

export function Curator() {
  const { id } = useParams();
  const curator = getCurator(id);
  const { toast, show: showToast } = useToast();
  const [following, setFollowing] = useState(false);

  if (!curator) return <Navigate to="/" replace />;

  const drops = getDropsByCurator(id);
  const isMe = curator.id === CURRENT_USER.id;
  const totalVotes = drops.reduce((s, d) => s + d.votes, 0);

  const handleFollow = () => {
    setFollowing(!following);
    showToast(following ? 'unfollowed' : `following @${curator.handle}!`);
  };

  return (
    <div className="page-container">
      <Link to="/" className="back-link">← back to arena</Link>

      {/* Profile hero */}
      <div className="curator-hero">
        <div
          className="curator-hero-avatar"
          style={{ background: `var(--${curator.color})` }}
        >
          {curator.initials}
        </div>
        <div className="curator-hero-body">
          <div className="curator-hero-meta">
            <span className="tier-badge" style={{ position: 'static' }}>LVL {curator.tier}</span>
            <span className="xp-pill" style={{ position: 'static' }}>{curator.xp} XP</span>
          </div>
          <h1 className="curator-hero-handle">@{curator.handle}</h1>
          <p className="curator-hero-bio">{curator.bio}</p>

          <div className="curator-hero-stats">
            <div className="cstat">
              <span className="cstat-num">{drops.length}</span>
              <span className="cstat-key">drops</span>
            </div>
            <div className="cstat">
              <span className="cstat-num">{curator.followers}</span>
              <span className="cstat-key">followers</span>
            </div>
            <div className="cstat">
              <span className="cstat-num">{totalVotes}</span>
              <span className="cstat-key">total votes</span>
            </div>
          </div>

          {!isMe && (
            <button
              className={`follow-btn ${following ? 'following' : ''}`}
              onClick={handleFollow}
            >
              {following ? '✓ following' : '+ follow'}
            </button>
          )}
          {isMe && (
            <Link to="/dashboard" className="follow-btn">
              go to dashboard →
            </Link>
          )}
        </div>
      </div>

      <section>
        <h2 className="section-heading">drops by @{curator.handle}</h2>
        <div className="drops-grid">
          {drops.length === 0 ? (
            <div className="grid-empty">no drops yet</div>
          ) : (
            drops.map(drop => <DropCard key={drop.id} drop={drop} />)
          )}
        </div>
      </section>

      <Toast text={toast.text} visible={toast.visible} />
    </div>
  );
}
