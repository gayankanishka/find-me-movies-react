import Home from './Home';
import MovieDetails from './modules/movies/components/MovieDetails';
import PageNotFound from './PageNotFound';

export const routes = [
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
    path: '*',
    exact: true,
    component: PageNotFound
  }
];
