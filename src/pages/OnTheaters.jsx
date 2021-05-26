import React, { useState, useEffect } from 'react';
import { Typography } from '@material-ui/core';
import InfiniteScroll from 'react-infinite-scroll-component';
import movieService from '../services/movie-db.service';
import VerticalMovieList from '../modules/movies/components/VerticalMovieList';
import SkeltonLoader from '../components/SkeltonLoader';

const OnTheaters = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const data = await movieService.getNowPlayingMovies();
      setMovies(data.results);
      setPage(data.page);
    };

    fetchData();
  }, []);

  const fetchMovies = async () => {
    const data = await movieService.getNowPlayingMovies(page + 1);
    setMovies((prev) => [...prev, ...data.results]);
    setPage(data.page);
  };

  document.getElementById('root').style.backgroundImage = null;

  return (
    <>
      <Typography variant="h6">On Theaters</Typography>
      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMovies}
        hasMore={page !== 1000}
        loader={<SkeltonLoader />}
      >
        <VerticalMovieList movies={movies} />
      </InfiniteScroll>
    </>
  );
};

export default OnTheaters;
