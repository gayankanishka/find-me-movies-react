import React from 'react';
import PopularMovieGrid from '../modules/movies/components/PopularMovieGrid';
import TopRatedMovieGrid from '../modules/movies/components/TopRatedMovieGrid';
import UpcomingMovies from '../modules/movies/components/UpcomingMovies';
import DiscoverMovies from '../modules/movies/components/DiscoverMovies';

const Home = () => {
  return (
    <>
      <DiscoverMovies />
      <PopularMovieGrid />
      <TopRatedMovieGrid />
      <UpcomingMovies />
    </>
  );
};

export default Home;
