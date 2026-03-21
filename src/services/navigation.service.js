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

function goToTrending() {
  history.push('/trending');
}

function goToGenres() {
  history.push('/genres');
}

function goToGenreMovies(genreId, genreName) {
  history.push(`/genres/${genreId}?name=${encodeURIComponent(genreName)}`);
}

function goToPerson(id) {
  history.push(`/person/${id}`);
}

const navigationService = {
  goToHome,
  goToMovieDetails,
  goToOnTheaters,
  goToPopularMovies,
  goToTopMovies,
  goToUpcomingMovies,
  goToTrending,
  goToGenres,
  goToGenreMovies,
  goToPerson
};

export default navigationService;
