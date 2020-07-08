import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import PageNotFound from './pages/PageNotFound';

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
    path: '*',
    exact: true,
    component: PageNotFound
  }
];

export default routes;
