import React, { useState, useEffect } from "react";
import { movieService } from "../../../services/movie-db.service";
import MovieList from "./MovieList";

const UpcomingMovies = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    movieService.getUpcomingMovies().then((data) => setMovies(data));
  }, []);

  return (
    <>
      <h2>Top Rated Movies</h2>
      <MovieList movies={movies} />
    </>
  );
};

export default UpcomingMovies;
