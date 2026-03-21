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
            color: '#a1a1aa',
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
          icon={<StarRounded sx={{ color: '#f59e0b' }} />}
          emptyIcon={<StarRounded sx={{ color: 'rgba(245,158,11,0.25)' }} />}
        />
        <Typography
          sx={{
            color: '#f59e0b',
            fontWeight: 700,
            fontSize: '0.95rem'
          }}
        >
          {voteAvg.toFixed(1)}
          <Typography
            component="span"
            sx={{ color: '#a1a1aa', fontWeight: 400, fontSize: '0.8rem' }}
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
