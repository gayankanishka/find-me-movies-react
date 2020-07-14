import history from '../utils/history.utils';

function goToHome() {
  history.push('/');
}

function goToMovieDetails(movieId) {
  history.push(`/movie-details/${movieId}`);
}

function goToOnTheaters() {
  history.push('/on-theaters');
}

function goToPopularMovies() {
  history.push('/popular-movies');
}

function goToTopMovies() {
  history.push('/top-movies');
}

function goToUpcomingMovies() {
  history.push('/upcoming-movies');
}

const navigationService = {
  goToHome,
  goToMovieDetails,
  goToOnTheaters,
  goToPopularMovies,
  goToTopMovies,
  goToUpcomingMovies
};

export default navigationService;
