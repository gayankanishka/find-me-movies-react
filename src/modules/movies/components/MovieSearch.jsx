import React, { useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import movieService from '../../../services/movie-db.service';

const MovieSearch = () => {
  const [open, setOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const loading = open && query && movies.length === 0;

  useEffect(() => {
    let active = true;

    if (query === '') {
      return () => {
        active = false;
      };
    }

    if (!loading) {
      return undefined;
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
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setMovies([]);
    }
  }, [open]);

  const searchMovies = (e) => {
    setQuery(e.target.value);
    setMovies([]);
  };

  return (
    <Autocomplete
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionSelected={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={movies}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={searchMovies}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            )
          }}
        />
      )}
    />
  );
};

export default MovieSearch;
