import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import config from '../../../config';
import navigationService from '../../../services/navigation.service';

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

function MovieCarousel({ movies }) {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          autoplay={{
            delay: 10000
          }}
          navigation
          pagination={{ clickable: true }}
        >
          {movies.map((movie) => (
            <SwiperSlide
              key={movie.id}
              onClick={() => navigationService.goToMovieDetails(movie.id)}
            >
              <img
                alt={movie.title}
                src={config.tmdbApi.backdropBaseUrl + movie.backdrop_path}
                className={classes.background}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Grid>
    </Grid>
  );
}

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
