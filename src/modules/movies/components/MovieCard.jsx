import React, { useState } from 'react';
import { Box, Card, Typography } from '@mui/material';
import { StarRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import LazyLoad from 'react-lazyload';
import navigationService from '../../../services/navigation.service';
import config from '../../../config';

function MovieCard({ movie }) {
  const [imgError, setImgError] = useState(false);

  const posterUrl = movie.poster_path
    ? config.tmdbApi.posterBaseUrl + movie.poster_path
    : null;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      style={{ display: 'inline-block', cursor: 'pointer' }}
      onClick={() => navigationService.goToMovieDetails(movie.id)}
    >
      <Card
        elevation={0}
        sx={{
          width: 185,
          borderRadius: '12px',
          overflow: 'hidden',
          background: '#141414',
          border: '1px solid rgba(255,255,255,0.07)',
          transition: 'box-shadow 0.25s ease',
          flexShrink: 0,
          '&:hover': { boxShadow: '0 0 20px rgba(232,184,75,0.25)' }
        }}
      >
        {/* Poster section */}
        <Box sx={{ position: 'relative', height: 220, overflow: 'hidden', background: '#1c1c1c' }}>
          {(!posterUrl || imgError) ? (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <Box sx={{ fontSize: '2.5rem' }}>🎬</Box>
              <Typography sx={{ color: '#555555', fontSize: '0.7rem' }}>No Image</Typography>
            </Box>
          ) : (
            <LazyLoad height={220} offset={100} once>
              <img
                src={posterUrl}
                alt={movie.title}
                onError={() => setImgError(true)}
                style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
              />
            </LazyLoad>
          )}

          {/* Rating badge — top right corner, always visible */}
          {movie.vote_average > 0 && (
            <Box
              sx={{
                position: 'absolute',
                top: 6,
                right: 6,
                background: 'rgba(0,0,0,0.75)',
                backdropFilter: 'blur(6px)',
                borderRadius: '6px',
                px: 0.75,
                py: 0.4,
                display: 'flex',
                alignItems: 'center',
                gap: 0.4
              }}
            >
              <StarRounded sx={{ color: '#e8b84b', fontSize: '0.75rem' }} />
              <Typography sx={{ color: '#ffffff', fontSize: '0.72rem', fontWeight: 700 }}>
                {movie.vote_average.toFixed(1)}
              </Typography>
            </Box>
          )}
        </Box>

        {/* Info bar — always visible */}
        <Box sx={{ px: 1.25, py: 1, background: '#141414' }}>
          <Typography
            sx={{
              color: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 600,
              lineHeight: 1.3,
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mb: 0.3
            }}
          >
            {movie.title}
          </Typography>
          {movie.release_date && (
            <Typography sx={{ color: '#999999', fontSize: '0.68rem' }}>
              {movie.release_date.slice(0, 4)}
            </Typography>
          )}
        </Box>
      </Card>
    </motion.div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    poster_path: PropTypes.string,
    title: PropTypes.string.isRequired,
    release_date: PropTypes.string,
    vote_average: PropTypes.number
  }).isRequired
};

export default MovieCard;
