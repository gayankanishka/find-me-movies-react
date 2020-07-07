import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import PropTypes from 'prop-types';
import navigationService from '../../../services/navigation.service';
import config from '../../../config';

const useStyles = makeStyles({
  root: {
    minWidth: 150,
    maxHeight: 250,
    margin: 8
  }
});

const MovieCard = ({ movie }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={3}>
      <CardActionArea
        onClick={() => navigationService.goToMovieDetails(movie.id)}
      >
        <CardMedia
          component="img"
          alt="Movie poster"
          image={config.tmdbApi.posterBaseUrl + movie.poster_path}
          title={movie.title}
        />
      </CardActionArea>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
};

export default MovieCard;
