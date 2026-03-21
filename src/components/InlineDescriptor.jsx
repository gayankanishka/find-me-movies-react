import React from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';

function InlineDescriptor({ title, description }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 0.5
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: '#a1a1aa',
          fontSize: '0.9rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}
      >
        {title}:
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: '#fafafa',
          fontSize: '0.95rem'
        }}
      >
        {description}
      </Typography>
    </Box>
  );
}

InlineDescriptor.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number.isRequired
  ]).isRequired
};

export default InlineDescriptor;
