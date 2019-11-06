import React from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import {Grid} from '@material-ui/core/index';
import renderRoutes from './routes/renderRoutes'

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
                    <Grid item xs={12}>
                        <Switch>
                            {renderRoutes()}
                        </Switch>
                    </Grid>
                </Grid>
            </Router>
        );
    }

}

export default App;