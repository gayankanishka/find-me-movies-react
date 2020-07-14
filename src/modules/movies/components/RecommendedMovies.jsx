import React, { useState, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import movieService from '../../../services/movie-db.service';
import MovieList from './MovieList';
import Loader from '../../../components/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5)
  }
}));

const RecommendedMovies = ({ id }) => {
  const classes = useStyles();
  const [movies, setMovies] = useState();

  useEffect(() => {
    movieService
      .getRecommendedMovies(id)
      .then((data) => setMovies(data.results));
  }, [id]);

  if (movies === undefined) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6">Recommendations</Typography>
      <MovieList movies={movies} />
    </div>
  );
};

RecommendedMovies.propTypes = {
  id: PropTypes.string.isRequired
};

export default RecommendedMovies;
