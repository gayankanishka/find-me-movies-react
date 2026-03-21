import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import PopularMovieGrid from '../modules/movies/components/PopularMovieGrid';
import TopRatedMovieGrid from '../modules/movies/components/TopRatedMovieGrid';
import UpcomingMovieGrid from '../modules/movies/components/UpcomingMovieGrid';
import DiscoverMovies from '../modules/movies/components/DiscoverMovies';
import HorizontalMovieList from '../modules/movies/components/HorizontalMovieList';
import movieService from '../services/movie-db.service';
import navigationService from '../services/navigation.service';
import { getRecentlyViewed } from '../utils/recently-viewed.utils';

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.4 } },
  exit: { opacity: 0, transition: { duration: 0.2 } }
};

const sectionVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 }
};

function SectionWrapper({ children, delay = 0 }) {
  return (
    <motion.div
      variants={sectionVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.45, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

function RecentlyViewedSection() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    setMovies(getRecentlyViewed());
  }, []);

  if (movies.length === 0) return null;

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{
          fontWeight: 700, fontSize: '1.1rem', color: '#ffffff',
          borderLeft: '3px solid #e8b84b', pl: 1.5,
          display: 'flex', alignItems: 'center', gap: 1
        }}>
          Recently Viewed
        </Typography>
        <Button size="small"
          onClick={() => { localStorage.removeItem('recentlyViewed'); setMovies([]); }}
          sx={{ color: '#555555', fontSize: '0.75rem', textTransform: 'none', '&:hover': { color: '#999999', background: 'transparent' } }}>
          Clear
        </Button>
      </Box>
      <HorizontalMovieList movies={movies} />
    </Box>
  );
}

function TrendingSection() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    movieService.getTrendingMovies('day').then((d) => setMovies(d.results || []));
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#fafafa',
            borderLeft: '3px solid #e8b84b',
            pl: 1.5
          }}
        >
          Trending Today 🔥
        </Typography>
        <Button
          size="small"
          onClick={() => navigationService.goToTrending()}
          sx={{ color: '#e8b84b', fontSize: '0.8rem' }}
        >
          See All →
        </Button>
      </Box>
      <HorizontalMovieList movies={movies} />
    </Box>
  );
}

function Home() {
  document.title = 'FindMe Movies';
  document.getElementById('root').style.backgroundImage = null;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero carousel — full width, no container padding */}
      <Box sx={{ width: '100%' }}>
        <DiscoverMovies />
      </Box>

      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 } }}>
        {/* Recently Viewed */}
        <Box sx={{ py: 4 }}>
          <SectionWrapper delay={0}>
            <RecentlyViewedSection />
          </SectionWrapper>
        </Box>

        {/* Trending Today */}
        <Box sx={{ py: 4 }}>
          <SectionWrapper delay={0.05}>
            <TrendingSection />
          </SectionWrapper>
        </Box>

        {/* Popular */}
        <Box sx={{ py: 6 }}>
          <SectionWrapper delay={0.1}>
            <PopularMovieGrid />
          </SectionWrapper>
        </Box>

        {/* Top Rated */}
        <Box sx={{ py: 6 }}>
          <SectionWrapper delay={0.2}>
            <TopRatedMovieGrid />
          </SectionWrapper>
        </Box>

        {/* Coming Soon */}
        <Box sx={{ py: 6 }}>
          <SectionWrapper delay={0.3}>
            <UpcomingMovieGrid />
          </SectionWrapper>
        </Box>
      </Container>
    </motion.div>
  );
}

export default Home;
