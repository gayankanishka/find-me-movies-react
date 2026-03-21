import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import movieService from '../../../services/movie-db.service';
import navigationService from '../../../services/navigation.service';
import config from '../../../config';

const SKELETON_OPTIONS = Array.from({ length: 4 }, (_, i) => ({ _skeleton: true, id: `sk-${i}` }));

function MovieSearch() {
  const [open, setOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [inputFocused, setInputFocused] = useState(false);
  const loading = open && movies.length === 0 && query !== '';

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    if (query === '') {
      return () => {
        active = false;
      };
    }

    (async () => {
      const response = await movieService.searchMovies(query);
      if (active) {
        setMovies(response.results);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, query]);

  useEffect(() => {
    if (!open) {
      setMovies([]);
    }
  }, [open]);

  const searchMovies = (e) => {
    setQuery(e.target.value);
    setMovies([]);
  };

  const displayOptions = loading ? SKELETON_OPTIONS : movies;

  return (
    <Autocomplete
      autoComplete
      blurOnSelect
      value={query}
      open={open}
      sx={{ width: '100%' }}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      clearOnBlur
      selectOnFocus
      handleHomeEndKeys
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        if (option.inputValue) return option.inputValue;
        if (option._skeleton) return '';
        return option.title || '';
      }}
      isOptionEqualToValue={(option, value) => {
        if (option._skeleton || value._skeleton) return false;
        return option.id === value.id;
      }}
      options={displayOptions}
      loading={loading}
      noOptionsText={
        query.length > 1 ? (
          <Box sx={{ py: 2, textAlign: 'center' }}>
            <Typography sx={{ color: '#999999', fontSize: '0.875rem' }}>
              No results for &quot;{query}&quot;
            </Typography>
            <Typography sx={{ color: '#555555', fontSize: '0.75rem', mt: 0.5 }}>
              Try a different title or spelling
            </Typography>
          </Box>
        ) : 'Type to search movies...'
      }
      filterOptions={(x) => x}
      onChange={(event, movie) => {
        if (movie && !movie._skeleton) {
          navigationService.goToMovieDetails(movie.id);
          setQuery('');
        }
      }}
      PaperComponent={({ children, ...props }) => (
        <Paper
          {...props}
          sx={{
            background: '#141414',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '12px',
            mt: 0.5,
            overflow: 'hidden',
            boxShadow: '0 16px 40px rgba(0,0,0,0.6)'
          }}
        >
          {children}
        </Paper>
      )}
      renderOption={(props, option) => {
        if (option._skeleton) {
          return (
            <Box
              component="li"
              {...props}
              key={option.id}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                px: 1.5,
                py: 1
              }}
            >
              <Skeleton
                variant="rectangular"
                width={48}
                height={72}
                sx={{ borderRadius: '6px', flexShrink: 0, bgcolor: 'rgba(255,255,255,0.06)' }}
              />
              <Box sx={{ flex: 1 }}>
                <Skeleton
                  variant="text"
                  width="70%"
                  sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}
                />
                <Skeleton
                  variant="text"
                  width="30%"
                  sx={{ bgcolor: 'rgba(255,255,255,0.06)', borderRadius: '4px' }}
                />
              </Box>
            </Box>
          );
        }

        const year = option.release_date ? option.release_date.split('-')[0] : 'N/A';
        const posterSrc = option.poster_path
          ? `${config.tmdbApi.posterBaseUrl}${option.poster_path}`
          : null;

        return (
          <Box
            component="li"
            {...props}
            key={option.id}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              px: 1.5,
              py: 1,
              cursor: 'pointer',
              transition: 'background 0.15s ease',
              '&:hover, &.Mui-focused': {
                background: 'rgba(232,184,75,0.08) !important'
              }
            }}
          >
            {/* Poster thumbnail */}
            <Box
              sx={{
                width: 48,
                height: 72,
                borderRadius: '6px',
                overflow: 'hidden',
                flexShrink: 0,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.06)'
              }}
            >
              {posterSrc ? (
                <Box
                  component="img"
                  src={posterSrc}
                  alt={option.title}
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
                    color: 'rgba(255,255,255,0.2)',
                    fontSize: '1.2rem'
                  }}
                >
                  🎬
                </Box>
              )}
            </Box>

            {/* Title + year */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Box
                sx={{
                  color: '#fafafa',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  lineHeight: 1.3,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
              >
                {option.title}
              </Box>
              <Box
                sx={{
                  color: '#999999',
                  fontSize: '0.75rem',
                  mt: 0.3
                }}
              >
                {year}
              </Box>
            </Box>
          </Box>
        );
      }}
      renderInput={(params) => (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255,255,255,0.06)',
            border: inputFocused
              ? '1px solid rgba(232,184,75,0.5)'
              : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            px: 1.5,
            py: 0.25,
            transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
            boxShadow: inputFocused ? '0 0 0 3px rgba(232,184,75,0.12)' : 'none'
          }}
        >
          <SearchIcon
            sx={{
              color: inputFocused ? '#e8b84b' : 'rgba(255,255,255,0.4)',
              fontSize: '1.1rem',
              mr: 1,
              flexShrink: 0,
              transition: 'color 0.2s ease'
            }}
          />
          <InputBase
            ref={params.InputProps.ref}
            placeholder="Search movies..."
            onChange={searchMovies}
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            inputProps={{ ...params.inputProps }}
            sx={{
              color: '#fafafa',
              fontSize: '0.875rem',
              flex: 1,
              '& input': {
                padding: '6px 0',
                '&::placeholder': {
                  color: 'rgba(255,255,255,0.35)',
                  opacity: 1
                }
              }
            }}
          />
        </Box>
      )}
    />
  );
}

export default MovieSearch;
