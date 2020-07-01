const { apiService } = require("./_shared/api.service");

export const movieService = {
  getTrendingMovies,
};

function getTrendingMovies() {
  return apiService.get("movie/popular").then((res) => res.results);
}
