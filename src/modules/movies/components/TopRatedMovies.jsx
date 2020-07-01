import React, { useState, useEffect } from "react";
import { movieService } from "../../../services/movie-db.service";
import MovieList from "./MovieList";

const TopRatedMovies = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    movieService.getTopRatedMovies().then((data) => setMovies(data));
  }, []);

  return (
    <>
      <h2>Top Rated Movies</h2>
      <MovieList movies={movies} />
    </>
  );
};

export default TopRatedMovies;
