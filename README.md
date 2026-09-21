# movie_discovery
A full-stack Bollywood movie discovery app featuring debounced search, genre filters, persistent wishlists, and a Node.js BFF backend abstraction with server-side caching.
# 🎬 Movie Explorer App

A modern, full-stack movie discovery web application built with **React.js**, **Node.js/Express**, and **Tailwind CSS**, powered by **The Movie Database (TMDb) API**. Features a dark-mode glassmorphic interface, real-time search, dynamic sorting, wishlist tracking, and a resilient offline fallback mechanism.

---

## 🗺️ How It All Fits Together

```text
               +-------------------------------------------------+
               |                🌐 USER BROWSER                 |
               |                                                 |
               |   React.js SPA + Tailwind CSS Dark Mode Design  |
               |   (Search Bar, Sort Controls, Movie Cards)      |
               +-----------------------+-------------------------+
                                       |
                         User types query / Clicks Wishlist
                                       |
                                       v
               +-------------------------------------------------+
               |              ⚙️ NODE.JS BACKEND                 |
               |                                                 |
               |  Express API Proxy (Hides Secrets & Handles logic)|
               +-----------------------+-------------------------+
                                       |
                        Does TMDb API Key exist & working?
                                       |
                       +---------------+---------------+
                       |                               |
                   YES |                               | NO (Fail-Safe Triggered)
                       v                               v
         +---------------------------+   +---------------------------+
         |    🎬 TMDb EXTERNAL API   |   |   📦 OFFLINE FALLBACK     |
         |                           |   |                           |
         |  Fetches latest trending  |   |  Serves 20 pre-built      |
         |  movies & poster image    |   |  popular movies so the    |
         |  urls directly from TMDb  |   |  app NEVER crashes        |
         +-------------+-------------+   +-------------+-------------+
                       |                               |
                       +---------------+---------------+
                                       |
                                       v
               +-------------------------------------------------+
               |             ✨ BEAUTIFUL FRONTEND               |
               |                                                 |
               |  Renders smooth movie grid with rating badges,   |
               |  glassmorphic controls, and active wishlist state|
               +-------------------------------------------------+
               Local Setup Instructions
Prerequisites
Node.js (v16 or higher)

npm or yarn

1. Clone the Repository
Bash
git clone [https://github.com/your-username/movie-explorer.git](https://github.com/your-username/movie-explorer.git)
cd movie-explorer
2. Backend Setup
Bash
# Navigate to backend directory (if separated) or root
cd backend
npm install

# Create environment variable file
echo "TMDB_API_KEY=your_tmdb_api_key_here" > .env
echo "PORT=5000" >> .env

# Start backend server
npm start
3. Frontend Setup
Bash
# In a new terminal window, navigate to frontend directory
cd frontend
npm install

# Start React development server
npm start
4. Open in Browser
Visit http://localhost:3000 to interact with the application.

---

## ⚠️ Limitations & Potential Drawbacks

While the current architecture provides a fast, resilient, and secure experience, there are trade-offs inherent to these design choices:

1. **In-Memory Wishlist Persistence:**
   - **Issue:** Wishlist items are currently stored in-memory on the Node.js server.
   - **Impact:** Restarting the server clears saved items, and user data cannot be shared across multiple backend instances without a persistent database (e.g., MongoDB, PostgreSQL, or Redis).

2. **Client-Side Sorting Performance:**
   - **Issue:** Sorting (by rating or release date) is performed entirely on the client side on the currently loaded dataset.
   - **Impact:** While fast for smaller datasets, sorting thousands of items client-side can cause main-thread lag compared to database-level indexing or server-side pagination sorting.

3. **Static Fallback Dataset:**
   - **Issue:** The offline resilience layer relies on a pre-bundled fallback dataset.
   - **Impact:** If the external API fails for an extended period, users will see static data that won't reflect real-time updates or newly released movies.

4. **Single-Node Rate Limits:**
   - **Issue:** All TMDb API requests route through a single Node.js backend proxy.
   - **Impact:** Heavy traffic across multiple simultaneous clients could exhaust the proxy server’s API key quota quicker than direct client calls (mitigated partially by server caching).