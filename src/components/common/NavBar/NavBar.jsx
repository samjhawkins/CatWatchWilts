import React, {Component} from 'react';
import {
    AppBar,
    Toolbar,
    Avatar,
} from '@material-ui/core/index';
import Grid from "@material-ui/core/Grid/index";
import {withStyles} from "@material-ui/core/styles";
import logo from "../../../images/logo.jpg";
import UndecoratedLink from "../links/UndecoratedLink";
import LinkedButton from "../links/LinkedButton";
import MainMenu from "./MainMenu";

const styles = theme => ({
    avatar: {
        margin: theme.spacing(3),
        width: theme.spacing(60),
        height: theme.spacing(30),
    },
    container: {
        padding: theme.spacing(3),
    },
    appBarItem: {
        margin: theme.spacing(3),
    },
    donateButton: {
        height: theme.spacing(30),
        fontWeight: "bold",
        backgroundColor: theme.color.white,
        "&:hover": {
            backgroundColor: theme.color.tertiary.main
        }
    }
});

export class NavBar extends Component {
    render() {
        const {classes} = this.props;
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
                        <LinkedButton
                            className={`${classes.appBarItem} ${classes.donateButton}`}
                            to="/donations"
                            text="Donate"
                            size="medium"
                            variant="outlined"
                        />
                        <MainMenu className={classes.appBarItem}/>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
};

export default withStyles(styles)(NavBar);