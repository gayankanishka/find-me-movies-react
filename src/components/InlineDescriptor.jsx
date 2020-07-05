import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import PropTypes from 'prop-types';

const InlineDescriptor = ({ title, description }) => {
  return (
    <Grid container direction="row" alignItems="baseline">
      <Typography variant="h6">
        {title}
        :&nbsp;
      </Typography>
      <Typography variant="subtitle1">{description}</Typography>
    </Grid>
  );
};

InlineDescriptor.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]).isRequired
};

export default InlineDescriptor;
