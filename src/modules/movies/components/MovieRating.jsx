import React from 'react';
import { Box, Rating, Typography } from '@mui/material';
import { StarRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

function MovieRating({ voteAvg }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: '#999999',
            fontSize: '0.9rem',
            fontWeight: 600,
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}
        >
          Rating
        </Typography>
        <Rating
          value={voteAvg / 2}
          max={5}
          precision={0.5}
          readOnly
          icon={<StarRounded sx={{ color: '#e8b84b' }} />}
          emptyIcon={<StarRounded sx={{ color: 'rgba(232,184,75,0.25)' }} />}
        />
        <Typography
          sx={{
            color: '#e8b84b',
            fontWeight: 700,
            fontSize: '0.95rem'
          }}
        >
          {voteAvg.toFixed(1)}
          <Typography
            component="span"
            sx={{ color: '#999999', fontWeight: 400, fontSize: '0.8rem' }}
          >
            /10
          </Typography>
        </Typography>
      </Box>
    </motion.div>
  );
}

MovieRating.propTypes = {
  voteAvg: PropTypes.number.isRequired
};

export default MovieRating;
