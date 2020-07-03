import React, { useState, useEffect } from 'react';
import movieService from '../../../services/movie-db.service';
import MovieList from './MovieList';
import Loader from '../../../components/Loader';

const PopularMovies = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    movieService.getPopularMovies().then((data) => setMovies(data));
  }, []);

  if (movies === undefined) {
    return <Loader />;
  }

  return (
    <>
      <h2>Popular Movies</h2>
      <MovieList movies={movies} />
    </>
  );
};

export default PopularMovies;
