import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {Grid} from '@material-ui/core/index';
import renderRoutes from './routes/renderRoutes'
import NavBar from './components/common/NavBar/NavBar';
import Footer from './components/common/Footer/Footer';
import MediaQuery from "./components/common/wrappers/MediaQuery";

export class App extends React.Component {
  render() {
    return (
      <Router>
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <MediaQuery>
            <NavBar/>
          </MediaQuery>
          <Grid item container xs={12} justify={"center"}>
            <Switch>
              {renderRoutes()}
            </Switch>
            <MediaQuery>
              <Footer/>
            </MediaQuery>
          </Grid>
        </Grid>
      </Router>
    );
  }

}

export default App;