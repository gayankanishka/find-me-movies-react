import React, { useState } from 'react';
import { Box, Card, Rating } from '@mui/material';
import { StarRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import navigationService from '../../../services/navigation.service';
import config from '../../../config';
import stringUtils from '../../../utils/string.utils';

function MovieCard({ movie }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ display: 'inline-block', cursor: 'pointer' }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onClick={() => navigationService.goToMovieDetails(movie.id)}
    >
      <Card
        elevation={0}
        sx={{
          width: 185,
          height: 270,
          position: 'relative',
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#0f0f13',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: hovered
            ? '0 0 20px rgba(129,140,248,0.3)'
            : '0 4px 12px rgba(0,0,0,0.4)',
          transition: 'box-shadow 0.25s ease',
          flexShrink: 0
        }}
      >
        <LazyLoad once height={270} offset={500}>
          <Box
            component="img"
            src={config.tmdbApi.posterBaseUrl + movie.poster_path}
            alt={movie.title}
            sx={{
              width: '100%',
              height: '270px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </LazyLoad>

        {/* Hover overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={hovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background:
              'linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.7) 60%, transparent 100%)',
            padding: '32px 10px 10px'
          }}
        >
          <Box
            sx={{
              color: '#fafafa',
              fontSize: '0.78rem',
              fontWeight: 700,
              lineHeight: 1.3,
              mb: 0.4,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}
          >
            {movie.title}
          </Box>
          <Box
            sx={{
              color: '#a1a1aa',
              fontSize: '0.68rem',
              mb: 0.5
            }}
          >
            {stringUtils.getDateString(movie.release_date)}
          </Box>
          <Rating
            value={movie.vote_average / 2}
            precision={0.5}
            readOnly
            size="small"
            icon={<StarRounded sx={{ color: '#f59e0b', fontSize: '0.85rem' }} />}
            emptyIcon={
              <StarRounded sx={{ color: 'rgba(245,158,11,0.25)', fontSize: '0.85rem' }} />
            }
          />
        </motion.div>
      </Card>
    </motion.div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    vote_average: PropTypes.number.isRequired
  }).isRequired
};

export default MovieCard;
