import React from 'react';
import PrivateRoute from '../components/common/PrivateRoute';
import {Route} from 'react-router-dom'
import {routesConfig} from "./routes.config";

const renderRoutes = () => {
    return routesConfig.map((route, index) => {
        if(route.private){
            return (
              <PrivateRoute key={index} {...route}/>)
        }
        return (<Route key={index} {...route}/>)
    });
};

export default renderRoutes;
