import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import movieService from '../../../services/movie-db.service';
import Loader from '../../../components/Loader';
import MoviePoster from './MoviePoster';
import MovieRating from './MovieRating';
import MovieGenres from './MovieGenres';
import MovieTitle from './MovieTitle';
import InlineDescriptor from '../../../components/InlineDescriptor';
import Paragraph from '../../../components/Paragraph';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  contentWrapper: {
    padding: theme.spacing(2)
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
    <Grid container direction="row" className={classes.root}>
      <MoviePoster path={movie.poster_path} />
      <Grid item xs={12} sm={6} className={classes.contentWrapper}>
        <MovieTitle title={movie.title} releaseDate={movie.release_date} />
        <MovieGenres genres={movie.genres} />
        <MovieRating voteAvg={movie.vote_average} />
        <InlineDescriptor title="Runtime" description={movie.runtime} />
        <InlineDescriptor
          title="Release date"
          description={movie.release_date}
        />
        <Paragraph body={movie.overview} />
      </Grid>
    </Grid>
  );
};

export default MovieDetails;
