import React, { useState, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import movieService from '../../../services/movie-db.service';
import HorizontalMovieList from './HorizontalMovieList';
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
    const fetchData = async () => {
      const data = await movieService.getRecommendedMovies(id);
      setMovies(data.results);
    };

    fetchData();
  }, []);

  if (movies === undefined) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <Typography variant="h6">Recommendations</Typography>
      <HorizontalMovieList movies={movies} />
    </div>
  );
};

RecommendedMovies.propTypes = {
  id: PropTypes.string.isRequired
};

export default RecommendedMovies;
