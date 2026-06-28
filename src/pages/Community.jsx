import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_CURATORS } from '../data/mockCurators';
import { MOCK_DROPS } from '../data/mockDrops';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { DropCard } from '../components/DropCard';

export function Community() {
  // Top curators by drops + votes
  const topCurators = [...MOCK_CURATORS]
    .map(c => {
      const drops = MOCK_DROPS.filter(d => d.curator_id === c.id);
      const totalVotes = drops.reduce((s, d) => s + d.votes, 0);
      return { ...c, totalVotes, dropsLive: drops.length };
    })
    .sort((a, b) => b.totalVotes - a.totalVotes);

  // Recent drops
  const recentDrops = [...MOCK_DROPS].slice(0, 6);

  // Activity (mock)
  const activity = [
    { handle: 'rae', action: 'just dropped', target: 'y2k summer fits', when: 'just now' },
    { handle: 'mira', action: 'hit', target: 'LVL 5', when: '12m ago' },
    { handle: 'tev', action: 'sold their 50th item', target: '', when: '1h ago' },
    { handle: 'noor', action: 'made', target: 'weekend hike kit', when: '2h ago' },
    { handle: 'jay.k', action: 'got featured for', target: 'minimalist desk under $80', when: '3h ago' },
    { handle: 'rae', action: 'hit 1000 votes on', target: 'y2k summer fits', when: '5h ago' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <p className="hero-eyebrow">★ COMMUNITY ★</p>
        <h1 className="page-title">the people behind the plug.</h1>
        <p className="page-sub">{MOCK_CURATORS.length}+ curators, all earning from their taste.</p>
      </div>

      {/* Top Curators */}
      <section style={{ marginBottom: 40 }}>
        <h2 className="section-heading">top curators this week</h2>
        <div className="curator-grid">
          {topCurators.map((c, i) => (
            <Link key={c.id} to={`/curator/${c.id}`} className="curator-tile">
              <div className="curator-tile-rank">#{i + 1}</div>
              <div
                className="curator-tile-avatar"
                style={{ background: `var(--${c.color})` }}
              >
                {c.initials}
              </div>
              <div className="curator-tile-info">
                <div className="curator-tile-handle">@{c.handle}</div>
                <div className="curator-tile-tier">LVL {c.tier}</div>
              </div>
              <div className="curator-tile-stats">
                <div className="ctile-stat">
                  <span className="ctile-num">{c.dropsLive}</span>
                  <span className="ctile-key">drops</span>
                </div>
                <div className="ctile-stat">
                  <span className="ctile-num">{c.totalVotes}</span>
                  <span className="ctile-key">votes</span>
                </div>
                <div className="ctile-stat">
                  <span className="ctile-num">{c.followers}</span>
                  <span className="ctile-key">followers</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent activity */}
      <section style={{ marginBottom: 40 }}>
        <h2 className="section-heading">live activity</h2>
        <div className="community-feed">
          {activity.map((item, i) => (
            <div key={i} className="community-feed-item">
              <div className="cfeed-dot" />
              <div className="cfeed-body">
                <span className="cfeed-handle">@{item.handle}</span>
                <span className="cfeed-action"> {item.action} </span>
                {item.target && <span className="cfeed-target">{item.target}</span>}
              </div>
              <span className="cfeed-when">{item.when}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Fresh drops */}
      <section>
        <div className="section-head-row">
          <h2 className="section-heading">fresh drops</h2>
          <Link to="/feed" className="text-link">see all →</Link>
        </div>
        <div className="drops-grid">
          {recentDrops.map(drop => (
            <DropCard key={drop.id} drop={drop} />
          ))}
        </div>
      </section>
    </div>
  );
}
