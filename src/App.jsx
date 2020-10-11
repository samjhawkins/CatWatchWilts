import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {Grid} from '@material-ui/core/index';
import renderRoutes from './utils/renderRoutes';
import NavBar from './components/common/NavBar/NavBar';
import Footer from './components/common/Footer';
import LoadingFallback from './components/common/LoadingFallback';

const App = () => (
  <React.Suspense fallback={<LoadingFallback/>}>
    <Router>
      <Grid container direction="column" justify="center" alignItems="center">
        <NavBar/>
        <Grid item container xs={12} justify="center">
          <Switch>{renderRoutes()}</Switch>
          <Footer/>
        </Grid>
      </Grid>
    </Router>
  </React.Suspense>
);

export default App;
