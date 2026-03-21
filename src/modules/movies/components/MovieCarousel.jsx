import React, { useState, useCallback } from 'react';
import { Box, Button, Typography, Rating } from '@mui/material';
import {
  StarRounded,
  ChevronLeft,
  ChevronRight,
  InfoOutlined,
  BookmarkBorderOutlined
} from '@mui/icons-material';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';
import 'swiper/swiper.min.css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import config from '../../../config';
import navigationService from '../../../services/navigation.service';
import MovieGenres from './MovieGenres';

const contentVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', staggerChildren: 0.08 }
  },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
};

function SlideContent({ movie }) {
  // Derive a minimal genres list if genre_ids exist (no lookup available here)
  // The MovieCarousel receives movies from discoverMovies — those have genre_ids not genre objects.
  // We pass genres only if the object has them.
  const genres = movie.genres || [];
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '';

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={movie.id}
        variants={contentVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          top: 0,
          width: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          pointerEvents: 'none'
        }}
      >
        {/* Left content panel */}
        <Box
          sx={{
            width: { xs: '100%', md: '46%' },
            px: { xs: 3, sm: 4, md: 6 },
            pb: { xs: 4, md: 6 },
            pt: { xs: 2, md: 4 },
            pointerEvents: 'auto'
          }}
        >
          {/* Year badge */}
          {year && (
            <motion.div variants={itemVariants}>
              <Box
                sx={{
                  display: 'inline-block',
                  background: 'rgba(232,184,75,0.2)',
                  border: '1px solid rgba(232,184,75,0.4)',
                  borderRadius: '6px',
                  px: 1.25,
                  py: 0.25,
                  mb: 1.5
                }}
              >
                <Typography
                  sx={{
                    color: '#e8b84b',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase'
                  }}
                >
                  {year}
                </Typography>
              </Box>
            </motion.div>
          )}

          {/* Title */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="h2"
              sx={{
                color: '#fafafa',
                fontWeight: 800,
                fontSize: { xs: '1.8rem', sm: '2.4rem', md: '3rem' },
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                mb: 1.5,
                textShadow: '0 2px 20px rgba(0,0,0,0.6)'
              }}
            >
              {movie.title}
            </Typography>
          </motion.div>

          {/* Rating stars */}
          <motion.div variants={itemVariants}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Rating
                value={movie.vote_average / 2}
                precision={0.5}
                readOnly
                size="small"
                icon={<StarRounded sx={{ color: '#e8b84b', fontSize: '1rem' }} />}
                emptyIcon={
                  <StarRounded sx={{ color: 'rgba(232,184,75,0.3)', fontSize: '1rem' }} />
                }
              />
              <Typography sx={{ color: '#e8b84b', fontWeight: 700, fontSize: '0.85rem' }}>
                {movie.vote_average?.toFixed(1)}
                <Typography
                  component="span"
                  sx={{ color: '#999999', fontWeight: 400, fontSize: '0.78rem' }}
                >
                  /10
                </Typography>
              </Typography>
            </Box>
          </motion.div>

          {/* Genres — only if genres array is present */}
          {genres.length > 0 && (
            <motion.div variants={itemVariants}>
              <Box sx={{ mb: 1.5 }}>
                <MovieGenres genres={genres} />
              </Box>
            </motion.div>
          )}

          {/* Overview */}
          {movie.overview && (
            <motion.div variants={itemVariants}>
              <Typography
                sx={{
                  color: 'rgba(250,250,250,0.8)',
                  fontSize: { xs: '0.82rem', sm: '0.9rem' },
                  lineHeight: 1.65,
                  mb: 2.5,
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textShadow: '0 1px 8px rgba(0,0,0,0.5)'
                }}
              >
                {movie.overview}
              </Typography>
            </motion.div>
          )}

          {/* Action buttons */}
          <motion.div variants={itemVariants}>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                startIcon={<InfoOutlined />}
                onClick={() => navigationService.goToMovieDetails(movie.id)}
                sx={{
                  background: '#e8b84b',
                  color: '#0a0a0a',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  borderRadius: '10px',
                  px: 2.5,
                  py: 1,
                  textTransform: 'none',
                  boxShadow: '0 4px 16px rgba(232,184,75,0.4)',
                  '&:hover': {
                    background: '#f5d27a',
                    boxShadow: '0 6px 20px rgba(232,184,75,0.5)'
                  }
                }}
              >
                View Details
              </Button>
              <Button
                variant="outlined"
                startIcon={<BookmarkBorderOutlined />}
                sx={{
                  borderColor: 'rgba(255,255,255,0.25)',
                  color: '#fafafa',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  borderRadius: '10px',
                  px: 2.5,
                  py: 1,
                  textTransform: 'none',
                  backdropFilter: 'blur(8px)',
                  background: 'rgba(255,255,255,0.06)',
                  '&:hover': {
                    borderColor: 'rgba(255,255,255,0.5)',
                    background: 'rgba(255,255,255,0.12)'
                  }
                }}
              >
                Add to Watchlist
              </Button>
            </Box>
          </motion.div>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
}

