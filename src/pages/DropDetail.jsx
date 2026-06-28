import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getDrop } from '../data/mockDrops';
import { getCurator } from '../data/mockCurators';
import { MOCK_PRODUCTS } from '../data/mockProducts';
import { getCategory } from '../data/categories';
import { Toast } from '../components/Toast';
import { useToast } from '../hooks/useToast';
import { checkoutProduct } from '../lib/stripe';

export function DropDetail() {
  const { id } = useParams();
  const drop = getDrop(id);
  const { toast, show: showToast } = useToast();
  const [voted, setVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(drop?.votes || 0);

  if (!drop) return <Navigate to="/" replace />;

  const curator = getCurator(drop.curator_id);
  const products = drop.product_ids
    .map(pid => MOCK_PRODUCTS.find(p => p.id === pid))
    .filter(Boolean);
  const total = products.reduce((s, p) => s + p.price, 0);
  const cat = getCategory(drop.category);

  const handleVote = () => {
    if (voted) {
      setVoteCount(c => c - 1);
      setVoted(false);
      showToast('vote pulled');
    } else {
      setVoteCount(c => c + 1);
      setVoted(true);
      showToast('voted!');
    }
  };

  const handleBuy = async (product) => {
    try {
      // In production this redirects to Stripe checkout
      // For now, just show toast (no real backend)
      showToast(`buying ${product.name}…`, true);
      // await checkoutProduct({ productId: product.id, dropId: drop.id });
      setTimeout(() => {
        showToast('connect stripe to checkout', true);
      }, 1000);
    } catch (e) {
      showToast('checkout failed');
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: drop.name, url });
      } else {
        await navigator.clipboard.writeText(url);
        showToast('link copied!');
      }
    } catch (e) {
      // user cancelled
    }
  };

  return (
    <div className="page-container container-wide">
      <Link to="/" className="back-link">← back to arena</Link>

      {/* DROP HERO */}
      <div className="drop-hero">
        <div className="drop-hero-left">
          <div className="drop-preview-grid drop-preview-lg">
            {products.slice(0, 4).map((p, i) => (
              <div key={p.id} className={`preview-tile preview-${i}`}>
                <span className="preview-emoji">{p.emoji}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="drop-hero-right">
          <div className="drop-cat-tag" style={{ background: cat?.bg }}>
            {drop.category}
          </div>
          <h1 className="drop-hero-title">{drop.name}</h1>
          <p className="drop-hero-pitch">{drop.pitch}</p>

          <Link to={`/curator/${curator?.id}`} className="curator-card">
            <div className="curator-avatar">{curator?.initials}</div>
            <div>
              <div className="curator-handle">@{curator?.handle}</div>
              <div className="curator-tier">LVL {curator?.tier} · {curator?.followers} followers</div>
            </div>
          </Link>

          <div className="drop-vibes">
            {drop.vibes.map(v => (
              <span key={v} className="vibe-tag">{v}</span>
            ))}
          </div>

          <div className="drop-actions">
            <button
              className={`vote-btn ${voted ? 'voted' : ''}`}
              onClick={handleVote}
            >
              ★ {voteCount} {voted ? 'voted' : 'vote'}
            </button>
            <button className="share-btn" onClick={handleShare}>
              share
            </button>
          </div>
        </div>
      </div>

      {/* PRODUCTS LIST */}
      <section className="drop-products-section">
        <div className="section-head-row">
          <h2 className="section-heading">{products.length} products · ${total} total</h2>
          <span className="section-sub">grab any item solo — no need to buy the bundle</span>
        </div>

        <div className="product-list">
          {products.map(product => (
            <div key={product.id} className="product-row">
              <div className="product-row-thumb" style={{ background: getCategory(product.cat)?.bg }}>
                <span className="product-row-emoji">{product.emoji}</span>
              </div>
              <div className="product-row-info">
                <div className="product-row-name">{product.name}</div>
                <div className="product-row-cat">{product.cat}</div>
              </div>
              <div className="product-row-price">${product.price}</div>
              <button
                className="buy-btn"
                onClick={() => handleBuy(product)}
              >
                buy →
              </button>
            </div>
          ))}
        </div>
      </section>

      <Toast text={toast.text} visible={toast.visible} />
    </div>
  );
}
