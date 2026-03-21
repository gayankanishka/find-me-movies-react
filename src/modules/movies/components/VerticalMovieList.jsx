import React from 'react';
import { Box } from '@mui/material';
import PropTypes from 'prop-types';
import MovieCard from './MovieCard';

function VerticalMovieList({ movies }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(auto-fill, minmax(185px, 1fr))'
        },
        gap: '16px',
        width: '100%',
        // Align cards to center within each grid cell
        justifyItems: 'center'
      }}
    >
      {(movies || []).map((data) => (
        <MovieCard key={data.id} movie={data} />
      ))}
    </Box>
  );
}

VerticalMovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired
    })
  ).isRequired
};

export default VerticalMovieList;
