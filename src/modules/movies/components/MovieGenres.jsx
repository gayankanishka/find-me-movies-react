import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

function MovieGenres({ genres }) {
  return (
    <Grid container direction="row" alignItems="baseline">
      <Typography variant="h6">Genres: </Typography>
      {genres.map((genre, index) => (
        <Typography variant="overline" component="h3" key={genre.id}>
          &nbsp;
          {genre.name}
          {index === genres.length - 1 ? '' : ', '}
        </Typography>
      ))}
    </Grid>
  );
}

MovieGenres.propTypes = {
  genres: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired
};

export default MovieGenres;
