import React from 'react';
import { Link } from 'react-router-dom';
import { MOCK_DROPS } from '../data/mockDrops';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { getCurator } from '../data/mockCurators';

export function Landing() {
  const featuredDrops = MOCK_DROPS.filter(d => d.featured).concat(MOCK_DROPS.slice(0, 2)).slice(0, 3);
  const popularProducts = MOCK_PRODUCTS.slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="landing-hero">
        {/* Floating stickers */}
        <svg className="landing-sticker s-1" width="70" height="80" viewBox="0 0 24 28" fill="var(--sun)" aria-hidden="true">
          <path d="M14 0L2 16h8l-4 12L20 10h-8z" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <svg className="landing-sticker s-2" width="60" height="60" viewBox="0 0 24 24" fill="var(--coral)" aria-hidden="true">
          <path d="M12 0l3 9 9 3-9 3-3 9-3-9-9-3 9-3z" stroke="var(--ink)" strokeWidth="1.5" />
        </svg>
        <svg className="landing-sticker s-3" width="55" height="65" viewBox="0 0 24 28" fill="var(--lime)" aria-hidden="true">
          <path d="M14 0L2 16h8l-4 12L20 10h-8z" stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>
        <svg className="landing-sticker s-4" width="50" height="58" viewBox="0 0 24 28" fill="var(--mint)" aria-hidden="true">
          <path d="M12 2c2 4 5 7 5 12a5 5 0 01-10 0c0-2 1-3 2-4-1 4 2 4 3 2 0-3-2-5 0-10z"
                stroke="var(--ink)" strokeWidth="1.5" strokeLinejoin="round" />
        </svg>

        <div className="landing-hero-inner">
          <p className="landing-eyebrow">★ social commerce, reimagined ★</p>
          <h1 className="landing-h1">
            <span className="ws-1">shop.</span>
            <span className="ws-2">earn.</span>
            <span className="ws-3">drop.</span>
          </h1>
          <p className="landing-sub">
            real people curate real products. you shop them, they earn commission.
            no algorithm, no ads, no influencers — just people with good taste.
          </p>

          <div className="landing-cta-row">
            <Link to="/signup" className="cta-btn cta-primary cta-big">
              start shopping →
            </Link>
            <Link to="/signup" className="cta-btn cta-secondary cta-big">
              + make a drop
            </Link>
          </div>

          <div className="landing-trust">
            <div className="trust-stat">
              <span className="trust-num">12k+</span>
              <span className="trust-key">curators earning</span>
            </div>
            <div className="trust-stat">
              <span className="trust-num">$840k</span>
              <span className="trust-key">paid out monthly</span>
            </div>
            <div className="trust-stat">
              <span className="trust-num">16</span>
              <span className="trust-key">categories</span>
            </div>
          </div>
        </div>
      </section>

      {/* THE THREE SIDES */}
      <section className="landing-three" id="how">
        <div className="landing-section-head">
          <p className="landing-eyebrow">★ how it works ★</p>
          <h2 className="landing-h2">three sides. one platform.</h2>
        </div>

        <div className="three-cards">
          <div className="side-card side-shop">
            <div className="side-icon">🛍️</div>
            <h3>shop.</h3>
            <p>find products you'd never see in a feed algorithm. real curators, real taste, individual items — no bundles required.</p>
            <Link to="/signup" className="side-link">browse the shop →</Link>
          </div>
          <div className="side-card side-earn">
            <div className="side-icon">💸</div>
            <h3>earn.</h3>
            <p>build drops, get votes, earn commission on every sale. no follower count needed. compete weekly for the bonus pot.</p>
            <Link to="/signup" className="side-link">start earning →</Link>
          </div>
          <div className="side-card side-drop">
            <div className="side-icon">⚡</div>
            <h3>drop.</h3>
            <p>each week, top 3 drops in every category take the prize. featured drops earn 2x commission. your drops earn forever.</p>
            <Link to="/signup" className="side-link">join the arena →</Link>
          </div>
        </div>
      </section>

      {/* SHOP HIGHLIGHT */}
      <section className="landing-shop-section" id="shop">
        <div className="landing-section-head">
          <p className="landing-eyebrow" style={{ color: 'var(--coral)' }}>★ for shoppers ★</p>
          <h2 className="landing-h2">stop scrolling.<br/><span style={{ color: 'var(--coral)' }}>start finding.</span></h2>
          <p className="landing-section-sub">
            shop curated picks from real people. every product is hand-picked by a curator who actually uses it.
            buy what you want, skip what you don't.
          </p>
        </div>

        <div className="shop-features">
          <div className="shop-feature">
            <div className="shop-feature-num">01</div>
            <h4>real taste, not algorithms</h4>
            <p>curators are real people who know their niche. you get their actual picks, not what an AI thinks you'll click.</p>
          </div>
          <div className="shop-feature">
            <div className="shop-feature-num">02</div>
            <h4>buy individual items</h4>
            <p>like one thing from a drop? grab just that. no bundles, no upsells, no "minimum order".</p>
          </div>
          <div className="shop-feature">
            <div className="shop-feature-num">03</div>
            <h4>support indie curators</h4>
            <p>your purchase pays the curator who introduced you to the product. real money, real artists, real impact.</p>
          </div>
        </div>

        <div className="popular-products-strip">
          <p className="strip-label">trending in the shop right now</p>
          <div className="product-strip">
            {popularProducts.map(p => (
              <div key={p.id} className="strip-product">
                <div className="strip-emoji">{p.emoji}</div>
                <div className="strip-name">{p.name}</div>
                <div className="strip-price">${p.price}</div>
              </div>
            ))}
          </div>
          <Link to="/signup" className="cta-btn cta-primary cta-big" style={{ marginTop: 24 }}>
            shop everything →
          </Link>
        </div>
      </section>

      {/* EARN HIGHLIGHT */}
      <section className="landing-earn-section" id="earn">
        <div className="landing-section-head">
          <p className="landing-eyebrow" style={{ color: 'var(--lime)' }}>★ for curators ★</p>
          <h2 className="landing-h2">no followers?<br/><span style={{ background: 'var(--lime)', padding: '0 12px', borderRadius: 8, color: 'var(--ink)', border: '3px solid var(--ink)', display: 'inline-block', transform: 'rotate(-1.5deg)' }}>no problem.</span></h2>
          <p className="landing-section-sub">
            earn commission from your curation skills, not your follower count.
            the only thing that matters: do your drops slap?
          </p>
        </div>

        <div className="earn-grid">
          <div className="earn-stat-card" style={{ background: 'var(--lime)' }}>
            <span className="earn-num">5–15%</span>
            <span className="earn-key">commission per sale</span>
            <p>every product sold from your drop earns you commission. always.</p>
          </div>
          <div className="earn-stat-card" style={{ background: 'var(--sun)' }}>
            <span className="earn-num">$25–$100</span>
            <span className="earn-key">weekly bonus pot</span>
            <p>top 3 drops in each category split the bonus every week.</p>
          </div>
          <div className="earn-stat-card" style={{ background: 'var(--coral)', color: 'var(--paper)' }}>
            <span className="earn-num">2× rate</span>
            <span className="earn-key">when featured</span>
            <p>get featured drop status? double your commission for the whole week.</p>
          </div>
          <div className="earn-stat-card" style={{ background: 'var(--mint)' }}>
            <span className="earn-num">forever</span>
            <span className="earn-key">passive earning</span>
            <p>old drops keep selling. one drop today = income every month from now on.</p>
          </div>
        </div>
      </section>

      {/* FEATURED DROPS */}
      <section className="landing-drops-section">
        <div className="landing-section-head">
          <p className="landing-eyebrow">★ live in the arena ★</p>
          <h2 className="landing-h2">drops everyone's voting on.</h2>
        </div>

        <div className="landing-drops-preview">
          {featuredDrops.map((drop) => {
            const curator = getCurator(drop.curator_id);
            const products = drop.product_ids.map(id => MOCK_PRODUCTS.find(p => p.id === id)).filter(Boolean);
            return (
              <Link key={drop.id} to="/signup" className="landing-drop-preview">
                <div className="landing-drop-emojis">
                  {products.slice(0, 4).map(p => (
                    <span key={p.id} className="landing-drop-emoji">{p.emoji}</span>
                  ))}
                </div>
                <h4>{drop.name}</h4>
                <p className="landing-drop-meta">@{curator?.handle} · ★ {drop.votes}</p>
              </Link>
            );
          })}
        </div>

        <div style={{ textAlign: 'center' }}>
          <Link to="/signup" className="cta-btn cta-secondary cta-big">
            see all drops →
          </Link>
        </div>
      </section>

      {/* ABOUT */}
      <section className="landing-about" id="about">
        <div className="landing-about-inner">
          <p className="landing-eyebrow">★ what we believe ★</p>
          <h2 className="landing-h2">commerce, but for humans.</h2>
          <div className="about-grid">
            <div>
              <p className="about-big">
                we built plug. because shopping online sucks. algorithms push the same products
                everyone else is buying. influencers sell stuff they don't use. you scroll for
                hours and end up with nothing.
              </p>
            </div>
            <div>
              <p className="about-big">
                plug. flips that. anyone can become "the plug" — the person who hooks you up
                with the good stuff. you earn for great taste, not for follower count. shoppers
                find products through people they trust.
              </p>
            </div>
          </div>
          <div className="about-values">
            <div className="value-tile">
              <h5>no ads.</h5>
              <p>no sponsored drops. ever.</p>
            </div>
            <div className="value-tile">
              <h5>no gatekeeping.</h5>
              <p>anyone can curate. anyone can earn.</p>
            </div>
            <div className="value-tile">
              <h5>no bundles.</h5>
              <p>buy single items. always.</p>
            </div>
            <div className="value-tile">
              <h5>no algorithm.</h5>
              <p>real humans, real votes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* BIG CTA */}
      <section className="landing-final-cta">
        <h2 className="landing-h2-big">ready to become the plug?</h2>
        <p className="final-cta-sub">start curating in 60 seconds. shop in 5.</p>
        <div className="landing-cta-row">
          <Link to="/signup" className="cta-btn cta-primary cta-big">
            sign up free →
          </Link>
          <Link to="/feed" className="cta-btn cta-secondary cta-big">
            peek inside first
          </Link>
        </div>
      </section>
    </>
  );
}
