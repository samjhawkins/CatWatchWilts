import React from 'react';
import {
    AppBar,
    Toolbar,
    Avatar,
} from '@material-ui/core/index';
import Grid from "@material-ui/core/Grid/index";
import logo from "../../../images/logo.jpg";
import UndecoratedLink from "../links/UndecoratedLink";
import LinkedButton from "../links/LinkedButton";
import MainMenu from "./MainMenu";
import MediaQuery from "../wrappers/MediaQuery";
import {makeStyles} from "@material-ui/styles";
import DonateButton from "../DonateButton";

const useStyles = makeStyles(theme => ({
    avatar: {
        margin: theme.spacing(3),
        width: theme.spacing(60),
        height: theme.spacing(30),
    },
    container: {
        padding: theme.spacing(3),
    },
}));

export const NavBar = props => {
    const classes = useStyles();
    return (
        <AppBar position='sticky'>
            <Toolbar>
                <Grid
                    item container
                    justify={"center"}
                    alignContent={"flex-end"}
                    className={classes.container}
                >
                    <UndecoratedLink to="/">
                        <Avatar
                            alt="Cat watch wiltshire logo"
                            src={logo}
                            variant="rounded"
                            className={classes.avatar}
                        />
                    </UndecoratedLink>
                    <DonateButton
                        to="/donations"
                        size="medium"
                    />
                    <MediaQuery>
                        <MainMenu className={classes.appBarItem}/>
                    </MediaQuery>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;