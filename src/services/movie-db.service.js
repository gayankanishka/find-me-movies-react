import apiService from './_shared/api.service';

function getMovieById(id) {
  return apiService.get(`/movie/${id}`).then((res) => res);
}

function getPopularMovies(pageNumber) {
  const params = {
    page: pageNumber
  };
  return apiService.get('movie/popular', params).then((res) => res);
}

function getTopRatedMovies(pageNumber) {
  const params = {
    page: pageNumber
  };
  return apiService.get('/movie/top_rated', params).then((res) => res);
}

function getUpcomingMovies(pageNumber) {
  const params = {
    page: pageNumber
  };
  return apiService.get('/movie/upcoming', params).then((res) => res);
}

function getRecommendedMovies(id, pageNumber) {
  const params = {
    page: pageNumber
  };
  return apiService
    .get(`movie/${id}/recommendations`, params)
    .then((res) => res);
}

function discoverMovies(pageNumber) {
  const params = {
    primary_release_year: new Date().getFullYear(),
    page: pageNumber
  };
  return apiService.get('/discover/movie', params).then((res) => res.results);
}

function getNowPlayingMovies(pageNumber) {
  const params = {
    page: pageNumber
  };
  return apiService.get('/movie/now_playing', params).then((res) => res);
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
