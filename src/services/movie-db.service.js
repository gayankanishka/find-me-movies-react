import apiService from './_shared/api.service';

async function getMovieById(id) {
  const res = await apiService.get(`/movie/${id}`);
  return res;
}

async function getPopularMovies(pageNumber) {
  const params = {
    page: pageNumber
  };

  const res = await apiService.get('movie/popular', params);
  return res;
}

async function getTopRatedMovies(pageNumber) {
  const params = {
    page: pageNumber
  };

  const res = await apiService.get('/movie/top_rated', params);
  return res;
}

async function getUpcomingMovies(pageNumber) {
  const params = {
    page: pageNumber
  };

  const res = await apiService.get('/movie/upcoming', params);
  return res;
}

async function getRecommendedMovies(id, pageNumber) {
  const params = {
    page: pageNumber
  };

  const res = await apiService.get(`movie/${id}/recommendations`, params);
  return res;
}

async function discoverMovies(pageNumber) {
  const params = {
    primary_release_year: new Date().getFullYear(),
    page: pageNumber
  };

  const res = await apiService.get('/discover/movie', params);
  return res;
}

async function getNowPlayingMovies(pageNumber) {
  const params = {
    page: pageNumber
  };

  const res = await apiService.get('/movie/now_playing', params);
  return res;
}

async function searchMovies(query) {
  const params = {
    query
  };

  const res = await apiService.get('/search/movie', params);
  return res;
}

const movieService = {
  getMovieById,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getRecommendedMovies,
  discoverMovies,
  getNowPlayingMovies,
  searchMovies
};

export default movieService;
