import React, { useState, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import movieService from '../../../services/movie-db.service';
import MovieList from './MovieList';
import Loader from '../../../components/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3)
  }
}));

const PopularMovies = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState();

  useEffect(() => {
    movieService.getPopularMovies().then((data) => setMovies(data.results));
  }, []);

  if (movies === undefined) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6">Popular Movies</Typography>
      <MovieList movies={movies} />
    </div>
  );
};

export default PopularMovies;
