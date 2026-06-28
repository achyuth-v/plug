import React from 'react';
import { Link } from 'react-router-dom';
import { CURRENT_USER } from '../data/mockCurators';
import { getDropsByCurator } from '../data/mockDrops';
import { DropCard } from '../components/DropCard';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { useAuth } from '../context/AuthContext';

export function Dashboard() {
  const { user: authUser } = useAuth();
  const user = authUser || CURRENT_USER;
  const myDrops = getDropsByCurator(user.id);
  const totalVotes = myDrops.reduce((s, d) => s + d.votes, 0);
  const totalValue = myDrops.reduce((s, d) => {
    return s + d.product_ids.reduce((ps, id) => {
      const p = MOCK_PRODUCTS.find(x => x.id === id);
      return ps + (p?.price || 0);
    }, 0);
  }, 0);

  // Mock earnings (10% commission * mock sales)
  const lifetimeEarnings = 142.40;
  const thisMonthEarnings = 38.20;

  // Mock recent activity
  const activity = [
    { type: 'sale', text: 'wireless earbuds sold from "study mode"', amount: '+$2.40', when: '2h ago' },
    { type: 'vote', text: 'new vote on "study mode"', when: '4h ago' },
    { type: 'follow', text: '@mira followed you', when: '1d ago' },
    { type: 'sale', text: 'foam roller sold from "study mode"', amount: '+$2.50', when: '2d ago' },
    { type: 'vote', text: '3 new votes', when: '3d ago' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <p className="hero-eyebrow">★ DASHBOARD ★</p>
        <h1 className="page-title">welcome back, @{user.handle}.</h1>
        <p className="page-sub">here's how your drops are doing this week.</p>
      </div>

      {/* Stat cards */}
      <div className="dash-stats">
        <div className="dash-stat" style={{ '--tile-bg': 'var(--lime)' }}>
          <span className="dash-stat-num">{myDrops.length}</span>
          <span className="dash-stat-key">drops live</span>
        </div>
        <div className="dash-stat" style={{ '--tile-bg': 'var(--sun)' }}>
          <span className="dash-stat-num">${lifetimeEarnings.toFixed(2)}</span>
          <span className="dash-stat-key">lifetime earned</span>
        </div>
        <div className="dash-stat" style={{ '--tile-bg': 'var(--coral)', color: 'var(--paper)' }}>
          <span className="dash-stat-num">${thisMonthEarnings.toFixed(2)}</span>
          <span className="dash-stat-key">this month</span>
        </div>
        <div className="dash-stat" style={{ '--tile-bg': 'var(--mint)' }}>
          <span className="dash-stat-num">{totalVotes}</span>
          <span className="dash-stat-key">votes received</span>
        </div>
      </div>

      {/* Activity feed */}
      <div className="dash-grid">
        <section>
          <h2 className="section-heading">your drops</h2>
          {myDrops.length === 0 ? (
            <div className="empty-state">
              <p>no drops yet — make your first one!</p>
              <Link to="/create" className="cta-btn cta-primary">+ make a drop</Link>
            </div>
          ) : (
            <>
              <div className="drops-grid">
                {myDrops.map(drop => <DropCard key={drop.id} drop={drop} />)}
              </div>
              <Link to="/create" className="cta-btn cta-primary" style={{ marginTop: 20 }}>+ make another drop</Link>
            </>
          )}
        </section>

        <aside>
          <h2 className="section-heading">recent activity</h2>
          <div className="activity-list">
            {activity.map((item, i) => (
              <div key={i} className={`activity-item activity-${item.type}`}>
                <div className="activity-icon">
                  {item.type === 'sale' && '$'}
                  {item.type === 'vote' && '★'}
                  {item.type === 'follow' && '+'}
                </div>
                <div className="activity-body">
                  <div className="activity-text">{item.text}</div>
                  <div className="activity-when">{item.when}</div>
                </div>
                {item.amount && <div className="activity-amount">{item.amount}</div>}
              </div>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
