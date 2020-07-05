import React from 'react';
import { Card, makeStyles, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';
import config from '../../../config';

const useStyles = makeStyles((theme) => ({
  cardWrapper: {
    maxWidth: 340,
    padding: theme.spacing(2)
  },
  imageWrapper: {
    maxWidth: 310
  }
}));

const MoviePoster = ({ path }) => {
  const classes = useStyles();
  const imageSrc = `${config.tmdbApi.imageBaseUrl}${path}`;

  return (
    <Grid item xs={12} sm={6} className={classes.cardWrapper}>
      <Card elevation={5}>
        <img className={classes.imageWrapper} src={imageSrc} alt="poster" />
      </Card>
    </Grid>
  );
};

MoviePoster.propTypes = {
  path: PropTypes.string.isRequired
};

export default MoviePoster;
