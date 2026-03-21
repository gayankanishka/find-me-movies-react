import React from 'react';
import { Box, Card } from '@mui/material';
import PropTypes from 'prop-types';
import config from '../../../config';

function MoviePoster({ path }) {
  const imageSrc = `${config.tmdbApi.posterBaseUrl}${path}`;

  return (
    <Box
      sx={{
        maxWidth: 340,
        width: '100%',
        p: 2,
        flexShrink: 0
      }}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          background: '#0f0f13'
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt="Movie poster"
          sx={{
            width: '100%',
            height: 'auto',
            display: 'block',
            objectFit: 'cover'
          }}
        />
      </Card>
    </Box>
  );
}

MoviePoster.propTypes = {
  path: PropTypes.string.isRequired
};

export default MoviePoster;
