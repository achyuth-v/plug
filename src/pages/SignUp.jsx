import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Toast } from '../components/Toast';
import { useToast } from '../hooks/useToast';

export function SignUp() {
  const { signUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast, show: showToast } = useToast();
  const [handle, setHandle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (isAuthenticated) return <Navigate to="/feed" replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !handle) {
      showToast('fill it all in');
      return;
    }
    if (handle.length < 3) {
      showToast('handle too short');
      return;
    }
    signUp(email, handle);
    showToast('welcome to the plug!', true);
    setTimeout(() => navigate('/feed'), 800);
  };

  const handleGoogle = () => {
    signUp('demo@plug.app', 'demo');
    showToast('signed up with google', true);
    setTimeout(() => navigate('/feed'), 800);
  };

  return (
    <div className="auth-page">
      <Link to="/" className="auth-back">← home</Link>

      <div className="auth-card">
        <p className="hero-eyebrow">★ become the plug ★</p>
        <h1 className="auth-title">sign up.</h1>
        <p className="auth-sub">free forever. earn from day one.</p>

        <button className="auth-btn auth-google" onClick={handleGoogle}>
          continue with google
        </button>

        <div className="auth-divider"><span>or</span></div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="handle (e.g. jay.k)"
            value={handle}
            onChange={(e) => setHandle(e.target.value.replace(/\s/g, '').toLowerCase())}
            required
            maxLength={20}
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="password (8+ chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={8}
          />
          <button type="submit" className="auth-btn auth-primary">
            create account →
          </button>
        </form>

        <p className="auth-foot">
          got an account? <Link to="/login">sign in</Link>
        </p>

        <p className="auth-fine">
          by signing up you agree to be cool. we'll never sell your data.
        </p>
      </div>

      <Toast text={toast.text} visible={toast.visible} />
    </div>
  );
}
