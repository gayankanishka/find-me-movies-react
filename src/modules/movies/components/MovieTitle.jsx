import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const MovieTitle = ({ title, releaseDate }) => {
  return (
    <Grid container direction="row">
      <Typography variant="h4">{title}</Typography>
      <Typography variant="h4">
        &nbsp;(
        {releaseDate.split('-')[0]}
        )&nbsp;
      </Typography>
    </Grid>
  );
};

MovieTitle.propTypes = {
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired
};

export default MovieTitle;
