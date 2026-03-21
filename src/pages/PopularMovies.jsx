import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { WhatshotRounded } from '@mui/icons-material';
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

function PopularMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await movieService.getPopularMovies();
      setMovies(data.results);
      setPage(data.page);
    };

    fetchData();
  }, []);

  const fetchMovies = async () => {
    const data = await movieService.getPopularMovies(page + 1);
    setMovies((prev) => [...prev, ...data.results]);
    setPage(data.page);
  };

  document.getElementById('root').style.backgroundImage = null;

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
            <WhatshotRounded sx={{ color: '#818cf8', fontSize: '2rem' }} />
            <Typography
              sx={{
                color: '#fafafa',
                fontWeight: 800,
                fontSize: { xs: '1.8rem', md: '2.4rem' },
                lineHeight: 1.15,
                letterSpacing: '-0.01em'
              }}
            >
              Popular Movies
            </Typography>
          </Box>
          <Typography
            sx={{
              color: '#a1a1aa',
              fontSize: '0.95rem',
              mb: 5,
              ml: 0.25
            }}
          >
            Discover what everyone is watching
          </Typography>
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
            <VerticalMovieList movies={movies} />
          </InfiniteScroll>
        </motion.div>
      </Container>
    </motion.div>
  );
}

export default PopularMovies;
