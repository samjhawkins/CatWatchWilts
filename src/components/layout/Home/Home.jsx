import React from 'react';
import {Container, Paper} from "@material-ui/core/index";
import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
    paper: {
        marginTop: theme.spacing(10),
        padding: theme.spacing(4),
        width: "100%",
        height: "100%"
    },
    youTube: {
        width: "48vw",
        height: "27vw",
        maxWidth: "800px",
        maxHeight: "450px"
    }
}));

export const Home = props => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="md">
            <Paper className={classes.paper}>
                <iframe
                    className={classes.youTube}
                    src="https://www.youtube.com/embed/u4fFcz2CB-A"
                    frameBorder="0"
                    allowFullScreen
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                >
                    Video not found!
                </iframe>
                <hr />
            </Paper>
        </Container>
    )
};

export default Home;