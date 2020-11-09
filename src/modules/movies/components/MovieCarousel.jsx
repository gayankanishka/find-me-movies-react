import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import 'swiper/swiper-bundle.css';
import config from '../../../config';
import MovieCard from './MovieCard';

const useStyles = makeStyles(() => ({
  background: {
    maxHeight: '100vh',
    maxWidth: '100%'
  },
  poster: {
    top: '50%',
    left: '50%',
    position: 'absolute',
    transform: 'translate(-50%, -50%)'
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
        >
          {movies.map((movie) => {
            return (
              <SwiperSlide key={movie.id}>
                <div className={classes.poster}>
                  <MovieCard movie={movie} />
                </div>
                <img
                  alt={movie.title}
                  src={config.tmdbApi.backdropBaseUrl + movie.backdrop_path}
                  className={classes.background}
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
      backdrop_path: PropTypes.string.isRequired
    })
  ).isRequired
};

export default MovieCarousel;
