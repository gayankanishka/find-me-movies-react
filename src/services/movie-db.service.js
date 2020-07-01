const { apiService } = require("./_shared/api.service");

export const movieService = {
  getTrendingMovies,
};

async function getTrendingMovies() {
  return await apiService.get("movie/popular");
}
