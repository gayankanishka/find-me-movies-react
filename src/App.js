import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';
import Layout from './components/Layout';
import routes from './routeConfig';
import history from './utils/history.utils';

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
      <CssBaseline />
      <Layout>
        <Switch>
          {routes.map((route) => (
            <RouteWithSubRoutes key={route.path} {...route} />
          ))}
        </Switch>
      </Layout>
    </Router>
  );
};

export default App;
