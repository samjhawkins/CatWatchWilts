import React from 'react';
import justGivingLogo from '../../../images/just_giving_logo.jpg';
import Avatar from "@material-ui/core/Avatar";
import {makeStyles} from "@material-ui/styles";
import LinkedButton from "../../common/links/LinkedButton";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    root: {
        minHeight: '700px',
    },
    avatar: {
        margin: theme.spacing(6),
        width: theme.spacing(150),
        height: theme.spacing(40),
    },
    donateButton: {
        margin: theme.spacing(3),
        height: theme.spacing(30),
        fontWeight: "bold",
        backgroundColor: theme.color.white,
        "&:hover": {
            backgroundColor: theme.color.tertiary.main
        }
    },
    image: {
        width: '100%',
        height: '100%',
        backgroundImage: 'url(https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1048&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
        backgroundSize: 'cover',
    },
}));

const Donations = props => {
    const classes = useStyles();
    return (
        <Grid item container component="main" xs={10} className={classes.root}>
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <Typography>
                    We rely on your donations to keep our cats happy.
                    If you wish to donate then we have a just giving page that you can go to below.
                </Typography>
                <Avatar
                    alt="JustGiving logo" lo
                    src={justGivingLogo}
                    variant="rounded"
                    className={classes.avatar}
                />
                <LinkedButton
                    className={classes.donateButton}
                    to="/donations"
                    text="Donate"
                    size="large"
                    variant="outlined"
                />
                <Typography>
                    At the very least, thank you for your time, and thank you so much for your support, it means the
                    world to us.
                </Typography>
            </Grid>
            <Grid item xs={false} sm={4} md={7} className={classes.image}/>
        </Grid>
    );
}

export default Donations;