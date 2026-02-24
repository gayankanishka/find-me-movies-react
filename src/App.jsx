/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, CssBaseline } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import Layout from './components/Layout';
import routeConfig from './routeConfig';
import history from './utils/history.utils';
import Spinner from './components/Spinner';
import ScrollToTop from './components/ScrollToTop';

const theme = createTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#181818'
    }
  }
});

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
      <ScrollToTop />
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Layout style={{ background: '#181818' }}>
          <Suspense fallback={<Spinner />}>
            <Switch>
              {routeConfig.map((route) => (
                <RouteWithSubRoutes key={route.path} {...route} />
              ))}
            </Switch>
          </Suspense>
        </Layout>
      </MuiThemeProvider>
    </Router>
  );
}

RouteWithSubRoutes.propTypes = {
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  routes: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.object.isRequired
};

export default App;
