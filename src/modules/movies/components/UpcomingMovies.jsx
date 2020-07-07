import React, { useState, useEffect } from 'react';
import { Paper, Typography, makeStyles } from '@material-ui/core';
import movieService from '../../../services/movie-db.service';
import MovieList from './MovieList';
import Loader from '../../../components/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(5px)',
    padding: theme.spacing(2),
    margin: theme.spacing(2)
  }
}));

const UpcomingMovies = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState();

  useEffect(() => {
    movieService.getUpcomingMovies().then((data) => setMovies(data));
  }, []);

  if (movies === undefined) {
    return <Loader />;
  }

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h6">Upcoming Movies</Typography>
      <MovieList movies={movies} />
    </Paper>
  );
};

export default UpcomingMovies;
