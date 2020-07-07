import React from 'react';
import { Grid, makeStyles, Paper } from '@material-ui/core';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import 'swiper/swiper-bundle.css';
import config from '../../../config';
import navigationService from '../../../services/navigation.service';
import MovieTitle from './MovieTitle';
import MovieRating from './MovieRating';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(2)
  },
  swipeSlide: {
    cursor: 'pointer'
  },
  image: {
    maxHeight: '100%',
    maxWidth: '100%'
  },
  title: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(5px)'
  }
}));

const MovieCarousel = ({ movies }) => {
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Swiper
          slidesPerView={1}
          autoplay={{
            delay: 10000
          }}
          navigation
          pagination={{ clickable: true }}
          className={classes.root}
        >
          {movies.map((movie) => {
            return (
              <SwiperSlide
                key={movie.id}
                className={classes.swipeSlide}
                onClick={() => navigationService.goToMovieDetails(movie.id)}
              >
                <Paper elevation={3} className={classes.title}>
                  <MovieTitle
                    title={movie.title}
                    releaseDate={movie.release_date}
                  />
                  <MovieRating voteAvg={movie.vote_average} />
                </Paper>
                <img
                  alt={movie.title}
                  src={config.tmdbApi.backdropBaseUrl + movie.backdrop_path}
                  className={classes.image}
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </Grid>
    </Grid>
  );
};

MovieCarousel.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired
    })
  ).isRequired
};

export default MovieCarousel;
