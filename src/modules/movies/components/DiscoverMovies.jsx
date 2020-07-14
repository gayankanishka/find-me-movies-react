import React, { useState, useEffect } from 'react';
import movieService from '../../../services/movie-db.service';
import MovieCarousel from './MovieCarousel';
import SkeltonLoader from '../../../components/SkeltonLoader';

const DiscoverMovies = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await movieService.discoverMovies();
      setMovies(data.results);
    };

    fetchData();
  }, []);

  return (
    <>{movies ? <MovieCarousel movies={movies} /> : <SkeltonLoader />}</>
  );
};

export default DiscoverMovies;
