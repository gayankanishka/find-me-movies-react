import React, { useEffect, useState } from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles, InputBase } from '@material-ui/core';
import movieService from '../../../services/movie-db.service';

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
      open={open}
      style={{ width: '100%' }}
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
