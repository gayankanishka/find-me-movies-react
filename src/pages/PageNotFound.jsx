import React from 'react';
import { useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import { HomeRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import navigationService from '../services/navigation.service';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

// Decorative film strip strip rendered purely with CSS/inline boxes
function FilmStrip() {
  const frames = Array.from({ length: 8 });

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.5,
        opacity: 0.18,
        userSelect: 'none',
        pointerEvents: 'none'
      }}
    >
      {frames.map((_, i) => (
        <Box
          key={i}
          sx={{
            width: 36,
            height: 50,
            border: '2px solid rgba(129,140,248,0.6)',
            borderRadius: '3px',
            position: 'relative',
            flexShrink: 0,
            '&::before, &::after': {
              content: '""',
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 8,
              height: 6,
              background: 'rgba(129,140,248,0.6)',
              borderRadius: '1px'
            },
            '&::before': { top: -7 },
            '&::after': { bottom: -7 }
          }}
        />
      ))}
    </Box>
  );
}

function PageNotFound() {
  const location = useLocation();

  document.getElementById('root').style.backgroundImage = null;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{
        minHeight: '100vh',
        background: '#09090b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          px: 3,
          py: 6
        }}
      >
        {/* Film strip — top */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <FilmStrip />
        </motion.div>

        {/* 404 in gradient text */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Typography
            sx={{
              fontSize: { xs: '6rem', sm: '9rem', md: '12rem' },
              fontWeight: 900,
              lineHeight: 1,
              background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #c084fc 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-0.04em',
              my: 1.5
            }}
          >
            404
          </Typography>
        </motion.div>

        {/* Film strip — bottom (mirrored) */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <FilmStrip />
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.38 }}
        >
          <Typography
            sx={{
              color: '#fafafa',
              fontWeight: 700,
              fontSize: { xs: '1.25rem', md: '1.6rem' },
              mt: 4,
              mb: 1
            }}
          >
            Looks like this movie doesn&apos;t exist
          </Typography>
          <Typography
            sx={{
              color: '#a1a1aa',
              fontSize: '0.9rem',
              mb: 4,
              maxWidth: 380
            }}
          >
            The page at{' '}
            <Box
              component="code"
              sx={{
                background: 'rgba(129,140,248,0.12)',
                border: '1px solid rgba(129,140,248,0.2)',
                borderRadius: '4px',
                px: 0.75,
                py: 0.15,
                color: '#818cf8',
                fontSize: '0.85rem',
                fontFamily: 'monospace'
              }}
            >
              {location.pathname}
            </Box>{' '}
            was not found.
          </Typography>
        </motion.div>

        {/* Go Home button */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.48 }}
        >
          <Box
            component={motion.button}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={navigationService.goToHome}
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: 3,
              py: 1.25,
              borderRadius: '12px',
              background: '#818cf8',
              border: 'none',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              cursor: 'pointer',
              outline: 'none',
              transition: 'background 0.2s ease',
              '&:hover': { background: '#6366f1' }
            }}
          >
            <HomeRounded sx={{ fontSize: '1.15rem' }} />
            Go Home
          </Box>
        </motion.div>
      </Box>
    </motion.div>
  );
}

export default PageNotFound;
