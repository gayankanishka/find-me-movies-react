import apiService from './_shared/api.service';

function getMovieById(id) {
  return apiService.get(`/movie/${id}`).then((res) => res);
}

function getPopularMovies() {
  return apiService.get('movie/popular').then((res) => res.results);
}

function getTopRatedMovies() {
  return apiService.get('/movie/top_rated').then((res) => res.results);
}

function getUpcomingMovies() {
  return apiService.get('/movie/upcoming').then((res) => res.results);
}

function getRecommendedMovies(id) {
  return apiService
    .get(`movie/${id}/recommendations`)
    .then((res) => res.results);
}

function discoverMovies() {
  const params = {
    primary_release_year: new Date().getFullYear()
  };
  return apiService.get('/discover/movie', params).then((res) => res.results);
}

function getNowPlayingMovies() {
  return apiService.get('/movie/now_playing').then((res) => res);
}

const movieService = {
  getMovieById,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  getRecommendedMovies,
  discoverMovies,
  getNowPlayingMovies
};

export default movieService;
