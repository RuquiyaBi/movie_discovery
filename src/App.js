import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Loader2, Sparkles } from 'lucide-react';
import Navbar from './components/Navbar';
import SearchAndFilter from './components/SearchAndFilter';
import MovieCard from './components/MovieCard';
import '../src/App.css';

const API_BASE = 'http://localhost:5000/api';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [activeTab, setActiveTab] = useState('browse');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const res = await axios.get(`${API_BASE}/wishlist`);
      setWishlist(res.data);
    } catch (err) {
      console.error('Wishlist load error:', err);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab === 'browse') fetchMovies();
    }, 350);

    return () => clearTimeout(timer);
  }, [searchQuery, activeTab]);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `${API_BASE}/movies/trending`;
      if (searchQuery.trim()) {
        url = `${API_BASE}/movies/search?q=${encodeURIComponent(searchQuery)}`;
      }
      const res = await axios.get(url);
      setMovies(res.data.data.results || []);
    } catch (err) {
      setError('Failed to load movies. Ensure Express server is active on port 5000.');
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = async (movie) => {
    try {
      await axios.post(`${API_BASE}/wishlist`, movie);
      fetchWishlist();
    } catch (err) {
      console.error('Wishlist toggle error:', err);
    }
  };

  const isWishlisted = (id) => wishlist.some((item) => (item.movieId || item.id) === id);

  const getSortedMovies = (list) => {
    if (sortBy === 'rating') return [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === 'title') return [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  };

  const displayedMovies = getSortedMovies(activeTab === 'browse' ? movies : wishlist);

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        wishlistCount={wishlist.length}
      />

      <main className="main-content">
        {activeTab === 'browse' && (
          <SearchAndFilter
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        )}

        {loading && (
          <div className="state-container">
            <Loader2 className="spinner" />
          </div>
        )}

        {error && <div className="error-banner">{error}</div>}

        {!loading && displayedMovies.length === 0 && (
          <div className="state-container">
            <Sparkles className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-lg">No movies found.</p>
          </div>
        )}

        {!loading && (
          <div className="movies-grid">
            {displayedMovies.map((movie) => {
              const id = movie.movieId || movie.id;
              return (
                <MovieCard
                  key={id}
                  movie={movie}
                  isWishlisted={isWishlisted(id)}
                  onToggleWishlist={toggleWishlist}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}