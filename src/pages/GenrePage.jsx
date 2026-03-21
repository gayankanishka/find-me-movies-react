import React, { useState, useEffect } from 'react';
import { Box, Container, Typography } from '@mui/material';
import CategoryIcon from '@mui/icons-material/Category';
import { motion } from 'framer-motion';
import movieService from '../services/movie-db.service';
import navigationService from '../services/navigation.service';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.05
    }
  }
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.92, y: 16 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } }
};

const GENRE_COLORS = {
  28: '#ef4444',    // Action
  12: '#f97316',    // Adventure
  16: '#eab308',    // Animation
  35: '#22c55e',    // Comedy
  80: '#64748b',    // Crime
  99: '#06b6d4',    // Documentary
  18: '#818cf8',    // Drama
  10751: '#f59e0b', // Family
  14: '#a855f7',    // Fantasy
  36: '#84cc16',    // History
  27: '#7c3aed',    // Horror
  10402: '#ec4899', // Music
  9648: '#475569',  // Mystery
  10749: '#f43f5e', // Romance
  878: '#3b82f6',   // Science Fiction
  10770: '#0891b2', // TV Movie
  53: '#dc2626',    // Thriller
  10752: '#92400e', // War
  37: '#d97706'     // Western
};

const DEFAULT_COLOR = '#818cf8';

function GenreCard({ genre }) {
  const color = GENRE_COLORS[genre.id] || DEFAULT_COLOR;

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
      style={{ cursor: 'pointer' }}
      onClick={() => navigationService.goToGenreMovies(genre.id, genre.name)}
    >
      <Box
        sx={{
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          height: 90,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${color}33, ${color}55)`,
          border: `1px solid ${color}44`,
          transition: 'box-shadow 0.2s ease',
          '&:hover': {
            boxShadow: `0 8px 24px ${color}40`
          }
        }}
      >
        {/* Decorative accent */}
        <Box
          sx={{
            position: 'absolute',
            top: -12,
            right: -12,
            width: 60,
            height: 60,
            borderRadius: '50%',
            background: `${color}22`
          }}
        />
        <Typography
          sx={{
            color: '#fafafa',
            fontWeight: 700,
            fontSize: '0.95rem',
            textAlign: 'center',
            px: 1.5,
            zIndex: 1,
            textShadow: '0 1px 4px rgba(0,0,0,0.5)'
          }}
        >
          {genre.name}
        </Typography>
      </Box>
    </motion.div>
  );
}

function GenrePage() {
  const [genres, setGenres] = useState([]);

  document.title = 'Browse Genres | FindMe Movies';
  document.getElementById('root').style.backgroundImage = null;

  useEffect(() => {
    movieService.getGenres().then((data) => {
      setGenres(data.genres || []);
    });
  }, []);

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
            <CategoryIcon sx={{ color: '#818cf8', fontSize: '2rem' }} />
            <Typography
              sx={{
                color: '#fafafa',
                fontWeight: 800,
                fontSize: { xs: '1.8rem', md: '2.4rem' },
                lineHeight: 1.15,
                letterSpacing: '-0.01em'
              }}
            >
              Browse Genres
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
            Explore movies by genre
          </Typography>
        </motion.div>

        {/* Genre grid */}
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '16px'
          }}
        >
          {genres.map((genre) => (
            <GenreCard key={genre.id} genre={genre} />
          ))}
        </motion.div>
      </Container>
    </motion.div>
  );
}

export default GenrePage;
