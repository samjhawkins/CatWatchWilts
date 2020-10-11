import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../components/PrivateRoute';
import { routesConfig } from './routes.config';

const renderRoutes = () => {
  return routesConfig.map((route) => {
    const key = `${route.name}-${route.path}`;
    if (route.private) {
      return <PrivateRoute key={key} {...route} />;
    }
    return <Route key={key} {...route} />;
  });
};

export default renderRoutes;
