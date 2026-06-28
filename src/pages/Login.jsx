import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Toast } from '../components/Toast';
import { useToast } from '../hooks/useToast';

export function Login() {
  const { signIn, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast, show: showToast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) return <Navigate to="/feed" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('fill it all in');
      return;
    }
    signIn(email);
    showToast('welcome back!', true);
    setTimeout(() => navigate('/feed'), 800);
  };

  const handleGoogle = () => {
    // Mock — wire up Firebase signInWithPopup in src/lib/firebase.js
    signIn('demo@plug.app');
    showToast('signed in with google', true);
    setTimeout(() => navigate('/feed'), 800);
  };

  return (
    <div className="auth-page">
      <Link to="/" className="auth-back">← home</Link>

      <div className="auth-card">
        <p className="hero-eyebrow">★ welcome back ★</p>
        <h1 className="auth-title">sign in.</h1>
        <p className="auth-sub">curators waiting. drops dropping.</p>

        <button className="auth-btn auth-google" onClick={handleGoogle}>
          continue with google
        </button>

        <div className="auth-divider"><span>or</span></div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn auth-primary">
            sign in →
          </button>
        </form>

        <p className="auth-foot">
          new here? <Link to="/signup">sign up</Link>
        </p>
      </div>

      <Toast text={toast.text} visible={toast.visible} />
    </div>
  );
}
