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

const TopRatedMovieGrid = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await movieService.getTopRatedMovies();
      setMovies(data.results);
    };

    fetchData();
  }, []);

  return (
    <div className={classes.root}>
      <Typography variant="h6">Top Rated Movies</Typography>
      {movies ? <HorizontalMovieList movies={movies} /> : <SkeltonLoader />}
    </div>
  );
};

export default TopRatedMovieGrid;
