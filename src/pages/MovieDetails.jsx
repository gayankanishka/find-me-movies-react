import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Chip,
  Container,
  CircularProgress,
  Dialog,
  IconButton,
  Rating,
  Skeleton,
  Typography
} from '@mui/material';
import {
  PlayArrowRounded,
  BookmarkBorderRounded,
  StarRounded,
  CloseRounded
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import movieService from '../services/movie-db.service';
import apiService from '../services/_shared/api.service';
import RecommendedMovieGrid from '../modules/movies/components/RecommendedMovieGrid';
import config from '../config';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

function formatRuntime(minutes) {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

function CastCard({ member }) {
  const photoUrl = member.profile_path
    ? `${config.tmdbApi.posterBaseUrl}${member.profile_path}`
    : null;

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ flexShrink: 0, width: 110 }}
    >
      <Box
        sx={{
          borderRadius: '10px',
          overflow: 'hidden',
          background: '#0f0f13',
          border: '1px solid rgba(255,255,255,0.08)',
          cursor: 'default'
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: 140,
            background: 'rgba(255,255,255,0.04)',
            overflow: 'hidden'
          }}
        >
          {photoUrl ? (
            <Box
              component="img"
              src={photoUrl}
              alt={member.name}
              sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                color: 'rgba(255,255,255,0.2)'
              }}
            >
              🎭
            </Box>
          )}
        </Box>
        <Box sx={{ p: 1 }}>
          <Typography
            sx={{
              color: '#fafafa',
              fontSize: '0.72rem',
              fontWeight: 600,
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {member.name}
          </Typography>
          <Typography
            sx={{
              color: '#a1a1aa',
              fontSize: '0.66rem',
              mt: 0.2,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {member.character}
          </Typography>
        </Box>
      </Box>
    </motion.div>
  );
}

function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [movieData, creditsData, videosData] = await Promise.all([
          movieService.getMovieById(id),
          apiService.get(`/movie/${id}/credits`).catch(() => ({ cast: [] })),
          movieService.getMovieVideos(id).catch(() => ({ results: [] }))
        ]);
        setMovie(movieData);
        setCast(creditsData.cast ? creditsData.cast.slice(0, 12) : []);
        const trailer = (videosData.results || []).find(
          (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
        );
        setTrailerKey(trailer ? trailer.key : null);
      } catch {
        try {
          const movieData = await movieService.getMovieById(id);
          setMovie(movieData);
        } catch {
          setMovie(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Clear any background image set by other pages
  useEffect(() => {
    document.getElementById('root').style.backgroundImage = null;
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: '#09090b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress sx={{ color: '#818cf8' }} size={48} thickness={4} />
      </Box>
    );
  }

  if (!movie) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          background: '#09090b',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography sx={{ color: '#a1a1aa' }}>Movie not found.</Typography>
      </Box>
    );
  }

  const backdropUrl = movie.backdrop_path
    ? `${config.tmdbApi.backdropBaseUrl}${movie.backdrop_path}`
    : null;
  const posterUrl = movie.poster_path
    ? `${config.tmdbApi.posterBaseUrl}${movie.poster_path}`
    : null;
  const releaseYear = movie.release_date ? movie.release_date.split('-')[0] : '';
  const runtime = formatRuntime(movie.runtime);
  const ratingValue = movie.vote_average ? movie.vote_average / 2 : 0;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ background: '#09090b', minHeight: '100vh' }}
    >
      {/* ── Hero Section ── */}
      <Box
        sx={{
          position: 'relative',
          height: '70vh',
          minHeight: 480,
          overflow: 'hidden',
          background: '#09090b'
        }}
      >
        {/* Backdrop image */}
        {backdropUrl && (
          <Box
            component="img"
            src={backdropUrl}
            alt=""
            aria-hidden="true"
            sx={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
              opacity: 0.55
            }}
          />
        )}

        {/* Left-to-right gradient overlay */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(9,9,11,0.95) 0%, rgba(9,9,11,0.6) 40%, transparent 100%)'
          }}
        />

        {/* Bottom-to-top fade into page background */}
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to top, #09090b 0%, rgba(9,9,11,0.4) 35%, transparent 100%)'
          }}
        />

        {/* ── Content anchored to hero bottom ── */}
        <Container
          maxWidth="xl"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            pb: { xs: 4, md: 5 },
            px: { xs: 2, md: 4 }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: { xs: 2, md: 3.5 }
            }}
          >
            {/* Poster */}
            {posterUrl && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                style={{ flexShrink: 0 }}
              >
                <Box
                  component="img"
                  src={posterUrl}
                  alt={`${movie.title} poster`}
                  sx={{
                    width: { xs: 110, sm: 140, md: 160 },
                    borderRadius: '12px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
                    display: 'block'
                  }}
                />
              </motion.div>
            )}

            {/* Metadata */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              style={{ flex: 1, minWidth: 0 }}
            >
              {/* Title */}
              <Typography
                sx={{
                  color: '#fafafa',
                  fontWeight: 800,
                  fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem' },
                  lineHeight: 1.15,
                  mb: 0.75,
                  textShadow: '0 2px 12px rgba(0,0,0,0.6)'
                }}
              >
                {movie.title}
              </Typography>

              {/* Year · Runtime */}
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  mb: 1.5,
                  flexWrap: 'wrap'
                }}
              >
                {releaseYear && (
                  <Typography sx={{ color: '#a1a1aa', fontSize: '0.9rem' }}>
                    {releaseYear}
                  </Typography>
                )}
                {runtime && (
                  <>
                    <Box
                      sx={{
                        width: 4,
                        height: 4,
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.3)'
                      }}
                    />
                    <Typography sx={{ color: '#a1a1aa', fontSize: '0.9rem' }}>
                      {runtime}
                    </Typography>
                  </>
                )}
              </Box>

              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.75 }}>
                  {movie.genres.map((genre) => (
                    <Chip
                      key={genre.id}
                      label={genre.name}
                      size="small"
                      sx={{
                        background: 'rgba(129,140,248,0.14)',
                        border: '1px solid rgba(129,140,248,0.3)',
                        color: '#818cf8',
                        fontWeight: 600,
                        fontSize: '0.72rem',
                        height: 24
                      }}
                    />
                  ))}
                </Box>
              )}

              {/* Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2.5 }}>
                <Rating
                  value={ratingValue}
                  precision={0.5}
                  readOnly
                  size="small"
                  icon={<StarRounded sx={{ color: '#f59e0b', fontSize: '1rem' }} />}
                  emptyIcon={
                    <StarRounded sx={{ color: 'rgba(245,158,11,0.25)', fontSize: '1rem' }} />
                  }
                />
                <Typography sx={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.875rem' }}>
                  {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                </Typography>
                {movie.vote_count > 0 && (
                  <Typography sx={{ color: '#a1a1aa', fontSize: '0.78rem' }}>
                    ({movie.vote_count.toLocaleString()} votes)
                  </Typography>
                )}
              </Box>

              {/* Action buttons */}
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                <Box
                  component={motion.button}
                  whileHover={{ scale: trailerKey ? 1.04 : 1 }}
                  whileTap={{ scale: trailerKey ? 0.97 : 1 }}
                  onClick={() => trailerKey && setTrailerOpen(true)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    px: 2.5,
                    py: 1,
                    borderRadius: '10px',
                    background: trailerKey ? '#818cf8' : 'rgba(129,140,248,0.3)',
                    border: 'none',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: trailerKey ? 'pointer' : 'not-allowed',
                    outline: 'none',
                    transition: 'background 0.2s ease',
                    '&:hover': { background: trailerKey ? '#6366f1' : 'rgba(129,140,248,0.3)' }
                  }}
                >
                  <PlayArrowRounded sx={{ fontSize: '1.1rem' }} />
                  {trailerKey ? 'Watch Trailer' : 'No Trailer'}
                </Box>
                <Box
                  component={motion.button}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    px: 2.5,
                    py: 1,
                    borderRadius: '10px',
                    background: 'transparent',
                    border: '1px solid rgba(129,140,248,0.45)',
                    color: '#818cf8',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: 'rgba(129,140,248,0.08)',
                      borderColor: '#818cf8'
                    }
                  }}
                >
                  <BookmarkBorderRounded sx={{ fontSize: '1.1rem' }} />
                  Watchlist
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* ── Below-hero content ── */}
      <Container
        maxWidth="xl"
        sx={{ px: { xs: 2, md: 4 }, py: { xs: 5, md: 6 } }}
      >
        {/* Overview */}
        {movie.overview && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          >
            <Box sx={{ mb: 6 }}>
              <Typography
                sx={{
                  color: '#fafafa',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  mb: 1.5,
                  letterSpacing: '0.01em'
                }}
              >
                Overview
              </Typography>
              <Typography
                sx={{
                  color: '#a1a1aa',
                  fontSize: '0.95rem',
                  lineHeight: 1.8,
                  maxWidth: 820
                }}
              >
                {movie.overview}
              </Typography>
            </Box>
          </motion.div>
        )}

        {/* Cast */}
        {cast.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.35 }}
          >
            <Box sx={{ mb: 6 }}>
              <Typography
                sx={{
                  color: '#fafafa',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  mb: 2,
                  letterSpacing: '0.01em'
                }}
              >
                Cast
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1.5,
                  overflowX: 'auto',
                  pb: 1,
                  '&::-webkit-scrollbar': { height: 4 },
                  '&::-webkit-scrollbar-track': { background: 'transparent' },
                  '&::-webkit-scrollbar-thumb': {
                    background: 'rgba(255,255,255,0.12)',
                    borderRadius: '2px'
                  }
                }}
              >
                {cast.map((member) => (
                  <CastCard key={member.id} member={member} />
                ))}
              </Box>
            </Box>
          </motion.div>
        )}

        {/* More Like This */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.45 }}
        >
          <Box>
            <RecommendedMovieGrid id={id} />
          </Box>
        </motion.div>
      </Container>

      {/* Trailer Modal */}
      <Dialog
        open={trailerOpen}
        onClose={() => setTrailerOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            background: '#09090b',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            overflow: 'hidden'
          }
        }}
      >
        <Box sx={{ position: 'relative', pt: '56.25%', background: '#000' }}>
          <IconButton
            onClick={() => setTrailerOpen(false)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 10,
              color: '#fff',
              background: 'rgba(0,0,0,0.6)',
              '&:hover': { background: 'rgba(0,0,0,0.85)' }
            }}
          >
            <CloseRounded />
          </IconButton>
          {trailerOpen && trailerKey && (
            <Box
              component="iframe"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
              title="Trailer"
              allow="autoplay; encrypted-media"
              allowFullScreen
              sx={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none'
              }}
            />
          )}
        </Box>
      </Dialog>
    </motion.div>
  );
}

export default MovieDetails;
