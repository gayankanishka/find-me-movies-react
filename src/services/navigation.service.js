import history from '../utils/history.utils';

function goToMovieDetails(movieId) {
  history.push(`/movie-details/${movieId}`);
}

const navigationService = {
  goToMovieDetails
};

export default navigationService;
