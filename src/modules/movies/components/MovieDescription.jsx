import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const MovieDescription = ({ description }) => {
  return (
    <Grid item>
      <Typography variant="body1" paragraph>
        {description}
      </Typography>
    </Grid>
  );
};

MovieDescription.propTypes = {
  description: PropTypes.string.isRequired
};

export default MovieDescription;
