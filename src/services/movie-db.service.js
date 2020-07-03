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

const movieService = {
  getMovieById,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies
};

export default movieService;
