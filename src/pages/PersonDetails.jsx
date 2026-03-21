import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Chip,
  CircularProgress,
  Grid,
  Button
} from '@mui/material';
import { CakeRounded, PlaceRounded, WorkRounded } from '@mui/icons-material';
import { motion } from 'framer-motion';
import movieService from '../services/movie-db.service';
import MovieCard from '../modules/movies/components/MovieCard';
import navigationService from '../services/navigation.service';
import config from '../config';

function PersonDetails() {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [bioExpanded, setBioExpanded] = useState(false);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(false);

    Promise.all([
      movieService.getPersonDetails(id),
      movieService.getPersonMovies(id)
    ])
      .then(([personData, creditsData]) => {
        if (!active) return;
        setPerson(personData);
        setMovieCredits(creditsData);
        document.title = `${personData.name} | FindMe Movies`;
      })
      .catch(() => {
        if (!active) return;
        setError(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <CircularProgress sx={{ color: '#818cf8' }} />
      </Box>
    );
  }

  if (error || !person) {
    return (
      <Box
        sx={{
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Typography sx={{ color: '#a1a1aa', fontSize: '1rem' }}>
          Person not found.
        </Typography>
      </Box>
    );
  }

  // Biography helpers
  const BIO_LIMIT = 500;
  const biography = person.biography || '';
  const isBioTruncatable = biography.length > BIO_LIMIT;
  const displayedBio = isBioTruncatable && !bioExpanded
    ? biography.slice(0, BIO_LIMIT) + '…'
    : biography;

  // Birthday / age helpers
  let formattedBirthday = null;
  let age = null;
  let formattedDeathday = null;

  if (person.birthday) {
    formattedBirthday = new Date(person.birthday).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
    if (!person.deathday) {
      age = new Date().getFullYear() - new Date(person.birthday).getFullYear();
    }
  }

  if (person.deathday) {
    formattedDeathday = new Date(person.deathday).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  }

  // Filmography: cast credits sorted by popularity, top 20, poster required
  const filmography = movieCredits?.cast
    ? [...movieCredits.cast]
        .filter((m) => m.poster_path)
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 20)
    : [];

  // Profile photo or initials
  const profileUrl = person.profile_path
    ? `${config.tmdbApi.posterBaseUrl}${person.profile_path}`
    : null;

  const initials = person.name
    ? person.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0].toUpperCase())
        .join('')
    : '?';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* ── Hero ── */}
      <Box
        sx={{
          background: 'linear-gradient(180deg, #0f0f1a 0%, #09090b 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          py: { xs: 4, md: 6 }
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'center', md: 'flex-start' },
              flexDirection: { xs: 'column', md: 'row' },
              gap: { xs: 3, md: 4 }
            }}
          >
            {/* Profile photo */}
            {profileUrl ? (
              <Box
                component="img"
                src={profileUrl}
                alt={person.name}
                sx={{
                  width: { xs: 120, md: 180 },
                  height: { xs: 120, md: 180 },
                  borderRadius: '50%',
                  objectFit: 'cover',
                  flexShrink: 0,
                  border: '3px solid rgba(129,140,248,0.4)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.6)'
                }}
              />
            ) : (
              <Box
                sx={{
                  width: { xs: 120, md: 180 },
                  height: { xs: 120, md: 180 },
                  borderRadius: '50%',
                  flexShrink: 0,
                  background: 'linear-gradient(135deg, #818cf8, #6366f1)',
                  border: '3px solid rgba(129,140,248,0.4)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Typography
                  sx={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: { xs: '2rem', md: '3rem' },
                    letterSpacing: '-0.02em'
                  }}
                >
                  {initials}
                </Typography>
              </Box>
            )}

            {/* Name + info */}
            <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
              <Typography
                component="h1"
                sx={{
                  color: '#fafafa',
                  fontWeight: 800,
                  fontSize: { xs: '1.8rem', md: '2.4rem' },
                  lineHeight: 1.15,
                  mb: 1.5
                }}
              >
                {person.name}
              </Typography>

              {person.known_for_department && (
                <Chip
                  label={person.known_for_department}
                  size="small"
                  sx={{
                    background: 'rgba(129,140,248,0.15)',
                    color: '#818cf8',
                    border: '1px solid rgba(129,140,248,0.3)',
                    fontWeight: 600,
                    mb: 2,
                    fontSize: '0.75rem'
                  }}
                />
              )}

              {/* Stats row */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
                {formattedBirthday && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CakeRounded sx={{ color: '#818cf8', fontSize: '1rem' }} />
                    <Typography sx={{ color: '#a1a1aa', fontSize: '0.875rem' }}>
                      {formattedBirthday}
                      {age !== null && ` (${age} years old)`}
                    </Typography>
                  </Box>
                )}

                {formattedDeathday && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CakeRounded sx={{ color: '#ef4444', fontSize: '1rem' }} />
                    <Typography sx={{ color: '#a1a1aa', fontSize: '0.875rem' }}>
                      Died {formattedDeathday}
                    </Typography>
                  </Box>
                )}

                {person.place_of_birth && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PlaceRounded sx={{ color: '#818cf8', fontSize: '1rem' }} />
                    <Typography sx={{ color: '#a1a1aa', fontSize: '0.875rem' }}>
                      {person.place_of_birth}
                    </Typography>
                  </Box>
                )}

                {person.known_for_department && (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <WorkRounded sx={{ color: '#818cf8', fontSize: '1rem' }} />
                    <Typography sx={{ color: '#a1a1aa', fontSize: '0.875rem' }}>
                      {person.known_for_department}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* ── Body ── */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Biography */}
        {biography.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography
              component="h2"
              sx={{
                color: '#fafafa',
                fontWeight: 700,
                fontSize: '1.25rem',
                mb: 2
              }}
            >
              Biography
            </Typography>
            <Typography
              sx={{
                color: '#a1a1aa',
                fontSize: '0.9375rem',
                lineHeight: 1.8,
                whiteSpace: 'pre-line'
              }}
            >
              {displayedBio}
            </Typography>
            {isBioTruncatable && (
              <Button
                variant="text"
                size="small"
                onClick={() => setBioExpanded((prev) => !prev)}
                sx={{
                  mt: 1,
                  color: '#818cf8',
                  textTransform: 'none',
                  fontWeight: 600,
                  p: 0,
                  minWidth: 0,
                  '&:hover': { background: 'transparent', color: '#6366f1' }
                }}
              >
                {bioExpanded ? 'Show less' : 'Read more'}
              </Button>
            )}
          </Box>
        )}

        {/* Filmography */}
        {filmography.length > 0 && (
          <Box>
            <Typography
              component="h2"
              sx={{
                color: '#fafafa',
                fontWeight: 700,
                fontSize: '1.25rem',
                mb: 3
              }}
            >
              Filmography
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(185px, 1fr))',
                gap: 2
              }}
            >
              {filmography.map((movie) => (
                <Box
                  key={movie.id}
                  onClick={() => navigationService.goToMovieDetails(movie.id)}
                  sx={{ cursor: 'pointer' }}
                >
                  <MovieCard movie={movie} />
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Container>
    </motion.div>
  );
}

export default PersonDetails;
