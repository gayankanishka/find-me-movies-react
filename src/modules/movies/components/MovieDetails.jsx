import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
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
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  }
}));

const MovieDetails = () => {
  const classes = useStyles();
  const [movie, setMovie] = useState();
  const { id } = useParams();

  console.log(movie);
  // convert native html elements to material elements

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
        <div className={classes.titleWrapper}>
          <Typography variant="h4">{movie.title}</Typography>
          <Typography variant="h4">
            &nbsp;(
            {movie.release_date.split('-')[0]}
            )&nbsp;
          </Typography>
        </div>
        <div className={classes.titleWrapper}>
          <Typography variant="h6">Genres: </Typography>
          {movie.genres.map((genre, index) => {
            return (
              <Typography variant="overline" component="h3" key={genre.id}>
                &nbsp;
                {genre.name}
                {index === movie.genres.length - 1 ? '' : ', '}
              </Typography>
            );
          })}
        </div>
        <div className={classes.titleWrapper}>
          <Typography variant="h6" display="block">
            Rating:&nbsp;
          </Typography>
          <Rating
            name="disabled"
            value={movie.vote_average}
            max={10}
            precision={0.5}
            disabled
          />
        </div>
        <Typography variant="body1" paragraph>
          {movie.overview}
        </Typography>
      </div>
    </div>
  );
};

export default MovieDetails;
