import React from 'react';
import { Heart, Star } from 'lucide-react';
import '../components/css/MovieCard.css';

export default function MovieCard({ movie, isWishlisted, onToggleWishlist }) {
  return (
    <div className="movie-card">
      <div className="poster-container">
        <img src={movie.posterUrl} alt={movie.title} className="movie-poster" />
        <button
          onClick={() => onToggleWishlist(movie)}
          className="wishlist-btn"
        >
          <Heart className={`w-5 h-5 ${isWishlisted ? 'active' : ''}`} />
        </button>
        <div className="rating-badge">
          <Star className="w-3.5 h-3.5 fill-current" />
          {movie.rating}
        </div>
      </div>

      <div className="movie-details">
        <h3 className="movie-title">{movie.title}</h3>
        <p className="movie-date">{movie.releaseDate}</p>
      </div>
    </div>
  );
}