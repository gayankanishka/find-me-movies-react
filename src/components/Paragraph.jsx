import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const Paragraph = ({ body }) => {
  return (
    <Grid item>
      <Typography variant="body1" paragraph>
        {body}
      </Typography>
    </Grid>
  );
};

Paragraph.propTypes = {
  body: PropTypes.string.isRequired
};

export default Paragraph;
