import React from 'react';
import PopularMovies from './modules/movies/components/PopularMovies';
import TopRatedMovies from './modules/movies/components/TopRatedMovies';
import UpcomingMovies from './modules/movies/components/UpcomingMovies';
import DiscoverMovies from './modules/movies/components/DiscoverMovies';

const Home = () => {
  document.getElementById('root').style.backgroundImage = null;

  return (
    <>
      <DiscoverMovies />
      <PopularMovies />
      <TopRatedMovies />
      <UpcomingMovies />
    </>
  );
};

export default Home;
