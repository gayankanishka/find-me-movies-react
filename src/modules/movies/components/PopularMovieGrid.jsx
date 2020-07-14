import React, { useState, useEffect } from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import movieService from '../../../services/movie-db.service';
import HorizontalMovieList from './HorizontalMovieList';
import SkeltonLoader from '../../../components/SkeltonLoader';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3)
  }
}));

const PopularMovieGrid = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await movieService.getPopularMovies();
      setMovies(data.results);
    };

    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h6">Popular Movies</Typography>
      {movies ? <HorizontalMovieList movies={movies} /> : <SkeltonLoader />}
    </div>
  );
};

export default PopularMovieGrid;
