const isDev = process.env.NODE_ENV === 'development';

const config = {
  tmdbApi: {
    baseUrl: isDev ? process.env.REACT_APP_TMDB_BASE_URL : process.env.REACT_APP_TMDB_PROXY_BASE_URL,
    apiKey: isDev ? process.env.REACT_APP_TMDB_API_KEY : '',
    posterBaseUrl: process.env.REACT_APP_TMDB_POSTER_BASE_URL,
    backdropBaseUrl: process.env.REACT_APP_TMDB_BACKDROP_BASE_URL
  }
};

export default config;
