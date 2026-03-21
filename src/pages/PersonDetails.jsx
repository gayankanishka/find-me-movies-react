import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Chip,
  CircularProgress,
  Button,
  Divider
} from '@mui/material';
import {
  CakeRounded,
  PlaceRounded,
  WorkRounded,
  StarRounded,
  OpenInNewRounded,
  PersonRounded
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import movieService from '../services/movie-db.service';
import MovieCard from '../modules/movies/components/MovieCard';
import navigationService from '../services/navigation.service';
import config from '../config';

const GENDER_MAP = { 1: 'Female', 2: 'Male', 3: 'Non-binary' };

function InfoRow({ label, value }) {
  if (!value) return null;
  return (
    <Box sx={{ mb: 2 }}>
      <Typography sx={{ color: '#a1a1aa', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.4 }}>
        {label}
      </Typography>
      <Typography sx={{ color: '#fafafa', fontSize: '0.875rem', lineHeight: 1.5 }}>
        {value}
      </Typography>
    </Box>
  );
}

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
      document.title = 'FindMe Movies';
    };
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress sx={{ color: '#818cf8' }} />
      </Box>
    );
  }

  if (error || !person) {
    return (
      <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography sx={{ color: '#a1a1aa' }}>Person not found.</Typography>
      </Box>
    );
  }

  // Biography
  const BIO_LIMIT = 600;
  const biography = person.biography || '';
  const isBioLong = biography.length > BIO_LIMIT;
  const displayedBio = isBioLong && !bioExpanded ? `${biography.slice(0, BIO_LIMIT)}…` : biography;

  // Age / dates
  let formattedBirthday = null;
  let age = null;
  let formattedDeathday = null;

  if (person.birthday) {
    const birth = new Date(person.birthday);
    formattedBirthday = birth.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    if (!person.deathday) {
      const today = new Date();
      age = today.getFullYear() - birth.getFullYear();
      if (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate())) age -= 1;
    }
  }

  if (person.deathday) {
    formattedDeathday = new Date(person.deathday).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    if (person.birthday) {
      const birth = new Date(person.birthday);
      const death = new Date(person.deathday);
      age = death.getFullYear() - birth.getFullYear();
      if (death < new Date(death.getFullYear(), birth.getMonth(), birth.getDate())) age -= 1;
    }
  }

  // Filmography
  const filmography = movieCredits?.cast
    ? [...movieCredits.cast]
        .filter((m) => m.poster_path)
        .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
        .slice(0, 24)
    : [];

  // Profile
  const profileUrl = person.profile_path
    ? `${config.tmdbApi.posterBaseUrl}${person.profile_path}`
    : null;

  const initials = person.name
    ? person.name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join('')
    : '?';

  const alsoKnownAs = person.also_known_as?.slice(0, 4).join(', ');
  const gender = GENDER_MAP[person.gender];
  const imdbUrl = person.imdb_id ? `https://www.imdb.com/name/${person.imdb_id}` : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: { xs: 4, md: 5 },
            alignItems: { xs: 'center', md: 'flex-start' }
          }}
        >
          {/* ── Left sidebar ── */}
          <Box sx={{ flexShrink: 0, width: { xs: '100%', md: 260 }, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>

            {/* Profile photo */}
            {profileUrl ? (
              <Box
                component="img"
                src={profileUrl}
                alt={person.name}
                sx={{
                  width: { xs: 160, md: 240 },
                  height: { xs: 160, md: 360 },
                  borderRadius: '12px',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  border: '1px solid rgba(255,255,255,0.08)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
                  mb: 3
                }}
              />
            ) : (
              <Box
                sx={{
                  width: { xs: 160, md: 240 },
                  height: { xs: 160, md: 360 },
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #1a1a2e, #0f0f1a)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  mb: 3
                }}
              >
                <PersonRounded sx={{ fontSize: 64, color: 'rgba(255,255,255,0.15)' }} />
                <Typography sx={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>No Photo</Typography>
              </Box>
            )}

            {/* Personal Info card */}
            <Box sx={{ width: '100%', textAlign: { xs: 'center', md: 'left' } }}>
              <Typography sx={{ color: '#fafafa', fontWeight: 700, fontSize: '1rem', mb: 2 }}>
                Personal Info
              </Typography>

              <InfoRow label="Known For" value={person.known_for_department} />
              <InfoRow label="Gender" value={gender} />

              {person.birthday && (
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ color: '#a1a1aa', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.4 }}>
                    Born
                  </Typography>
                  <Typography sx={{ color: '#fafafa', fontSize: '0.875rem' }}>
                    {formattedBirthday}
                    {age !== null && !person.deathday && (
                      <Box component="span" sx={{ color: '#a1a1aa' }}> ({age} years old)</Box>
                    )}
                  </Typography>
                </Box>
              )}

              {person.deathday && (
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ color: '#a1a1aa', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.4 }}>
                    Died
                  </Typography>
                  <Typography sx={{ color: '#fafafa', fontSize: '0.875rem' }}>
                    {formattedDeathday}
                    {age !== null && (
                      <Box component="span" sx={{ color: '#a1a1aa' }}> (aged {age})</Box>
                    )}
                  </Typography>
                </Box>
              )}

              <InfoRow label="Place of Birth" value={person.place_of_birth} />
              <InfoRow label="Also Known As" value={alsoKnownAs} />

              {person.popularity && (
                <Box sx={{ mb: 2 }}>
                  <Typography sx={{ color: '#a1a1aa', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 0.4 }}>
                    Popularity Score
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <StarRounded sx={{ color: '#f59e0b', fontSize: '1rem' }} />
                    <Typography sx={{ color: '#fafafa', fontSize: '0.875rem', fontWeight: 600 }}>
                      {person.popularity.toFixed(1)}
                    </Typography>
                  </Box>
                </Box>
              )}

              {/* External links */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
                {imdbUrl && (
                  <Button
                    component="a"
                    href={imdbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    endIcon={<OpenInNewRounded sx={{ fontSize: '0.85rem' }} />}
                    sx={{
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      color: '#f59e0b',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      p: 0,
                      minWidth: 0,
                      '&:hover': { background: 'transparent', color: '#fbbf24' }
                    }}
                  >
                    View on IMDb
                  </Button>
                )}
                {person.homepage && (
                  <Button
                    component="a"
                    href={person.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    endIcon={<OpenInNewRounded sx={{ fontSize: '0.85rem' }} />}
                    sx={{
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      color: '#818cf8',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: '0.82rem',
                      p: 0,
                      minWidth: 0,
                      '&:hover': { background: 'transparent', color: '#a5b4fc' }
                    }}
                  >
                    Official Website
                  </Button>
                )}
              </Box>
            </Box>
          </Box>

          {/* ── Right main content ── */}
          <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>

            {/* Name + department */}
            <Typography
              component="h1"
              sx={{
                color: '#fafafa',
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '2.8rem' },
                lineHeight: 1.1,
                mb: 1
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
                  fontSize: '0.75rem',
                  mb: 3
                }}
              />
            )}

            <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', mb: 3 }} />

            {/* Biography */}
            {biography.length > 0 ? (
              <Box sx={{ mb: 5 }}>
                <Typography sx={{ color: '#fafafa', fontWeight: 700, fontSize: '1.15rem', mb: 1.5 }}>
                  Biography
                </Typography>
                <Typography sx={{ color: '#a1a1aa', fontSize: '0.9375rem', lineHeight: 1.85, whiteSpace: 'pre-line' }}>
                  {displayedBio}
                </Typography>
                {isBioLong && (
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => setBioExpanded((prev) => !prev)}
                    sx={{ mt: 1, color: '#818cf8', textTransform: 'none', fontWeight: 600, p: 0, minWidth: 0, '&:hover': { background: 'transparent', color: '#6366f1' } }}
                  >
                    {bioExpanded ? 'Show less' : 'Read more'}
                  </Button>
                )}
              </Box>
            ) : (
              <Box sx={{ mb: 5 }}>
                <Typography sx={{ color: '#fafafa', fontWeight: 700, fontSize: '1.15rem', mb: 1.5 }}>Biography</Typography>
                <Typography sx={{ color: '#52525b', fontSize: '0.9rem', fontStyle: 'italic' }}>
                  No biography available for {person.name}.
                </Typography>
              </Box>
            )}

            {/* Filmography */}
            {filmography.length > 0 && (
              <Box>
                <Typography sx={{ color: '#fafafa', fontWeight: 700, fontSize: '1.15rem', mb: 3 }}>
                  Filmography
                  <Box component="span" sx={{ color: '#52525b', fontWeight: 400, fontSize: '0.85rem', ml: 1.5 }}>
                    ({filmography.length} titles)
                  </Box>
                </Typography>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
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
          </Box>
        </Box>
      </Container>
    </motion.div>
  );
}

export default PersonDetails;
