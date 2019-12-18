import React, {Component} from 'react';
import {
    AppBar,
    Toolbar,
    Avatar,
} from '@material-ui/core/index';
import Grid from "@material-ui/core/Grid/index";
import {withStyles} from "@material-ui/core/styles";
import logo from "../../../images/logo.jpg";
import ButtonMenu from "./ButtonMenu";
import MainMenu from "./MainMenu";
import UndecoratedLink from "../links/UndecoratedLink";
import LinkedButton from "../links/LinkedButton";
import MediaQuery from "../wrappers/MediaQuery";
import SocialAvatarGroup from "../SocialAvatarGroup";

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
        fontWeight: "bold",
        backgroundColor: theme.color.white,
        "&:hover": {
            backgroundColor: theme.color.tertiary.main
        }
    }
});

export class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.handleClose = this.handleClose.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({open: !this.state.open});
    }

    handleClose() {
        this.setState({open: false});
    }

    render() {
        const {classes, matches} = this.props;
        return (
            <AppBar position='sticky'>
                <Toolbar>
                        <Grid justify={"space-between"} container className={classes.container}>
                            <Grid item container sm={5} alignItems={"center"} justify={"flex-start"}>
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
                            </Grid>
                            <Grid
                                item
                                container
                                xs={7}
                                sm={4}
                                alignItems={"center"}
                                justify={"center"}
                            >
                                <SocialAvatarGroup
                                    facebook={true}
                                    twitter={true}
                                    instagram={true}
                                />
                            </Grid>
                            <Grid item container xs={5} sm={3} alignItems={"center"} justify={"flex-end"}>
                                <MediaQuery>
                                    <ButtonMenu
                                        className={classes.appBarItem}
                                        menuComponent={MainMenu}
                                        open={this.state.open}
                                        handleClose={this.handleClose}
                                        handleToggle={this.handleToggle}
                                    />
                                </MediaQuery>
                            </Grid>
                        </Grid>
                </Toolbar>
            </AppBar>
        );
    }
};

export default withStyles(styles)(NavBar);