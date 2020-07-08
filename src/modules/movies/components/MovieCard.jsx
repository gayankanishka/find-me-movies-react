import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import navigationService from '../../../services/navigation.service';
import config from '../../../config';
import stringUtils from '../../../utils/string.utils';

const useStyles = makeStyles({
  root: {
    margin: 10,
    flex: 1
  },
  image: {
    minWidth: 170,
    maxHeight: 300
  }
});

const MovieCard = ({ movie }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Card elevation={3}>
        <CardActionArea
          onClick={() => navigationService.goToMovieDetails(movie.id)}
        >
          <CardMedia
            component="img"
            alt="Movie poster"
            image={config.tmdbApi.posterBaseUrl + movie.poster_path}
            title={movie.title}
            className={classes.image}
          />
          <Typography variant="subtitle1" align="center">
            <strong>{movie.title}</strong>
          </Typography>
          <Typography variant="subtitle2" align="center" fontStyle="italic">
            {stringUtils.getDateString(movie.release_date)}
          </Typography>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired
  }).isRequired
};

export default MovieCard;
