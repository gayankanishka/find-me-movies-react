import React, { useState, useEffect } from 'react';
import Loader from '../../../components/Loader';
import movieService from '../../../services/movie-db.service';
import MovieCarousel from './MovieCarousel';

const DiscoverMovies = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    movieService.discoverMovies().then((data) => setMovies(data));
  }, []);

  if (movies === undefined) {
    return <Loader />;
  }

  return <MovieCarousel movies={movies} />;
};

export default DiscoverMovies;
