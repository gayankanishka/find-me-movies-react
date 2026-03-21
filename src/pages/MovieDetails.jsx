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
  Snackbar,
  Typography
} from '@mui/material';
import {
  PlayArrowRounded,
  StarRounded,
  CloseRounded,
  ShareRounded
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import movieService from '../services/movie-db.service';
import apiService from '../services/_shared/api.service';
import navigationService from '../services/navigation.service';
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

function ReviewCard({ review }) {
  const [expanded, setExpanded] = useState(false);
  const content = review.content || '';
  const isLong = content.length > 300;
  return (
    <Box
      sx={{
        background: '#0f0f13',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        p: 2.5
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: '#818cf8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Typography sx={{ color: '#fff', fontWeight: 700, fontSize: '0.875rem' }}>
            {review.author?.charAt(0)?.toUpperCase() || '?'}
          </Typography>
        </Box>
        <Box>
          <Typography sx={{ color: '#fafafa', fontWeight: 600, fontSize: '0.875rem' }}>
            {review.author}
          </Typography>
          <Typography sx={{ color: '#a1a1aa', fontSize: '0.75rem' }}>
            {review.created_at
              ? new Date(review.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })
              : ''}
          </Typography>
        </Box>
        {review.author_details?.rating && (
          <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarRounded sx={{ color: '#f59e0b', fontSize: '1rem' }} />
            <Typography sx={{ color: '#f59e0b', fontWeight: 700, fontSize: '0.875rem' }}>
              {review.author_details.rating}/10
            </Typography>
          </Box>
        )}
      </Box>
      <Typography sx={{ color: '#a1a1aa', fontSize: '0.875rem', lineHeight: 1.7 }}>
        {expanded || !isLong ? content : `${content.slice(0, 300)}...`}
      </Typography>
      {isLong && (
        <Box
          component="button"
          onClick={() => setExpanded((e) => !e)}
          sx={{
            mt: 1,
            color: '#818cf8',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 600,
            p: 0
          }}
        >
          {expanded ? 'Show less' : 'Read more'}
        </Box>
      )}
    </Box>
  );
}

function CastCard({ member }) {
  const photoUrl = member.profile_path
    ? `${config.tmdbApi.posterBaseUrl}${member.profile_path}`
    : null;

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      style={{ flexShrink: 0, width: 110, cursor: 'pointer' }}
      onClick={() => navigationService.goToPerson(member.id)}
    >
      <Box
        sx={{
          borderRadius: '10px',
          overflow: 'hidden',
          background: '#0f0f13',
          border: '1px solid rgba(255,255,255,0.08)',
          cursor: 'pointer'
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
  const [director, setDirector] = useState(null);
  const [writers, setWriters] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [providers, setProviders] = useState({});
  const [keywords, setKeywords] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  // Dynamic document title
  useEffect(() => {
    if (movie) document.title = `${movie.title} | FindMe Movies`;
    return () => {
      document.title = 'FindMe Movies';
    };
  }, [movie]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [movieData, creditsData, videosData, providersData, keywordsData, reviewsData] =
          await Promise.all([
            movieService.getMovieById(id),
            apiService.get(`/movie/${id}/credits`).catch(() => ({ cast: [], crew: [] })),
            movieService.getMovieVideos(id).catch(() => ({ results: [] })),
            apiService.get(`/movie/${id}/watch/providers`).catch(() => ({ results: {} })),
            apiService.get(`/movie/${id}/keywords`).catch(() => ({ keywords: [] })),
            apiService.get(`/movie/${id}/reviews`).catch(() => ({ results: [] }))
          ]);

        setMovie(movieData);

        // Cast
        setCast(creditsData.cast ? creditsData.cast.slice(0, 12) : []);

        // Crew — director & writers
        setDirector(creditsData.crew?.find((c) => c.job === 'Director') || null);
        setWriters(
          creditsData.crew
            ?.filter((c) => ['Writer', 'Screenplay', 'Story'].includes(c.job))
            .slice(0, 2) || []
        );

        // Trailer
        const trailer = (videosData.results || []).find(
          (v) => v.site === 'YouTube' && (v.type === 'Trailer' || v.type === 'Teaser')
        );
        setTrailerKey(trailer ? trailer.key : null);

        // Watch providers — prefer US region, fall back to first available
        const regionProviders =
          providersData.results?.US ||
          Object.values(providersData.results || {})[0] ||
          {};
        setProviders(regionProviders);

        // Keywords (up to 12)
        setKeywords(keywordsData.keywords?.slice(0, 12) || []);

        // Reviews (up to 3)
        setReviews(reviewsData.results?.slice(0, 3) || []);
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: movie.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
    }
  };

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
  const hasProviders =
    providers.flatrate?.length > 0 || providers.rent?.length > 0 || providers.buy?.length > 0;

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

              {/* Collection / Franchise */}
              {movie.belongs_to_collection && (
                <Box sx={{ mb: 1.5 }}>
                  <Typography sx={{ color: '#a1a1aa', fontSize: '0.82rem' }}>
                    Part of{' '}
                    <Box component="span" sx={{ color: '#818cf8', fontWeight: 600 }}>
                      {movie.belongs_to_collection.name}
                    </Box>
                  </Typography>
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

              {/* Director */}
              {director && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 0.75 }}>
                  <Typography sx={{ color: '#a1a1aa', fontSize: '0.82rem', minWidth: 60 }}>
                    Director
                  </Typography>
                  <Typography sx={{ color: '#fafafa', fontSize: '0.82rem', fontWeight: 600 }}>
                    {director.name}
                  </Typography>
                </Box>
              )}

              {/* Writers */}
              {writers?.length > 0 && (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1.5 }}>
                  <Typography sx={{ color: '#a1a1aa', fontSize: '0.82rem', minWidth: 60 }}>
                    Writers
                  </Typography>
                  <Typography sx={{ color: '#fafafa', fontSize: '0.82rem', fontWeight: 600 }}>
                    {writers.map((w) => w.name).join(', ')}
                  </Typography>
                </Box>
              )}

              {/* Budget & Revenue */}
              {(movie.budget > 0 || movie.revenue > 0) && (
                <Box sx={{ display: 'flex', gap: 3, mb: 1.5 }}>
                  {movie.budget > 0 && (
                    <Box>
                      <Typography sx={{ color: '#a1a1aa', fontSize: '0.75rem' }}>Budget</Typography>
                      <Typography sx={{ color: '#fafafa', fontSize: '0.82rem', fontWeight: 600 }}>
                        ${(movie.budget / 1_000_000).toFixed(0)}M
                      </Typography>
                    </Box>
                  )}
                  {movie.revenue > 0 && (
                    <Box>
                      <Typography sx={{ color: '#a1a1aa', fontSize: '0.75rem' }}>Revenue</Typography>
                      <Typography sx={{ color: '#fafafa', fontSize: '0.82rem', fontWeight: 600 }}>
                        ${(movie.revenue / 1_000_000).toFixed(0)}M
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}

              {/* Action buttons */}
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {/* Watch Trailer */}
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
                    '&:hover': {
                      background: trailerKey ? '#6366f1' : 'rgba(129,140,248,0.3)'
                    }
                  }}
                >
                  <PlayArrowRounded sx={{ fontSize: '1.1rem' }} />
                  {trailerKey ? 'Watch Trailer' : 'No Trailer'}
                </Box>

                {/* Share */}
                <Box
                  component={motion.button}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleShare}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.75,
                    px: 2.5,
                    py: 1,
                    borderRadius: '10px',
                    background: 'transparent',
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: '#fafafa',
                    fontWeight: 700,
                    fontSize: '0.875rem',
                    cursor: 'pointer',
                    outline: 'none',
                    transition: 'border-color 0.2s ease, background 0.2s ease',
                    '&:hover': {
                      borderColor: 'rgba(255,255,255,0.35)',
                      background: 'rgba(255,255,255,0.05)'
                    }
                  }}
                >
                  <ShareRounded sx={{ fontSize: '1.1rem' }} />
                  Share
                </Box>
              </Box>
            </motion.div>
          </Box>
        </Container>
      </Box>

      {/* ── Below-hero content ── */}
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, py: { xs: 5, md: 6 } }}>
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

        {/* Where to Watch */}
        {hasProviders && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.28 }}
          >
            <Box sx={{ mb: 6 }}>
              <Typography sx={{ color: '#fafafa', fontWeight: 700, fontSize: '1.2rem', mb: 2 }}>
                Where to Watch
              </Typography>

              {providers.flatrate && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      color: '#a1a1aa',
                      fontSize: '0.78rem',
                      mb: 1,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}
                  >
                    Stream
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                    {providers.flatrate.map((p) => (
                      <Box
                        key={p.provider_id}
                        title={p.provider_name}
                        component="img"
                        src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
                        alt={p.provider_name}
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '10px',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {providers.rent && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      color: '#a1a1aa',
                      fontSize: '0.78rem',
                      mb: 1,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}
                  >
                    Rent
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                    {providers.rent.map((p) => (
                      <Box
                        key={p.provider_id}
                        title={p.provider_name}
                        component="img"
                        src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
                        alt={p.provider_name}
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '10px',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              {providers.buy && (
                <Box sx={{ mb: 2 }}>
                  <Typography
                    sx={{
                      color: '#a1a1aa',
                      fontSize: '0.78rem',
                      mb: 1,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em'
                    }}
                  >
                    Buy
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                    {providers.buy.map((p) => (
                      <Box
                        key={p.provider_id}
                        title={p.provider_name}
                        component="img"
                        src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
                        alt={p.provider_name}
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: '10px',
                          border: '1px solid rgba(255,255,255,0.1)'
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              )}

              <Typography sx={{ color: '#52525b', fontSize: '0.7rem', mt: 1 }}>
                Powered by JustWatch
              </Typography>
            </Box>
          </motion.div>
        )}

        {/* Keywords */}
        {keywords.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography sx={{ color: '#fafafa', fontWeight: 700, fontSize: '1.2rem', mb: 1.5 }}>
              Keywords
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {keywords.map((kw) => (
                <Chip
                  key={kw.id}
                  label={kw.name}
                  size="small"
                  sx={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#a1a1aa',
                    fontSize: '0.75rem',
                    borderRadius: '6px'
                  }}
                />
              ))}
            </Box>
          </Box>
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

        {/* Reviews */}
        {reviews.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.55 }}
          >
            <Box sx={{ mt: 6 }}>
              <Typography sx={{ color: '#fafafa', fontWeight: 700, fontSize: '1.2rem', mb: 2 }}>
                Reviews
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </Box>
            </Box>
          </motion.div>
        )}
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

      {/* "Link copied!" Snackbar */}
      <Snackbar
        open={copied}
        autoHideDuration={2000}
        onClose={() => setCopied(false)}
        message="Link copied!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        ContentProps={{
          sx: {
            background: '#1e1e24',
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#fafafa',
            borderRadius: '10px',
            fontWeight: 600
          }
        }}
      />
    </motion.div>
  );
}

export default MovieDetails;
