import React from 'react';
import { Clapperboard, Heart, Sparkles } from 'lucide-react';
import '../components/css/Navbar.css';

export default function Navbar({ activeTab, setActiveTab, wishlistCount }) {
  return (
    <header className="navbar">
      <div className="brand" onClick={() => setActiveTab('browse')}>
        <div className="brand-icon-wrapper">
          <Clapperboard className="brand-icon" />
        </div>
        <h1 className="brand-title">
          Movie Discovery <Sparkles className="sparkle-icon" />
        </h1>
      </div>

      <nav className="nav-actions">
        <button
          onClick={() => setActiveTab('browse')}
          className={`nav-button ${activeTab === 'browse' ? 'active' : ''}`}
        >
          Explore
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          className={`nav-button ${activeTab === 'wishlist' ? 'active' : ''}`}
        >
          <Heart className="w-4 h-4 fill-current" />
          Wishlist ({wishlistCount})
        </button>
      </nav>
    </header>
  );
}