const isDev = import.meta.env.DEV;

const config = {
  tmdbApi: {
    baseUrl: isDev ? import.meta.env.VITE_TMDB_BASE_URL : import.meta.env.VITE_TMDB_PROXY_BASE_URL,
    apiKey: isDev ? import.meta.env.VITE_TMDB_API_KEY : '',
    posterBaseUrl: import.meta.env.VITE_TMDB_POSTER_BASE_URL,
    backdropBaseUrl: import.meta.env.VITE_TMDB_BACKDROP_BASE_URL
  }
};

export default config;
