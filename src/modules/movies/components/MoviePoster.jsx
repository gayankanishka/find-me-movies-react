import React from 'react';
import { Card, makeStyles, Grid, CardMedia } from '@material-ui/core';
import PropTypes from 'prop-types';
import config from '../../../config';

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    maxWidth: 340,
    padding: theme.spacing(2)
  }
}));

const MoviePoster = ({ path }) => {
  const classes = useStyles();
  const imageSrc = `${config.tmdbApi.posterBaseUrl}${path}`;

  return (
    <Grid item xs={12} sm={6} className={classes.cardWrapper}>
      <Card elevation={5}>
        <CardMedia component="img" image={imageSrc} alt="Movie poster" />
      </Card>
    </Grid>
  );
};

MoviePoster.propTypes = {
  path: PropTypes.string.isRequired
};

export default MoviePoster;
