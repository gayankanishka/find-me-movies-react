import React, { useState, useEffect } from 'react';
import Loader from '../../../components/Loader';
import movieService from '../../../services/movie-db.service';
import MovieCarousel from './MovieCarousel';

const DiscoverMovies = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await movieService.discoverMovies();
      setMovies(data.results);
    };

    fetchData();
  }, []);

  if (movies === undefined) {
    return <Loader />;
  }

  return <MovieCarousel movies={movies} />;
};

export default DiscoverMovies;
