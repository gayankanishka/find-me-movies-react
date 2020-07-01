import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import MovieCard from "./MovieCard";
import { movieService } from "../../../services/movie-db.service";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
  },
  gridList: {
    flexWrap: "nowrap",
    transform: "translateZ(0)",
  },
}));

const MovieList = () => {
  const classes = useStyles();
  const [movies, setMovies] = useState();

  useEffect(() => {
    movieService.getTrendingMovies().then((data) => setMovies(data));
  }, []);

  return (
    <>
      <h2>Trending Movies</h2>
      <div className={classes.root}>
        <GridList className={classes.gridList} cols={2.5}>
          <MovieCard />
        </GridList>
      </div>
    </>
  );
};

export default MovieList;
