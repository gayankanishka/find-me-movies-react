import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import movieService from '../../../services/movie-db.service';
import HorizontalMovieList from './HorizontalMovieList';
import SkeltonLoader from '../../../components/SkeltonLoader';

function RecommendedMovieGrid({ id }) {
  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await movieService.getRecommendedMovies(id);
      setMovies(data.results);
    };

    fetchData();
  }, [id]);

  if (!movies) {
    return (
      <Box sx={{ mt: 5 }}>
        <SkeltonLoader />
      </Box>
    );
  }

  if (movies.length === 0) {
    return null;
  }

  return (
    <Box sx={{ mt: 5 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mb: 2
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#fafafa',
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '-0.01em',
            borderLeft: '3px solid #818cf8',
            pl: 1.5
          }}
        >
          You May Also Like
        </Typography>
      </Box>

      <HorizontalMovieList movies={movies} />
    </Box>
  );
}

RecommendedMovieGrid.propTypes = {
  id: PropTypes.string.isRequired
};

export default RecommendedMovieGrid;
