import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, InputBase } from '@material-ui/core';
import movieService from '../../../services/movie-db.service';
import navigationService from '../../../services/navigation.service';

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch'
      }
    }
  }
}));

const MovieSearch = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
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

  return (
    <Autocomplete
      autoComplete
      blurOnSelect
      value={query}
      open={open}
      style={{ width: '100%' }}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      clearOnBlur
      selectOnFocus
      handleHomeEndKeys
      getOptionLabel={(option) => {
        if (typeof option === 'string') {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.title;
      }}
      options={movies}
      loading={loading}
      onChange={(event, movie) => {
        if (movie) {
          navigationService.goToMovieDetails(movie.id);
          setQuery('');
        }
      }}
      getOptionSelected={(option, value) => {
        return value.value === option.value;
      }}
      renderInput={(params) => (
        <InputBase
          ref={params.InputProps.ref}
          classes={{
            root: classes.inputRoot,
            input: classes.inputInput
          }}
          placeholder="Search..."
          onChange={searchMovies}
          inputProps={{
            ...params.inputProps
          }}
        />
      )}
    />
  );
};

export default MovieSearch;
