import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card } from '@material-ui/core';
import movieService from '../../../services/movie-db.service';
import config from '../../../config';
import Loader from '../../../components/Loader';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      'flex-direction': 'column'
    }
  },
  cardWrapper: {
    maxWidth: 330,
    padding: '1rem',
    flex: 1
  },
  contentWrapper: {
    flex: 1,
    padding: '1rem'
  },
  imageWrapper: {
    maxWidth: 300
  }
}));

const MovieDetails = () => {
  const classes = useStyles();
  const [movie, setMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    movieService.getMovieById(id).then((data) => setMovie(data));
  }, [id]);

  if (movie === undefined) {
    return <Loader />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.cardWrapper}>
        <Card elevation={5}>
          <img
            className={classes.imageWrapper}
            src={config.tmdbApi.imageBaseUrl + movie.poster_path}
            alt="poster"
          />
        </Card>
      </div>
      <div className={classes.contentWrapper}>
        <h1>{movie.title}</h1>
        <h1>{movie.release_date}</h1>
        <p>{movie.overview}</p>
      </div>
    </div>
  );
};

export default MovieDetails;
