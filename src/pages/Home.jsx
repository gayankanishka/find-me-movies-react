import React from 'react';
import PopularMovieGrid from '../modules/movies/components/PopularMovieGrid';
import TopRatedMovies from '../modules/movies/components/TopRatedMovies';
import UpcomingMovies from '../modules/movies/components/UpcomingMovies';
import DiscoverMovies from '../modules/movies/components/DiscoverMovies';

const Home = () => {
  return (
    <>
      <DiscoverMovies />
      <PopularMovieGrid />
      <TopRatedMovies />
      <UpcomingMovies />
    </>
  );
};

export default Home;
