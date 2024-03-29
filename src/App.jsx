import React from 'react';
import { Switch } from 'react-router-dom';
import { Grid } from '@material-ui/core/index';
import renderRoutes from './utils/renderRoutes';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer';
import LoadingFallback from './components/LoadingFallback';

const App = () => (
  <React.Suspense fallback={<LoadingFallback />}>
    <Grid container direction="column" justify="center" alignItems="center">
      <NavBar />
      <Grid item container xs={12} justify="center">
        <Switch>{renderRoutes()}</Switch>
        <Footer />
      </Grid>
    </Grid>
  </React.Suspense>
);

export default App;
