import React from 'react';
import PopularMovies from './modules/movies/components/PopularMovies';
import TopRatedMovies from './modules/movies/components/TopRatedMovies';
import UpcomingMovies from './modules/movies/components/UpcomingMovies';

const Home = () => {
  document.body.style.backgroundImage = null;

  return (
    <>
      <PopularMovies />
      <TopRatedMovies />
      <UpcomingMovies />
    </>
  );
};

export default Home;
