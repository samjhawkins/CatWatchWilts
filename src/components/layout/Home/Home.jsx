import React from 'react';
import {Container, Typography, Card, CardMedia, CardContent, CardActions} from "@material-ui/core/index";
import { makeStyles } from "@material-ui/styles";
import LinkedButton from "../../common/links/LinkedButton";

const useStyles = makeStyles(theme => ({
    container: {
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(10),
    },
    card: {
        padding: theme.spacing(4),
        margin: theme.spacing(4)
    },
    youTube: {
        margin: "auto",
        height: "54vw",
        maxWidth: "800px",
        maxHeight: "450px",
        media: {
            width: "100%",
            height: "auto",
        }
    },
    tertiaryButton: {
        backgroundColor: theme.color.tertiary.main,
        "&:hover": {
            backgroundColor: theme.color.tertiary.dark
        }
    },
    button: {
        fontSize: theme.spacing(5)
    },
}));

export const Home = props => {
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="md" className={classes.container}>
            <Card className={classes.card}>
                <CardMedia
                    component="iframe"
                    className={classes.youTube}
                    src="https://www.youtube.com/embed/u4fFcz2CB-A"
                    frameBorder="0"
                    allowFullScreen
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    title="Video not found!"
                />
                <CardContent>
                    <Typography variant="body2" color="textSecondary" component="span">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Aliquet nec ullamcorper sit amet risus. Quisque egestas diam
                        in
                        arcu cursus euismod quis. Dictum at tempor commodo ullamcorper a lacus vestibulum. Sagittis
                        nisl
                        rhoncus mattis rhoncus. Non curabitur gravida arcu ac tortor dignissim. Justo nec ultrices
                        dui
                        sapien eget mi proin. Pellentesque sit amet porttitor eget dolor morbi. Senectus et netus et
                        malesuada. Maecenas pharetra convallis posuere morbi leo urna molestie at. Pellentesque
                        habitant
                        morbi tristique senectus et netus et malesuada.
                    </Typography>
                </CardContent>
                <CardActions>
                    <LinkedButton
                        className={classes.button}
                        to="/cats"
                        text="Let's get looking"
                        size="large"
                        colour="primary"
                    />
                    <LinkedButton
                        className={classes.button}
                        to="/blog"
                        text="Whats new"
                        size="large"
                        colour="secondary"
                    />
                    <LinkedButton
                        className={`${classes.tertiaryButton} ${classes.button}`}
                        to="/contact"
                        text="Contact us"
                        size="large"
                    />
                </CardActions>
            </Card>
        </Container>
    )
};

export default Home;