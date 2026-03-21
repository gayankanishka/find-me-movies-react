import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { motion } from 'framer-motion';
import movieService from '../services/movie-db.service';
import VerticalMovieList from '../modules/movies/components/VerticalMovieList';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const TIME_WINDOWS = [
  { label: 'Today', value: 'day' },
  { label: 'This Week', value: 'week' }
];

function TrendingPage() {
  const [movies, setMovies] = useState([]);
  const [timeWindow, setTimeWindow] = useState('day');
  const [loading, setLoading] = useState(false);

  document.title = 'Trending | FindMe Movies';
  document.getElementById('root').style.backgroundImage = null;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    movieService.getTrendingMovies(timeWindow).then((data) => {
      if (!cancelled) {
        setMovies(data.results || []);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [timeWindow]);

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
            <LocalFireDepartmentIcon sx={{ color: '#f59e0b', fontSize: '2rem' }} />
            <Typography
              sx={{
                color: '#fafafa',
                fontWeight: 800,
                fontSize: { xs: '1.8rem', md: '2.4rem' },
                lineHeight: 1.15,
                letterSpacing: '-0.01em'
              }}
            >
              Trending
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
            What the world is watching right now
          </Typography>

          {/* Time window toggle chips */}
          <Box sx={{ display: 'flex', gap: 1, mb: 4 }}>
            {TIME_WINDOWS.map(({ label, value }) => (
              <Chip
                key={value}
                label={label}
                onClick={() => setTimeWindow(value)}
                variant={timeWindow === value ? 'filled' : 'outlined'}
                sx={
                  timeWindow === value
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

        {/* Movie list */}
        <motion.div
          key={timeWindow}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: loading ? 0.5 : 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
        >
          <VerticalMovieList movies={movies} />
        </motion.div>
      </Container>
    </motion.div>
  );
}

export default TrendingPage;
