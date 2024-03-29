import React, { Suspense } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import {
  MuiThemeProvider,
  createMuiTheme,
  CssBaseline
} from '@material-ui/core';
import Layout from './components/Layout';
import routes from './routeConfig';
import history from './utils/history.utils';
import Spinner from './components/Spinner';
import ScrollToTop from './components/ScrollToTop';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background: {
      default: '#181818'
    }
  }
});

const App = () => {
  function RouteWithSubRoutes(route) {
    return (
      <Route
        exact={route.exact}
        path={route.path}
        render={(props) => (
          // HINT: pass the sub-routes down to keep nesting
          <route.component {...props} routes={route.routes} />
        )}
      />
    );
  }

  return (
    <Router history={history}>
      <ScrollToTop />
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Layout style={{ background: '#181818' }}>
          <Suspense fallback={<Spinner />}>
            <Switch>
              {routes.map((route) => (
                <RouteWithSubRoutes key={route.path} {...route} />
              ))}
            </Switch>
          </Suspense>
        </Layout>
      </MuiThemeProvider>
    </Router>
  );
};

export default App;
