import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../components/common/PrivateRoute';
import { routesConfig } from './routes.config';

const renderRoutes = () => {
  return routesConfig.map((route) => {
    if (route.private) {
      return <PrivateRoute key={route.name} {...route} />;
    }
    return <Route key={route.name} {...route} />;
  });
};

export default renderRoutes;
