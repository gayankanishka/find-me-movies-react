/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense, useMemo } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

import baseTheme from './theme';
import Layout from './components/Layout';
import routeConfig from './routeConfig';
import history from './utils/history.utils';
import Spinner from './components/Spinner';
import ScrollToTop from './components/ScrollToTop';
import ErrorBoundary from './components/ErrorBoundary';
import { ColorModeProvider, useColorMode } from './context/ColorModeContext';

function createDynamicTheme(mode) {
  const isLight = mode === 'light';
  return createTheme({
    ...baseTheme,
    palette: {
      ...baseTheme.palette,
      mode,
      background: {
        default: isLight ? '#f8f8fc' : '#09090b',
        paper: isLight ? '#ffffff' : '#0f0f13'
      },
      text: {
        primary: isLight ? '#09090b' : '#fafafa',
        secondary: isLight ? '#52525b' : '#a1a1aa',
        disabled: isLight ? '#a1a1aa' : '#52525b'
      }
    }
  });
}

function RouteWithSubRoutes({ exact, path, routes, component: Component }) {
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) => <Component {...props} routes={routes} />}
    />
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

function AppWithTheme() {
  const { mode } = useColorMode();
  const theme = useMemo(() => createDynamicTheme(mode), [mode]);

  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ScrollToTop />
        <Layout>
          <ErrorBoundary>
            <Suspense fallback={<Spinner />}>
              <AnimatePresence mode="wait">
                <Switch>
                  {routeConfig.map((route) => (
                    <RouteWithSubRoutes key={route.path} {...route} />
                  ))}
                </Switch>
              </AnimatePresence>
            </Suspense>
          </ErrorBoundary>
        </Layout>
      </ThemeProvider>
    </Router>
  );
}

function App() {
  return (
    <ColorModeProvider>
      <AppWithTheme />
    </ColorModeProvider>
  );
}

export default App;
