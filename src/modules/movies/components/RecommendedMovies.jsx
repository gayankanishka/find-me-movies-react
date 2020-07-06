import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import movieService from '../../../services/movie-db.service';
import MovieList from './MovieList';
import Loader from '../../../components/Loader';

const RecommendedMovies = ({ id }) => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    movieService.getRecommendedMovies(id).then((data) => setMovies(data));
  }, [id]);

  if (movies === undefined) {
    return <Loader />;
  }

  return (
    <>
      <h2>Recommended Movies</h2>
      <MovieList movies={movies} />
    </>
  );
};

RecommendedMovies.propTypes = {
  id: PropTypes.string.isRequired
};

export default RecommendedMovies;
