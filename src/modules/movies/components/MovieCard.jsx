import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles({
  root: {
    minWidth: 150,
    maxHeight: 250,
    margin: 8,
  },
});

const MovieCard = ({ movie }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Movie poster"
          image={process.env.REACT_APP_TMDB_IMAGE_BASE_URL + movie.poster_path}
          title={movie.title}
        />
      </CardActionArea>
    </Card>
  );
};

export default MovieCard;
