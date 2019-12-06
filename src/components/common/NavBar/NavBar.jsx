import React, {Component} from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Avatar,
    Container,
} from '@material-ui/core/index';
import Grid from "@material-ui/core/Grid/index";
import {withStyles} from "@material-ui/core/styles";
import logo from "../../../images/logo.jpg";
import ButtonMenu from "./ButtonMenu";
import MainMenu from "./MainMenu";
import SocialAvatar from "./SocialAvatar";
import faceBook from "../../../images/f_logo_White.png";
import instaGram from "../../../images/i_logo_Black.png";
import twitter from "../../../images/t_logo_White.png";
import UndecoratedLink from "../links/UndecoratedLink";
import LinkedButton from "../links/LinkedButton";

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
        const {classes} = this.props;
        return (
            <AppBar position='sticky'>
                <Toolbar>
                    <Container maxWidth="md">
                        <Grid justify={"space-between"} container className={classes.container}>
                            <Grid item container sm={6} alignItems={"center"} justify={"space-evenly"}>
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
                                  size="large"
                                  variant="outlined"
                                />
                            </Grid>
                            {/*Todo: swap from space evenly to grouping the icons with space evenly at xs breakpoint*/}
                            <Grid item container sm={6} alignItems={"center"} justify={"space-evenly"}>
                                <SocialAvatar
                                  newWindow={true}
                                  href="http://fb.me/wiltsandhantscats"
                                  className={classes.appBarItem}
                                  alt="Facebook Logo"
                                  src={faceBook}
                                />
                                <SocialAvatar
                                  newWindow={true}
                                  href="https://www.instagram.com/cat_watch_wilts/"
                                  className={classes.appBarItem}
                                  alt="Instagram Logo"
                                  src={instaGram}
                                />
                                <SocialAvatar
                                  newWindow={true}
                                  href="https://twitter.com/cat_watch_wilts"
                                  className={classes.appBarItem}
                                  alt="Twitter Logo"
                                  src={twitter}
                                />
                                <ButtonMenu
                                    className={classes.appBarItem}
                                    menuComponent={MainMenu}
                                    open={this.state.open}
                                    handleClose={this.handleClose}
                                    handleToggle={this.handleToggle}
                                />
                            </Grid>
                        </Grid>
                    </Container>

                </Toolbar>
            </AppBar>
        );
    }
};

export default withStyles(styles)(NavBar);