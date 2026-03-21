import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const OnTheaters = lazy(() => import('./pages/OnTheaters'));
const PopularMovies = lazy(() => import('./pages/PopularMovies'));
const TopRatedMovies = lazy(() => import('./pages/TopRatedMovies'));
const UpcomingMovies = lazy(() => import('./pages/UpcomingMovies'));
const TrendingPage = lazy(() => import('./pages/TrendingPage'));
const GenrePage = lazy(() => import('./pages/GenrePage'));
const GenreMoviesPage = lazy(() => import('./pages/GenreMoviesPage'));
const PersonDetails = lazy(() => import('./pages/PersonDetails'));

const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/movie-details/:id',
    exact: true,
    component: MovieDetails
  },
  {
    path: '/on-theaters',
    exact: true,
    component: OnTheaters
  },
  {
    path: '/popular-movies',
    exact: true,
    component: PopularMovies
  },
  {
    path: '/top-movies',
    exact: true,
    component: TopRatedMovies
  },
  {
    path: '/upcoming-movies',
    exact: true,
    component: UpcomingMovies
  },
  {
    path: '/trending',
    exact: true,
    component: TrendingPage
  },
  {
    path: '/genres',
    exact: true,
    component: GenrePage
  },
  {
    path: '/genres/:id',
    exact: true,
    component: GenreMoviesPage
  },
  {
    path: '/person/:id',
    exact: true,
    component: PersonDetails
  },
  {
    path: '*',
    exact: true,
    component: PageNotFound
  }
];

export default routes;
