/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

import theme from './theme';
import Layout from './components/Layout';
import routeConfig from './routeConfig';
import history from './utils/history.utils';
import Spinner from './components/Spinner';
import ScrollToTop from './components/ScrollToTop';

function RouteWithSubRoutes({ exact, path, routes, component: Component }) {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => <Component {...props} routes={routes} />}
    />
  );
}

function App() {
  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<Spinner />}>
            <AnimatePresence mode="wait">
              <Switch>
                {routeConfig.map((route) => (
                  <RouteWithSubRoutes key={route.path} {...route} />
                ))}
              </Switch>
            </AnimatePresence>
          </Suspense>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

RouteWithSubRoutes.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool,
  // eslint-disable-next-line react/forbid-prop-types
  routes: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.object.isRequired
};

RouteWithSubRoutes.defaultProps = {
  exact: false,
  routes: undefined
};

export default App;
