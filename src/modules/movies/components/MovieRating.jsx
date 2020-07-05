import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';

const MovieRating = ({ voteAvg }) => {
  return (
    <Grid container direction="row" alignItems="center">
      <Typography variant="h6" display="block">
        Rating:&nbsp;
      </Typography>
      <Rating
        name="disabled"
        value={voteAvg}
        max={10}
        precision={0.5}
        disabled
      />
    </Grid>
  );
};

MovieRating.propTypes = {
  voteAvg: PropTypes.number.isRequired
};

export default MovieRating;
