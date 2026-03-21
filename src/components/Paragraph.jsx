import React from 'react';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';

function Paragraph({ body }) {
  return (
    <Typography
      variant="body1"
      paragraph
      sx={{
        color: '#999999',
        lineHeight: 1.7,
        fontSize: '0.95rem'
      }}
    >
      {body}
    </Typography>
  );
}

Paragraph.propTypes = {
  body: PropTypes.string.isRequired
};

export default Paragraph;
