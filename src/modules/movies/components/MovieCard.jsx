import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import { Grid, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import navigationService from '../../../services/navigation.service';
import config from '../../../config';
import stringUtils from '../../../utils/string.utils';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 10,
    flex: 1
  },
  image: {
    minWidth: 170,
    maxHeight: 300,
    minHeight: 300,
    margin: theme.spacing(0, 0, 2, 0)
  }
}));

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
          <Typography variant="body2" align="center">
            {stringUtils.getDateString(movie.release_date)}
          </Typography>
          <Grid container justify="center">
            <Rating
              name="disabled"
              value={movie.vote_average / 2}
              precision={0.5}
              disabled
            />
          </Grid>
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
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired
  }).isRequired
};

export default MovieCard;
