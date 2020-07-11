import React, { useState, useEffect } from 'react';
import { Paper, Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
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

const RecommendedMovies = ({ id }) => {
  const classes = useStyles();
  const [movies, setMovies] = useState();

  useEffect(() => {
    movieService.getRecommendedMovies(id).then((data) => setMovies(data));
  }, [id]);

  if (movies === undefined) {
    return <Loader />;
  }

  return (
    <Paper elevation={3} className={classes.root}>
      <Typography variant="h6">Recommendations</Typography>
      <MovieList movies={movies} />
    </Paper>
  );
};

RecommendedMovies.propTypes = {
  id: PropTypes.string.isRequired
};

export default RecommendedMovies;
