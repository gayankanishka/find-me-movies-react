import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { movieService } from '../../../services/movie-db.service';

const MovieDetails = () => {
  const [movie, setMovie] = useState();
  const id = useParams();

  useEffect(() => {
    movieService.getMovieById(id).then((data) => setMovie(data));
  }, [id]);

  return <h1>{movie ? movie.title : null}</h1>;
};

export default MovieDetails;
