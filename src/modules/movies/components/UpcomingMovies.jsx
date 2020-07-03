import React, { useState, useEffect } from 'react';
import movieService from '../../../services/movie-db.service';
import MovieList from './MovieList';
import Loader from '../../../components/Loader';

const UpcomingMovies = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    movieService.getUpcomingMovies().then((data) => setMovies(data));
  }, []);

  if (movies === undefined) {
    return <Loader />;
  }

  return (
    <>
      <h2>Upcoming Movies</h2>
      <MovieList movies={movies} />
    </>
  );
};

export default UpcomingMovies;
