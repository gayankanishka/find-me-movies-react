import React, { useState, useEffect, useMemo } from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import { EmojiEventsRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';
import movieService from '../services/movie-db.service';
import VerticalMovieList from '../modules/movies/components/VerticalMovieList';
import SkeltonLoader from '../components/SkeltonLoader';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const SORT_OPTIONS = [
  { label: 'Popular', value: 'popularity' },
  { label: 'Rating', value: 'rating' },
  { label: 'Date', value: 'date' }
];

function sortMovies(movies, sortBy) {
  const sorted = [...movies];
  if (sortBy === 'popularity') {
    return sorted.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
  }
  if (sortBy === 'rating') {
    return sorted.sort((a, b) => (b.vote_average || 0) - (a.vote_average || 0));
  }
  if (sortBy === 'date') {
    return sorted.sort(
      (a, b) => new Date(b.release_date || 0) - new Date(a.release_date || 0)
    );
  }
  return sorted;
}

function TopRatedMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState('rating');

  document.title = 'Top Rated Movies | FindMe Movies';
  document.getElementById('root').style.backgroundImage = null;

  useEffect(() => {
    const fetchData = async () => {
      const data = await movieService.getTopRatedMovies();
      setMovies(data.results);
      setPage(data.page);
    };

    fetchData();
  }, []);

  const fetchMovies = async () => {
    const data = await movieService.getTopRatedMovies(page + 1);
    setMovies((prev) => [...prev, ...data.results]);
    setPage(data.page);
  };

  const sortedMovies = useMemo(() => sortMovies(movies, sortBy), [movies, sortBy]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: '100vh', background: '#09090b' }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, pt: { xs: 5, md: 7 }, pb: 8 }}>
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <EmojiEventsRounded sx={{ color: '#f59e0b', fontSize: '2rem' }} />
            <Typography
              sx={{
                color: '#fafafa',
                fontWeight: 800,
                fontSize: { xs: '1.8rem', md: '2.4rem' },
                lineHeight: 1.15,
                letterSpacing: '-0.01em'
              }}
            >
              Top Rated
            </Typography>
          </Box>
          <Typography
            sx={{
              color: '#a1a1aa',
              fontSize: '0.95rem',
              mb: 3,
              ml: 0.25
            }}
          >
            The best movies of all time
          </Typography>

          {/* Sort chips */}
          <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
            {SORT_OPTIONS.map(({ label, value }) => (
              <Chip
                key={value}
                label={label}
                onClick={() => setSortBy(value)}
                variant={sortBy === value ? 'filled' : 'outlined'}
                sx={
                  sortBy === value
                    ? {
                        background: 'rgba(129,140,248,0.2)',
                        border: '1px solid #818cf8',
                        color: '#818cf8',
                        fontWeight: 600,
                        '&:hover': { background: 'rgba(129,140,248,0.28)' }
                      }
                    : {
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#a1a1aa',
                        '&:hover': { background: 'rgba(255,255,255,0.08)', color: '#fafafa' }
                      }
                }
              />
            ))}
          </Box>
        </motion.div>

        {/* Infinite scroll list */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <InfiniteScroll
            dataLength={movies.length}
            next={fetchMovies}
            hasMore={page !== 1000}
            loader={
              <Box sx={{ mt: 3 }}>
                <SkeltonLoader />
              </Box>
            }
          >
            <VerticalMovieList movies={sortedMovies} />
          </InfiniteScroll>
        </motion.div>
      </Container>
    </motion.div>
  );
}

export default TopRatedMovies;
