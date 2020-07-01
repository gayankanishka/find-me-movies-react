const { apiService } = require("./_shared/api.service");

export const movieService = {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
};

function getPopularMovies() {
  return apiService.get("movie/popular").then((res) => res.results);
}

function getTopRatedMovies() {
  return apiService.get("/movie/top_rated").then((res) => res.results);
}

function getUpcomingMovies() {
  return apiService.get("/movie/upcoming").then((res) => res.results);
}