SlideContent.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    overview: PropTypes.string,
    release_date: PropTypes.string,
    vote_average: PropTypes.number,
    genres: PropTypes.array
  }).isRequired
};

function MovieCarousel({ movies }) {
  const [activeMovie, setActiveMovie] = useState(movies[0] || null);

  const handleSlideChange = useCallback(
    (swiper) => {
      setActiveMovie(movies[swiper.realIndex] || null);
    },
    [movies]
  );

  if (!movies || movies.length === 0) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: '70vh', md: '85vh' },
        overflow: 'hidden',
        background: '#0a0a0a',
        // Custom swiper nav button styles via global CSS-in-JS
        '& .swiper': {
          width: '100%',
          height: '100%'
        },
        '& .swiper-pagination': {
          bottom: '20px',
          zIndex: 20
        },
        '& .swiper-pagination-bullet': {
          background: 'rgba(255,255,255,0.4)',
          opacity: 1,
          width: '6px',
          height: '6px',
          transition: 'all 0.2s'
        },
        '& .swiper-pagination-bullet-active': {
          background: '#e8b84b',
          width: '20px',
          borderRadius: '3px'
        }
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        pagination={{ clickable: true }}
        navigation={{
          prevEl: '.carousel-btn-prev',
          nextEl: '.carousel-btn-next'
        }}
        onSlideChange={handleSlideChange}
        style={{ width: '100%', height: '100%' }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id} style={{ position: 'relative' }}>
            {/* Backdrop image */}
            <Box
              component="img"
              src={config.tmdbApi.backdropBaseUrl + movie.backdrop_path}
              alt={movie.title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
            />

            {/* Left gradient overlay */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to right, rgba(10,10,10,0.95) 30%, rgba(10,10,10,0.4) 70%, transparent 100%)',
                zIndex: 2
              }}
            />

            {/* Bottom gradient overlay */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 50%)',
                zIndex: 2
              }}
            />

            {/* Top gradient for navigation readability */}
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, transparent 25%)',
                zIndex: 2
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Slide content overlay — rendered outside Swiper to avoid re-mounting */}
      {activeMovie && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            pointerEvents: 'none'
          }}
        >
          <SlideContent movie={activeMovie} />
        </Box>
      )}

      {/* Custom glass morphism navigation buttons */}
      <Box
        className="carousel-btn-prev"
        sx={{
          position: 'absolute',
          left: { xs: 12, md: 20 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            background: 'rgba(232,184,75,0.2)',
            borderColor: 'rgba(232,184,75,0.4)'
          },
          '&::after': { display: 'none' }
        }}
      >
        <ChevronLeft sx={{ color: '#fafafa', fontSize: '1.4rem' }} />
      </Box>

      <Box
        className="carousel-btn-next"
        sx={{
          position: 'absolute',
          right: { xs: 12, md: 20 },
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 20,
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '50%',
          cursor: 'pointer',
          transition: 'all 0.2s',
          '&:hover': {
            background: 'rgba(232,184,75,0.2)',
            borderColor: 'rgba(232,184,75,0.4)'
          },
          '&::after': { display: 'none' }
        }}
      >
        <ChevronRight sx={{ color: '#fafafa', fontSize: '1.4rem' }} />
      </Box>
    </Box>
  );
}

MovieCarousel.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      backdrop_path: PropTypes.string.isRequired,
      overview: PropTypes.string,
      release_date: PropTypes.string,
      vote_average: PropTypes.number,
      genres: PropTypes.array
    })
  ).isRequired
};

export default MovieCarousel;
