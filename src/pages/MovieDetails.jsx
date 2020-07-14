import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import movieService from '../services/movie-db.service';
import Loader from '../components/Loader';
import MoviePoster from '../modules/movies/components/MoviePoster';
import MovieRating from '../modules/movies/components/MovieRating';
import MovieGenres from '../modules/movies/components/MovieGenres';
import MovieTitle from '../modules/movies/components/MovieTitle';
import InlineDescriptor from '../components/InlineDescriptor';
import Paragraph from '../components/Paragraph';
import config from '../config';
import RecommendedMovies from '../modules/movies/components/RecommendedMovies';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    alignItems: 'center'
  },
  contentWrapper: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(5px)',
    padding: theme.spacing(2),
    margin: '1rem'
  }
}));

const MovieDetails = () => {
  const classes = useStyles();
  const [movie, setMovie] = useState();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const data = await movieService.getMovieById(id);
      setMovie(data);
    };

    fetchData();
  }, [id]);

  if (movie === undefined) {
    return <Loader />;
  }

  document.getElementById('root').style.backgroundImage = `url(
    ${config.tmdbApi.backdropBaseUrl}${movie.backdrop_path}
  )`;

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
      <Grid item xs={12}>
        <RecommendedMovies id={id} />
      </Grid>
    </Grid>
  );
};

export default MovieDetails;
