import history from '../utils/history.utils';

export const navigationService = {
  goToMovieDetails
};

function goToMovieDetails(movieId) {
  history.push(`/movie-details/${movieId}`);
}
