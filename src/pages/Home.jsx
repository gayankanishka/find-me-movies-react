import React from 'react';
import PopularMovieGrid from '../modules/movies/components/PopularMovieGrid';
import TopRatedMovieGrid from '../modules/movies/components/TopRatedMovieGrid';
import UpcomingMovieGrid from '../modules/movies/components/UpcomingMovieGrid';
import DiscoverMovies from '../modules/movies/components/DiscoverMovies';

const Home = () => {
  document.getElementById('root').style.backgroundImage = null;

  return (
    <>
      <DiscoverMovies />
      <PopularMovieGrid />
      <TopRatedMovieGrid />
      <UpcomingMovieGrid />
    </>
  );
};

export default Home;
