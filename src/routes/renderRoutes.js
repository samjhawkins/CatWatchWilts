import React from 'react';
import {Route} from 'react-router-dom'
import {routesConfig} from "./routes.config";

const renderRoutes = () => {
    return routesConfig.map((route, index) => {
        return (<Route key={index} {...route}/>)
    });
};

export default renderRoutes;
