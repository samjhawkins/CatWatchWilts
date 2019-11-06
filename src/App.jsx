import React from 'react';
import {Grid} from '@material-ui/core/index';
import Home from "./components/Home";
import Background from "./components/Background";

export class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                {/*<Grid*/}
                {/*    container*/}
                {/*    direction="column"*/}
                {/*    justify="center"*/}
                {/*    alignItems="center"*/}
                {/*>*/}
                {/*    <Grid item xs={12}>*/}
                {/*        <Home/>*/}
                {/*    </Grid>*/}
                {/*</Grid>*/}
                <Background/>
            </React.Fragment>
        );
    }

}

export default App;