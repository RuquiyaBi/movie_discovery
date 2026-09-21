// const express = require('express');
// const cors = require('cors');
// const axios = require('axios');
// require('dotenv').config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Fallback dataset to render when TMDb fails or key is invalid
// const FALLBACK_BOLLYWOOD_MOVIES = [
//   {
//     movieId: '1',
//     title: 'Pathaan',
//     releaseDate: '2023-01-25',
//     rating: 6.5,
//     posterUrl: 'https://m.media-amazon.com/images/M/MV5BZjA3YTI1ZTItZGY5Ni00MzQyLTg2NDYtMzc3NGY5NzEwYmQxXkEyXkFqcGc@._V1_.jpg'
//   },
//   {
//     movieId: '2',
//     title: 'Jawan',
//     releaseDate: '2023-09-07',
//     rating: 7.0,
//     posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq2ZvNtRK9rudqmusZu0DY7RsgEZl4lPxmhl1Ifq1TFw&s=10'
//   },
//   {
//     movieId: '3',
//     title: '3 Idiots',
//     releaseDate: '2009-12-25',
//     rating: 8.4,
//     posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKDFgeLRkSPCvPU6v3H7dAS0F42QMVXgzheOxTGHvo7w&s=10'
//   },
//   {
//     movieId: '4',
//     title: 'Dangal',
//     releaseDate: '2016-12-23',
//     rating: 8.3,
//     posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD95WTECjD-culSRE59InBGqkzG9-nopa73Y1q9Mvdbg&s=10'
//   },
//   {
//     movieId: '5',
//     title: 'RRR',
//     releaseDate: '2022-03-24',
//     rating: 7.8,
//     posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlCaeVP2aQYzrnOdwdVvq8tW8qhttTulAnGuDl2XhA6A&s=10'
//   },
//   {
//     movieId: '6',
//     title: 'Brahmastra',
//     releaseDate: '2022-09-09',
//     rating: 5.6,
//     posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOzbUh2rhl6PTbYnddIzYBT-IojDBKsKOfAH8F9P4Eqw&s=10'
//   }
// ];

// // Helper to format TMDb results safely
// const formatTmdbMovie = (item) => ({
//   movieId: item.id.toString(),
//   title: item.title || item.original_title,
//   releaseDate: item.release_date || 'N/A',
//   rating: item.vote_average ? item.vote_average.toFixed(1) : '7.0',
//   posterUrl: item.poster_path 
//     ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
//     : 'https://via.placeholder.com/300x450?text=No+Poster'
// });

// // GET: Trending Movies (with Fail-Safe Fallback)
// app.get('/api/movies/trending', async (req, res) => {
//   const apiKey = process.env.TMDB_API_KEY;

//   // 1. Check if API Key is missing or default
//   if (!apiKey || apiKey === 'your_tmdb_api_key_here') {
//     console.warn('⚠️ TMDb API key missing in .env. Serving fallback mock data.');
//     return res.json({ data: { results: FALLBACK_BOLLYWOOD_MOVIES } });
//   }

//   // 2. Try fetching from TMDb API
//   try {
//     const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
//       params: { api_key: apiKey },
//       timeout: 2500 // 2.5 second timeout
//     });

//     const formattedResults = response.data.results.map(formatTmdbMovie);
//     return res.json({ data: { results: formattedResults } });
//   } catch (err) {
//     // 3. Fallback on network failure, invalid key, or timeout
//     console.warn('⚠️ TMDb API request failed:', err.message);
//     console.warn('🔄 Serving fallback mock dataset to prevent UI downtime.');
//     return res.json({ data: { results: FALLBACK_BOLLYWOOD_MOVIES } });
//   }
// });

// // GET: Search Movies (with Fail-Safe Fallback)
// app.get('/api/movies/search', async (req, res) => {
//   const query = req.query.q || '';
//   const apiKey = process.env.TMDB_API_KEY;

//   if (!apiKey || apiKey === 'your_tmdb_api_key_here') {
//     const filtered = FALLBACK_BOLLYWOOD_MOVIES.filter(m =>
//       m.title.toLowerCase().includes(query.toLowerCase())
//     );
//     return res.json({ data: { results: filtered } });
//   }

//   try {
//     const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
//       params: { api_key: apiKey, query },
//       timeout: 2500
//     });

