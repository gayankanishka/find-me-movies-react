import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import movieService from '../services/movie-db.service';
import Loader from '../components/Loader';
import VerticalMovieList from '../modules/movies/components/VerticalMovieList';

const OnTheaters = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    movieService.getNowPlayingMovies().then((data) => setMovies(data.results));
  }, []);

  if (movies === undefined) {
    return <Loader />;
  }

  return (
    <>
      <Typography variant="h6">On Theaters</Typography>
      <VerticalMovieList movies={movies} />
    </>
  );
};

export default OnTheaters;
