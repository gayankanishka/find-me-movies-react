import React, { useState, useEffect, useMemo } from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import { useParams, useLocation } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import { motion } from 'framer-motion';
import InfiniteScroll from 'react-infinite-scroll-component';
import movieService from '../services/movie-db.service';
import VerticalMovieList from '../modules/movies/components/VerticalMovieList';
import SkeltonLoader from '../components/SkeltonLoader';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
};

const SORT_OPTIONS = [
  { label: 'Popular', value: 'popularity.desc' },
  { label: 'Top Rated', value: 'vote_average.desc' },
  { label: 'Newest', value: 'release_date.desc' }
];

function GenreMoviesPage() {
  const { id: genreId } = useParams();
  const location = useLocation();
  const genreName = useMemo(
    () => new URLSearchParams(location.search).get('name') || 'Genre',
    [location.search]
  );

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState('popularity.desc');

  document.title = `${genreName} Movies | FindMe Movies`;
  document.getElementById('root').style.backgroundImage = null;

  // Reset and refetch when genreId or sortBy changes
  useEffect(() => {
    let cancelled = false;
    setMovies([]);
    setPage(1);
    setHasMore(true);

    movieService.discoverByGenre(genreId, 1, sortBy).then((data) => {
      if (!cancelled) {
        setMovies(data.results || []);
        setPage(data.page || 1);
        setHasMore(data.page < data.total_pages);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [genreId, sortBy]);

  const fetchMovies = async () => {
    const nextPage = page + 1;
    const data = await movieService.discoverByGenre(genreId, nextPage, sortBy);
    setMovies((prev) => [...prev, ...(data.results || [])]);
    setPage(data.page || nextPage);
    setHasMore(data.page < data.total_pages);
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ minHeight: '100vh', background: '#09090b' }}
    >
      <Container maxWidth="xl" sx={{ px: { xs: 2, md: 4 }, pt: { xs: 5, md: 7 }, pb: 8 }}>
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
            <CategoryIcon sx={{ color: '#818cf8', fontSize: '2rem' }} />
            <Typography
              sx={{
                color: '#fafafa',
                fontWeight: 800,
                fontSize: { xs: '1.8rem', md: '2.4rem' },
                lineHeight: 1.15,
                letterSpacing: '-0.01em'
              }}
            >
              {genreName} Movies
            </Typography>
          </Box>
          <Typography
            sx={{
              color: '#a1a1aa',
              fontSize: '0.95rem',
              mb: 3,
              ml: 0.25
            }}
          >
            Explore the best {genreName.toLowerCase()} films
          </Typography>

          {/* Sort chips */}
          <Box sx={{ display: 'flex', gap: 1, mb: 4, flexWrap: 'wrap' }}>
            {SORT_OPTIONS.map(({ label, value }) => (
              <Chip
                key={value}
                label={label}
                onClick={() => setSortBy(value)}
                variant={sortBy === value ? 'filled' : 'outlined'}
                sx={
                  sortBy === value
                    ? {
                        background: 'rgba(129,140,248,0.2)',
                        border: '1px solid #818cf8',
                        color: '#818cf8',
                        fontWeight: 600,
                        '&:hover': { background: 'rgba(129,140,248,0.28)' }
                      }
                    : {
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#a1a1aa',
                        '&:hover': { background: 'rgba(255,255,255,0.08)', color: '#fafafa' }
                      }
                }
              />
            ))}
          </Box>
        </motion.div>

        {/* Infinite scroll list */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <InfiniteScroll
            dataLength={movies.length}
            next={fetchMovies}
            hasMore={hasMore}
            loader={
              <Box sx={{ mt: 3 }}>
                <SkeltonLoader />
              </Box>
            }
          >
            <VerticalMovieList movies={movies} />
          </InfiniteScroll>
        </motion.div>
      </Container>
    </motion.div>
  );
}

export default GenreMoviesPage;
