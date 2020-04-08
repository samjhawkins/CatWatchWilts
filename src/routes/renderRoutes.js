import React from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from '../components/common/PrivateRoute';
import { routesConfig } from './routes.config';

const renderRoutes = () => {
  return routesConfig.map((route, index) => {
    if (route.private) {
      return <PrivateRoute key={index} {...route} />;
    }
    return <Route key={index} {...route} />;
  });
};

export default renderRoutes;
