import React, { useState, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import movieService from '../../../services/movie-db.service';
import HorizontalMovieList from './HorizontalMovieList';
import SkeltonLoader from '../../../components/SkeltonLoader';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5)
  }
}));

const UpcomingMovieGrid = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState();

  useEffect(() => {
    movieService.getUpcomingMovies().then((data) => setMovies(data.results));
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h6">Upcoming Movies</Typography>
      {movies ? <HorizontalMovieList movies={movies} /> : <SkeltonLoader />}
    </div>
  );
};

export default UpcomingMovieGrid;
