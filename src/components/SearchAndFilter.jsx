import React from 'react';
import { Search } from 'lucide-react';
import '../components/css/SearchAndFilter.css';

export default function SearchAndFilter({ searchQuery, setSearchQuery, sortBy, setSortBy }) {
  return (
    <div className="controls-bar">
      <div className="search-wrapper">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search movies"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="sort-wrapper">
        <label className="sort-label">Sort By:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="default">Default</option>
          <option value="rating">Top Rated</option>
          <option value="title">Title (A-Z)</option>
        </select>
      </div>
    </div>
  );
}