import React, { useState, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import movieService from '../../../services/movie-db.service';
import HorizontalMovieList from './HorizontalMovieList';
import SkeltonLoader from '../../../components/SkeltonLoader';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5)
  }
}));

const RecommendedMovieGrid = ({ id }) => {
  const classes = useStyles();
  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await movieService.getRecommendedMovies(id);
      setMovies(data.results);
    };

    fetchData();
  }, [id]);

  return (
    <div className={classes.root}>
      <Typography variant="h6">Recommendations</Typography>
      {movies ? <HorizontalMovieList movies={movies} /> : <SkeltonLoader />}
    </div>
  );
};

RecommendedMovieGrid.propTypes = {
  id: PropTypes.string.isRequired
};

export default RecommendedMovieGrid;
