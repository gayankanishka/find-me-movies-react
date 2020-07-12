import Home from './pages/Home';
import MovieDetails from './pages/MovieDetails';
import PageNotFound from './pages/PageNotFound';
import OnTheaters from './pages/OnTheaters';

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
