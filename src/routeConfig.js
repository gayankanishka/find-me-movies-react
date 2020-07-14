import { lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const MovieDetails = lazy(() => import('./pages/MovieDetails'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const OnTheaters = lazy(() => import('./pages/OnTheaters'));

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
    path: '*',
    exact: true,
    component: PageNotFound
  }
];

export default routes;
