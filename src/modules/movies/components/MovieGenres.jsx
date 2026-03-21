import React from 'react';
import { Box, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function MovieGenres({ genres }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0.75,
        alignItems: 'center'
      }}
    >
      {genres.map((genre, index) => (
        <motion.div
          key={genre.id}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25, delay: index * 0.04 }}
        >
          <Chip
            label={genre.name}
            size="small"
            sx={{
              background: 'rgba(232,184,75,0.15)',
              color: '#e8b84b',
              border: '1px solid rgba(232,184,75,0.3)',
              borderRadius: '20px',
              fontWeight: 500,
              fontSize: '0.72rem',
              letterSpacing: '0.03em',
              height: '24px',
              '&:hover': {
                background: 'rgba(232,184,75,0.25)'
              },
              '& .MuiChip-label': {
                px: 1.25
              }
            }}
          />
        </motion.div>
      ))}
    </Box>
  );
}

MovieGenres.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default MovieGenres;
