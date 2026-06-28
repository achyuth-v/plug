import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MarketingLayout } from './components/MarketingLayout';
import { AppLayout } from './components/AppLayout';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Feed } from './pages/Feed';
import { Shop } from './pages/Shop';
import { Community } from './pages/Community';
import { Create } from './pages/Create';
import { DropDetail } from './pages/DropDetail';
import { Curator } from './pages/Curator';
import { Dashboard } from './pages/Dashboard';
import { Leaderboard } from './pages/Leaderboard';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC ROUTES — Marketing site */}
          <Route element={<MarketingLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </Route>

          {/* AUTHENTICATED ROUTES — App with sidebar */}
          <Route element={<AppLayout />}>
            <Route path="/feed" element={<Feed />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/create" element={<Create />} />
            <Route path="/community" element={<Community />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/drop/:id" element={<DropDetail />} />
            <Route path="/curator/:id" element={<Curator />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
