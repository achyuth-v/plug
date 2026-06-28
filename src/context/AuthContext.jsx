import React, { createContext, useContext, useState, useEffect } from 'react';
import { CURRENT_USER } from '../data/mockCurators';

const AuthContext = createContext(null);

const STORAGE_KEY = 'plug_auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const signIn = (email) => {
    // Mock — in production, call Firebase signInWithEmailAndPassword
    const newUser = { ...CURRENT_USER, email };
    setUser(newUser);
    return newUser;
  };

  const signUp = (email, handle) => {
    // Mock — in production, call Firebase createUserWithEmailAndPassword
    const newUser = { ...CURRENT_USER, email, handle: handle || CURRENT_USER.handle };
    setUser(newUser);
    return newUser;
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
