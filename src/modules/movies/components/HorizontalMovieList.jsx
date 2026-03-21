import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

function HorizontalMovieList({ movies }) {
  return (
    <Box
      sx={{
        width: '100%',
        overflowX: 'auto',
        overflowY: 'hidden',
        // Hide scrollbar on mobile/touch devices
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(129,140,248,0.3) transparent',
        '&::-webkit-scrollbar': {
          height: '4px'
        },
        '&::-webkit-scrollbar-track': {
          background: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(129,140,248,0.3)',
          borderRadius: '2px',
          '&:hover': {
            background: 'rgba(129,140,248,0.5)'
          }
        },
        // Hide scrollbar on mobile
        '@media (max-width: 600px)': {
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: '12px',
          pb: 1,
          width: 'max-content'
        }}
      >
        {(movies || []).map((data) => (
          <MovieCard key={data.id} movie={data} />
        ))}
      </Box>
    </Box>
  );
}

HorizontalMovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ).isRequired
};

export default HorizontalMovieList;
