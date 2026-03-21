import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import movieService from '../../../services/movie-db.service';
import navigationService from '../../../services/navigation.service';
import HorizontalMovieList from './HorizontalMovieList';
import SkeltonLoader from '../../../components/SkeltonLoader';

function TopRatedMovieGrid() {
  const [movies, setMovies] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await movieService.getTopRatedMovies();
      setMovies(data.results);
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ mt: 5 }}>
      {/* Section header */}
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
          Top Rated Movies
        </Typography>
        <Box
          component="button"
          onClick={() => navigationService.goToTopMovies()}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            background: 'none',
            border: 'none',
            color: '#818cf8',
            fontSize: '0.85rem',
            fontWeight: 600,
            cursor: 'pointer',
            p: 0,
            transition: 'color 0.2s',
            '&:hover': { color: '#a5b4fc' }
          }}
        >
          See All
          <ArrowForward sx={{ fontSize: '0.95rem' }} />
        </Box>
      </Box>

      {movies ? <HorizontalMovieList movies={movies} /> : <SkeltonLoader />}
    </Box>
  );
}

export default TopRatedMovieGrid;
