import React, { useState, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import movieService from '../../../services/movie-db.service';
import HorizontalMovieList from './HorizontalMovieList';
import Loader from '../../../components/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5)
  }
}));

const UpcomingMovies = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState();

  useEffect(() => {
    movieService.getUpcomingMovies().then((data) => setMovies(data.results));
  }, []);

  if (movies === undefined) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6">Upcoming Movies</Typography>
      <HorizontalMovieList movies={movies} />
    </div>
  );
};

export default UpcomingMovies;