//     const formattedResults = response.data.results.map(formatTmdbMovie);
//     return res.json({ data: { results: formattedResults } });
//   } catch (err) {
//     console.warn('⚠️ Search API failed. Filtering fallback dataset.');
//     const filtered = FALLBACK_BOLLYWOOD_MOVIES.filter(m =>
//       m.title.toLowerCase().includes(query.toLowerCase())
//     );
//     return res.json({ data: { results: filtered } });
//   }
// });

// // In-Memory Wishlist Store
// let wishlistStore = [];

// app.get('/api/wishlist', (req, res) => {
//   res.json(wishlistStore);
// });

// app.post('/api/wishlist', (req, res) => {
//   const movie = req.body;
//   const id = movie.movieId || movie.id;
//   const existsIndex = wishlistStore.findIndex(item => (item.movieId || item.id) === id);

//   if (existsIndex > -1) {
//     wishlistStore.splice(existsIndex, 1);
//   } else {
//     wishlistStore.push(movie);
//   }
//   res.json(wishlistStore);
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Backend Active on Port ${PORT}`));
const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Expanded Fallback Dataset (20 Movies)
const FALLBACK_BOLLYWOOD_MOVIES = [
  {
    movieId: '1',
    title: 'Pathaan',
    releaseDate: '2023-01-25',
    rating: 6.5,
    posterUrl: 'https://m.media-amazon.com/images/M/MV5BZjA3YTI1ZTItZGY5Ni00MzQyLTg2NDYtMzc3NGY5NzEwYmQxXkEyXkFqcGc@._V1_.jpg'
  },
  {
    movieId: '2',
    title: 'Jawan',
    releaseDate: '2023-09-07',
    rating: 7.0,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQq2ZvNtRK9rudqmusZu0DY7RsgEZl4lPxmhl1Ifq1TFw&s=10'
  },
  {
    movieId: '3',
    title: '3 Idiots',
    releaseDate: '2009-12-25',
    rating: 8.4,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKDFgeLRkSPCvPU6v3H7dAS0F42QMVXgzheOxTGHvo7w&s=10'
  },
  {
    movieId: '4',
    title: 'Dangal',
    releaseDate: '2016-12-23',
    rating: 8.3,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTD95WTECjD-culSRE59InBGqkzG9-nopa73Y1q9Mvdbg&s=10'
  },
  {
    movieId: '5',
    title: 'RRR',
    releaseDate: '2022-03-24',
    rating: 7.8,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlCaeVP2aQYzrnOdwdVvq8tW8qhttTulAnGuDl2XhA6A&s=10'
  },
  {
    movieId: '6',
    title: 'Brahmastra',
    releaseDate: '2022-09-09',
    rating: 5.6,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOzbUh2rhl6PTbYnddIzYBT-IojDBKsKOfAH8F9P4Eqw&s=10'
  },
  {
    movieId: '7',
    title: 'Shershaah',
    releaseDate: '2021-08-12',
    rating: 8.4,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWaniA7E61B5b8teopiR4iLQUfVWLiM925kn34rC1tFA&s=10'
  },
  {
    movieId: '8',
    title: 'Stree 2',
    releaseDate: '2024-08-15',
    rating: 7.6,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOs_CdmW7U5DwxjxDWXLYjtQTtV5-Bw2JOB0NgI1SyQg&s=10'
  },
  {
    movieId: '9',
    title: '12th Fail',
    releaseDate: '2023-10-27',
    rating: 8.9,
    posterUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhIVFRUXGBUXGBcVFxYYGBgYFRcYFxgXFxcYHSggGBolGxgXITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGy0mHyYtLS0tLS0tLS0tLTAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIARMAtwMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAECBAUGB//EAD4QAAEDAgQDBgQEBQIGAwAAAAEAAhEDIQQSMUEFUWEGEyJxgfCRobHBMkLR8QcUI2LhktIVM1NUgrIWUnL/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQMCBAUG/8QALREAAgICAQMCBQMFAQAAAAAAAAECEQMhEgQxQRNRBWFxkbEigfAjMkJS4RT/2gAMAwEAAhEDEQA/AOaGqImhSIXzZ9ARhThRCdI0RTFPKcoEMCnaFEmNVJslA9BmlNKgw2TwsgTBSKYqJP3QgJhIGd1FpSlGwGeVBpUnFRlNDCSonRJosnP7JgNKcfRMf1Th3RA6EXJ2+7IbwiUzshjIvEp0MpIASkSnAUshGq0SIAJPF0WFB8eqyADNJspAGBvdSgab8viEiFoBGnI6qLSfsplys8KwDq9anRaQC90AmYG946JA3WwLWR81A2Xq3COwOHpw6qTWcP8A7eFg8mDX1JWx/wDGcH/2tH/QEuJzvq4rsjxMvtZMCByXonYfszh6tN1atTzu717WhxOUNbA/CLHfWV2lDhdBghlGk0cmsaPoE+IpdUk6o8Gkc1GV7ZxPsrhKwIdRY0n89MBjh1lov6yF5Nx/g7sLWdSdeILXD8zDoenIjmCnRvHnU9GaTaUwKdrSdtifgmlFF7JZlEndTaR6qLm9EjViB9+icapmqYSGRKQMKWWxKYx5pgRefd0lKszTT6JIoLCMF/Pqp++iMKMdP0UO79/D7oZJEAxMY9forDmKD2WKmbK0dPoFEAfsphuyK1vv7qgrAQtfstWbTxdGpUdla1xLnO0/A77x8VnZEngxYn990IzJWqPVeH9s6VfEsw9Fj3A5pqO8I8LS7wtNzpvC6gLyH+H9MjHUieVS1v8ApuXrwWmebmgoypHj9LtbXw9HuKGRkOqEvjM4lzy62bwiJjQ6KtT7YY0OzfzDjEatYWnzGX6LPxTRmd/+nX9Suy7HdiSS2vimw0QWUjqdwag2H9vx5FHXJY4K2jv8BWL6VN7m5XOYxxbyLmgkehXG9uDhBiqZxYeW9yY7vWc9pjaM67LG4tlJjqlRwa1okk+7novGO0XFTi67qrpa0w1o1LWNmNNTcnzOqaObBBylZ1fHeFcMwwY6o2tNZriyHE6Bpve34gsTtvwSlhu47lrv6jHOdJLrtyRE6alaH8Sx/Twev/Kqf+tFbPbTtJXwgw4o5Iewl2ZpP4cgEXHNMpBy/S07u/Jy/a/g1LDMwxpAg1WOLpcTcCmbcvxFcyu4/ie4vbg3HUsquPmRSJt5lcOB8ll9zpwNuCsipwlk6p8uqC5Euso25qZb75qJCKE2OElEafLmmTEarqZn2Pf6oJJnkLT8LkdFcrm4I5G311PzQ20C7p6T+3P0WDIN4UXBHe2foPSyhUY6J6+wlxNJgWN6KBFypjW8KTmeaSBgj9EgbKZanA1g8uXNFhRu9g5/naV9qm/9jl6yF5F2SxbKWKp1KhysbnJdf8zHDQdSF6I3tXg/+u3/AEv/ANq2mcHUxbnpeDG7G9m6cDE1Ie9znOYCLMhxE9XW1225rsXG2k9Oa5PgHabCUqFOnUrta8ZpBDpu9xG3VaZ7V4P/ALhv+l/+1Mnkx5LuSf2Ob7R8C4hi3y7u2sE5KYqGG7SbeJ0b9TC5DjnA6uFLW1cnjDiMpzG0TNra/VdR/EHtUDTpjCYkgkuD8ktMQIuRIvOi4DCEvLiSSTBJcZJN9STfUp/M9npegyvpX1DaUfat96/ncNXc6LkmATEkwDtfTRU3YsuIzEkDmSbbxyVyqQbm2vv4+X65jhcoPW+EdNiy8ucbfg03kuN3Ei+pmL7ck2VQoOzAe77/AKooEwss8jJjeObg/DoUez781GOSMWnUT8OfVIU/oizIGr1+ex+yE4a/ONPf6KxWka6+vL6KqSeSaYmNGyZMSI96J0xG+PevJMQQJEzytynb1VapiFE4nn9vf7Lni2macCyRB+Cg8SL+iBUrnn9/rp/hR76fT3ZbctCUApbGqhN91Fz1AvU+5viyyG+/qeqE8xcmPX0WXVxTzaY8kMzEwb7rax+57eL4K9PJL7Gu2oC0llzcXsJ1VDD4x2dpcbTHSD+8pYCrBI9VXrC55beXJbS3R09L0mLHlyYWr1ab70wmMoFjyPUeSk7HPIiYRHO7xgG4H0/VVaboMprfc6sLjmhxyRTlDX/f3E8uPiM33KtcNN3C1wNfPqmxdQFttJCbAGJPki9EM2Z5einJqvFfRgKgJJ1N01SiW6hXzWG8D0VStXBEX16ITsXS9ZmySio46j5f80TwL9Y11HpqrtNpjn75LMw74cCVosxUBw6QJjYHmiR53xfBwz8l/kHM2AO3mnZa/wB+R6+Srsrc/v0+/vUqDauu3oAkzy+AbFfMWP7bKrni+h/Wft9VKvV5qr3icROIRrZ5pIbX2N/gktmaLzqg3uVW7zxa+zdBqOM3US5uiwo0UsuGpdDdVt70Vdr5sU4MTKONDLAr+ZUjX0EKm91hGqds2kWS4ILYeBrAuo1HyIUX1JFhZKo0CE18y0c0+am3dAmuRK7gboSd50utVs+i6mfHJizrt2f0YSg+CliAJkISm0TslXk5uryPperWRdpdxs1oRcG8AmeSGxqk8Roj5C6v4jglilDHuyNTWee6Xdxr8k+aSDsNkSrBE+SZxL4lmWNQi6pV8wTDfT1R6tXkhh1lFGjjnknkdzdsmKg+/qkH3CGLHVQrTuijBOs/nr0QqT73QahiyEXQqKOjLZbrwNLpIDb3Tp1RnuGaTN5Q31EapiDFo6WQsRSygHfdZXfY+PsDFWEZhJTUGZrouMaRER5hDauh8XVgajoMIzKznDLCqsMiZuisrmxA80OIk9hAYSBzXJUsM/NUbmFpU8Vh4dEZdfVYvdM2otq0V82qVQadUOo0AxKI1xIgXW68nTLrMksSwvsvuSLbTPoisqxP0VGqHkqVDM+QYnmUOFo55ZXKVytv5lim4zJRagzeSgGOgjlASY8huoEc1hgkiTXNFh6oVaqJsUNhe7MbIFN1zmW1AxKRYzz9kbvYsBdCoU9MxgHRKoQ11jKGk9Am+4VrDItqiOAEiLoeKqEQ4kR0Tg27wgxf1WHfcoqWiJPg8QFtCo0HCL6qr/MTabK1SqB4y5r+S24tLZlSTeibv7RM9Ek7rNylw9EywhOWzK70k2RGVdnzCq8NoF5MGFu4XgzyD+Fy6804QdM5sSnPaC4LhcjXwnRU+IYd1K4JLVXxleo0w1xAFoB0hVDj33D3Eg81DHiyN8rTXsdM541GguHaHOuYBVjM5uYZS4bKOHFN9gMp5oQ4oaZLB4vmqtOTaS/ZkE0lsjhsW4GRa6sYjGOqRncs99QG8EJ6VCQTey28cb5MSySrii2+n1nqptxQokbyqZLhABB+ytVMM94BMSOXJYaX+XY0pe3ctVOJh4kMhVquIIFhqqVFkklzoAVovpPbDXwRzR6cY6SNKcn3CUMVe+6niTeNlnBpzxCljeIDQDoj07kqDnS2aWCrZgW0/wAusrOe45iTr8FZ4Rwys6CDlB33VnivD30gMxDgdHbykpwjkcU0JxnKN0VXYnQHQaeaGK8u0idTyCBnA1F1Kk5rzH0N/wDKrxS3Ri5XVmmO7gy6yvcN40ym3LlzAG0rncYAxxANgnw+Jpj8Tj6CVJ9PGcd2zXrzjLWjdxxouLqrWwSIjaecLDw9XI4WUHY9g5kKtVxjTYB3yVMeBxXHdE5Zk9vudFxzE0nZBR5X80lgUsTTIi4PVJEMXBcdillUndoPh6waPA6T8ESvVdE946eUlYQsUejjXNM6jkV0Sw7tHEsz7MvUsW4G/wAVOuxroJk+S0DRp16Wem2HN/E1Yv8AM2jaVKG9pUyzm493aJsF/wCmHECxuLK7hsMMwFSGl14JjN5O0J6KjVxLSP6bXZjrA/TVUsRga4aHOpVA3YlroVOHLTdfkk8slurOqxeFpNpktcB/bzVrhfZ59elmabkS1o5Ln+FcPfXY91TMC0ANJtPvmu17PMxXdUxTORoaJdb1lef1DlijUZbvdnf08vU21qjneK9narKZqNBIBMiIIjWyzeFVKj5yZpEbE67L0Ti/Du+f4a4EASC7w31Ouq4TiHFG0c7KIEuLhYEOi7Q4kjXeJsVTo8ks0Gnti6msTTQsZw8v8TiG2MjMLxqY12PTqs/E4VrCQZBmLXOsXA68l2XZjsBUxDBUxVZ9MOvkaP6kHTO46eUHVa2K/hdhWAkVaxtaSPQyAqvqcOPTfb2OXjlk78/M82wmIcJB+KAT/U5rQxfDu6q9wagLg4if7TcE/FQqYTu3DckiOp+ytyjdryisW5Lfh7NvA8WOU/hbA8OYxKw+LcWqVXgHawjSd/fRdH/wSlTpmriXA2068gOazeA1MIahD8zQXS0QDvYE6C3VcuD07c4xs6M8mkoylX5MhnC6rhI+qBVwdSmfFbyXonE8FSY19UV4a1sluQOPRstdAJ09V55iMS+s+GtjkAunDkyT7pJHJl9Jf222TZBEuzHrIH1T16lIthjS09TMo7Oz1cpq3Zuq0S4gLXqYr/uM/wBX/UFw2mC7xRCsYttEG5vyaFmP8NgZO/8AhFwOFLzCco75N6HDLrilsHXpNnwk+qZb7ODtsCnU/wD1QXkTwW7oJxXhDPy2XM4qgWFdhjHX1C5/iom6x0mSWkx9TjjVoFwfiLqTwdtCOYOq0BQpHENNsj/FB0B3BWNw3DGrVawbkfDddE3gVQBzSASHFtujo35iPir5+MXd0yGDlLxo9H4FwjCNAcHUh5ZfmVqV8Vh4LRWonbKXN+ELkuyHY9k1BXPhc2BcjKTpfSQg8N/h69teXuhgNyCBodYjdeNPHjd3L6HpKckcNxDG1aVWrSzEZaj/AAzaJkDyWlQ7Q1XtFJstBAENJknlOvoug7dcKw7alY5Hd6YfnzCDOUZQ2OW87LmezjqdImrUBJmGgRtqZOi9DljyY+XHa/JzwjOE6vT/AAXeJYOqxjCaTg0CXmZvNyd0DsB4cZWfWb/y6VSo5rhBkObAuLXK6fF8cAo06ooyx5Il0mMuthrdC4C1rK7a5HhewszfmIGVwJnfwj4qCyyWGUZLuWy4U5qUX2NbhvavFucMtBjmEgeCnUGWebnWNt/2RuP8Vx7KpYYps0BaKZDyRaC/Yb2VvEcfwlFpdTpST+LJGc32nbnJ+KR7cMcHVBRcxjcsmqAC4n8rW62F82m3lGKTfKMdA77eTz/tBwiq7FMqublL6IqEAZpewlmUAGBIyEnQSfJZNd2ZwfOhbA9V3naLtBSJdiCA14o1m0pkFznBsQBY3jX7LyxlYy2do+S7+n5ZIJvVaIZJxxOvLdmrxzHOqVPEfwjKBtYz9foOSyQrT2Oe5xDXO1cYBMCdTGgT4Hhz6xhosNTsF0x444fJHLJyyTv3GqY9/cmnmOUkGL7aewj8Aw9+8cYaN1pYjgNOCATManT30U8JgM1BrJg3nqVCfUQcKj5LxwyjK2XsPxqhmgud8LIXaTH08hANyLLOp8HIMnnz+Sr9oKYLmxyhQhixvIuLLSnNQbZhmot3hMMbncQJ5rGw+HJeGkfFadWm9ps2Qu7PT/SceG1+o1P+JNOhnyTLLZTMhzreiS5HhgX5yZVpPe6SXFXKLC4GVpUeGMPiT13tAhq286k6ihLE47kyn2cYGVsztNAumPFw57ogNaTJ3cQbu+S5vDNJJOyq/wAyQLevqnkxeq2ZjP04o3uI8Qq4lwNJrg0aeIidpyyAus4J2pDKfcVGOY+mySXGQ4DrJuvLH4gHUH4q1Te54cKYdAaZ3gCJKzk6VOPHwah1Cbs6HtXxD+Zy5YDWkuJm7ibCfIWU+CmgKUV6QcMzoOhtaxGyxuz+AfWqhjQckguPIefOF6LxXgbHYfLTAa6kCW9YElp8+alOHGKxpnRCavkzJp8ZflyMp0xRYLQH1LkTFhEzrrEqpxDHVcRkY1niEZWi0m9o8pHqsuhxhjYHd5n6CJmTpAG6vcMp1qJfiKo7qKby3NZ0vhoIGxvvB0sljwycuxTJkiokuz9KjVqFr2kVW2AdBadsr2OsTyPRdpWAFI9/h2MZTEtzmkfEAcpDWADVeZ8WIqO76mSC6HSLa3Wd/UcYe9zh1JR6TltSr5exKTa8WXuJU34lzXz4PEAB53I8yjVOyL2s77kRLd/8rZ4QclSg0QRkqAg73ZU+PgI9Sumw+PaZaRkcJkk5mCNJMS2RzHS63zyLHeNe+icow9Rqff3OJ4Y5zKlZobDnBtRoNiQQR8pPS6JgmNbVcQIDwDGgDrzA2uj8RaXYnviR4HZWuaRH4TLZm/P/AMuqrcWcA4E6HfqueTcnT7tKzqgko/R6/c0asD8ZlpGm45LnqGOgkGxBP1VvE8TbkIBk7cyuc4k0tdMybZuh1Cr0+FyTUiGfKou0afEMeTLGgkxc8vJYmIkETt1R8PxMCQWzKrVngzA1XbixuOqOTJkUldl9jPziCCrLK55rBZVIsCYV5tRE8XuEMqZdxFXMNYSVEkHVOkoUPkaFHiOYRoquIxCq1agBsoUjJVI4YrZKeaT0dNwrCuy6LNoUTTqZSDGYWjVpMTO0fZdFwjFtewEWix9Fk8V4gBWAbdrRB6yZ/RRx8uTVFMnHimmWcV2cBGekQ7+0wD6c0Xs3FJ8uEeJoII2zDMI8pChQ4hoQZGn0sjEFzXPpAPeAYB0JG/kL+a1OEmkiePMk3Z0nDeEHDZ6dNwqDMXxoWB2gO2y1amOc1pJpuNpIEi28GDPksPC8TqkUajyc7mQ7LZs6/h0kER8VpniMOIuA6rFzH5Zj5Gyk4pSs6ObcUjCzClUDaTKQbVBbmbepltmHeO1B3Ftk1FwFRwc0vbTYxrC5wHhkOvO4JaPQ81r91RxOUPYJBLs7XFrhl0MjXQ6rlO1fDXeJoqOLCGObDbODREEjWIn4K0GuxGafcyhOeoBEZ3WG0mSNTzTtpGfCLys6gXUXAgnKeQ1nzXb8Eqt7k1g2mcupc/JlcNQ4OacsW3Us8ZRdxV2dPT5YuNS8EKWGGH7o17ufIy7gEE23nwxbmrvHOLsZkcxxzuBLm5Rl8QEy4mTBBgRF9eeXVw9So4Y2pWHhB7lpaQC0iC6LmDJA30M7nGq1zVeeZPu/3Simo8U9+SWSfKTkwwxDq1UVHuLiJAFgGtEaAbkmZVzF0wWEvkDlvPJVG4xlFstGYn8x+g6LJxnEH1Dc+QGgnkrLpuTUpeDnl1rjFxh9y/gaTXSWgNAG9yT1J5a2WawB1So03Fr+iPicY2kwMkOdF8ug5yeaoYOp4sxtKvOP6NEMEv6lyI1MAQeiE6nC2arlUfdRjlk+56D6fyihTw5J0srRppxYojXg62K3KTJenxKzmnkmVx9NJLmJxM4NVmk2EJpujspE6BUkyUVWzZ4EBBHNQx/CC52Zh9EKniO6ba55K7RrudBOikm1sGZD6FRliCBzC1eC4rI8K6yrsQkcMx20HmFrlZlwp2dQ6m14Byi0RrznYofE6ZyAsa0OD2uBInRsGxPIqlw3EEDKTor/AH4NlGSLxZnU+MOZIIa4xlHhE6eI2Gn6q7jqhqU3d3JOXO06C4hzQVl8QpAODhbr0JEoVPGPBEkksc5saANOlhZYSKGFXxtTumkg+Eg6n8phbbMazI11Sk1zm5wC5rbRBBAjWHG+qyuOMLZywGu8QB6mSPiVSqYh3dtEi0gRyytMH6eiq+2ia0yxj+JPqGXHe0aDkFUqVIA56qux+yFVrag+i3ix0yOaeqHfV2UNUBr5KsUtV0nLQ9XCiJVdrLwFfyF2miaowNEDVTeRLRXHC2kOHWQ3nkmTKKienLL4GDlFzlFzwol62kQcwrcSQkqpKZb4RIPIy7TpyVZdioGVg9UCq7YKdKmptDsekx0zC0cPiIsQqzKsaonerLGi8HypitZZ4qRopissGzSo4qFcbit1htqIrK6T2hpUaeKryFQrYi5JEyAYmLt3KE+sqlV6Eh2Wce/vGxlFrjXe6yHusIj0nkEcVfuquK187/HVVMjAwqtUolQoDyrQWjlntkA+Cr+FLfzSqWHbLgrtauAICJ70hJFurihEN0VN9aVUNRN3iSxpG1Itd4ovdKECkXJcSlihNKYuUZWqESSUZToEXg5ED1UzqedZoLLXeJu8VbvEi9ZodloVVMVVS7xLvEuI+ReFVTbWVDvE/eJcTXIuurKDnqr3ibvEcQ5FhxQaij3iZzk6FYCo5AcUaoh02XlWXYi+5MHKBzQHPlPWddDTSMkwpNQwpApgEzJi5RlKUUaskCkoZkpQOycpKCSVBYfMomohF6iSijIbvUxqoKSKCwvep+9QQpBFBYUVVMVFXSRxQWWg9LMq4cpByXE1yDZk8oMp5WaHZNwTCwTZlF7kxNgXlMkUlsmIJ5TJIAeUpTAKSBiTpk6DQkkySAsikkkgwJJJJAxJ5TJICx5TSkkgB5TyopIAmCpAoYRAAgYsyRKcBOQgLAFJO5MgyJJJJAIcJ1FPKBjpJpSlAWOSmTJIASSSSBCSSSQAkkkkAJJJJAxJJJJoB1IJkkATCdOkkAJ6ikkgQkkkkDQkkkkCEkkkgEOkkkgZ/9k='
  },
  {
    movieId: '10',
    title: 'Drishyam 2',
    releaseDate: '2022-11-18',
    rating: 8.2,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5nvtRp8zPbPJ1eMQbdCDum9furwpPtSwYGrPRq10D4w&s=10'
  },
  {
    movieId: '11',
    title: 'Animal',
    releaseDate: '2023-12-01',
    rating: 6.2,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSBqEI0C4H4m7cUlw1GjYJAoTgJqTzzGKjE4-HCeEv2A&s'
  },
  {
    movieId: '12',
    title: 'KGF Chapter 2',
    releaseDate: '2022-04-14',
    rating: 8.3,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1mKbasXveByWK2PQnR3ffMVkekz341RtrnnuIydRHrQ&s=10'
  },
  {
    movieId: '13',
    title: 'Gadar 2',
    releaseDate: '2023-08-11',
    rating: 5.2,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvEVK_9bDq1HPa4o9-XN0Qw3WDXmqaq1dpAicvJhqGhg&s=10'
  },
  {
    movieId: '14',
    title: 'Chhichhore',
    releaseDate: '2019-09-06',
    rating: 8.3,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTumNE6VBt_BkrfyWxooi0k-DXws2puMmmni19chyyo-Q&s=10'
  },
  {
    movieId: '15',
    title: 'Uri: The Surgical Strike',
    releaseDate: '2019-01-11',
    rating: 8.2,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6MRfZmBV3d1oWzgDaPY5utIV0SZzTAGQmYUuc4vN_nA&s=10'
  },
  {
    movieId: '16',
    title: 'Andhadhun',
    releaseDate: '2018-10-05',
    rating: 8.2,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7tjA-uIMPTzvhtRL_0fJg5xgGUKoyPa9C7mZPJjGiMA&s=10'
  },
  {
    movieId: '17',
    title: 'Zindagi Na Milegi Dobara',
    releaseDate: '2011-07-15',
    rating: 8.2,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8C0Dk25jxqxuvQUO85OttEbotjKwo1eKL-5BXoBd-SQ&s=10'
  },
  {
    movieId: '18',
    title: 'Fighter',
    releaseDate: '2023-01-25',
    rating: 8.2,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBiNcBQHiSACObXSrUoevkukXumc2Ibb08lcZ19Qetqw&s=10'
  },
  {
    movieId: '19',
    title: 'Rocky Aur Rani Kii Prem Kahaani',
    releaseDate: '2023-07-28',
    rating: 6.6,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPaS7_F89chPn6iZHVNuaU80LhtJbz7W1POETdGazqow&s=10'
  },
  {
    movieId: '20',
    title: 'Bhool Bhulaiyaa 2',
    releaseDate: '2022-05-20',
    rating: 5.7,
    posterUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt4EUnIVN5M4w32TqGtr_pokjuv0IGkyHRTEH8dO6sEQ&s=10'
  }
];

// Helper to format TMDb results safely
const formatTmdbMovie = (item) => ({
  movieId: item.id.toString(),
  title: item.title || item.original_title,
  releaseDate: item.release_date || 'N/A',
  rating: item.vote_average ? item.vote_average.toFixed(1) : '7.0',
  posterUrl: item.poster_path 
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : 'https://via.placeholder.com/300x450?text=No+Poster'
});

// GET: Trending Movies (with Fail-Safe Fallback)
app.get('/api/movies/trending', async (req, res) => {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey || apiKey === 'your_tmdb_api_key_here') {
    console.warn('⚠️ TMDb API key missing in .env. Serving fallback mock data.');
    return res.json({ data: { results: FALLBACK_BOLLYWOOD_MOVIES } });
  }

  try {
    const response = await axios.get('https://api.themoviedb.org/3/trending/movie/day', {
      params: { api_key: apiKey },
      timeout: 2500
    });

    const formattedResults = response.data.results.map(formatTmdbMovie);
    return res.json({ data: { results: formattedResults } });
  } catch (err) {
    console.warn('⚠️ TMDb API request failed:', err.message);
    console.warn('🔄 Serving fallback mock dataset to prevent UI downtime.');
    return res.json({ data: { results: FALLBACK_BOLLYWOOD_MOVIES } });
  }
});

// GET: Search Movies (with Fail-Safe Fallback)
app.get('/api/movies/search', async (req, res) => {
  const query = req.query.q || '';
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey || apiKey === 'your_tmdb_api_key_here') {
    const filtered = FALLBACK_BOLLYWOOD_MOVIES.filter(m =>
      m.title.toLowerCase().includes(query.toLowerCase())
    );
    return res.json({ data: { results: filtered } });
  }

  try {
    const response = await axios.get('https://api.themoviedb.org/3/search/movie', {
      params: { api_key: apiKey, query },
      timeout: 2500
    });

    const formattedResults = response.data.results.map(formatTmdbMovie);
    return res.json({ data: { results: formattedResults } });
  } catch (err) {
    console.warn('⚠️ Search API failed. Filtering fallback dataset.');
    const filtered = FALLBACK_BOLLYWOOD_MOVIES.filter(m =>
      m.title.toLowerCase().includes(query.toLowerCase())
    );
    return res.json({ data: { results: filtered } });
  }
});

// In-Memory Wishlist Store
let wishlistStore = [];

app.get('/api/wishlist', (req, res) => {
  res.json(wishlistStore);
});

app.post('/api/wishlist', (req, res) => {
  const movie = req.body;
  const id = movie.movieId || movie.id;
  const existsIndex = wishlistStore.findIndex(item => (item.movieId || item.id) === id);

  if (existsIndex > -1) {
    wishlistStore.splice(existsIndex, 1);
  } else {
    wishlistStore.push(movie);
  }
  res.json(wishlistStore);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend Active on Port ${PORT}`));