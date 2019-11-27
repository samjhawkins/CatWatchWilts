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

const styles = theme => ({
    avatar: {
        margin: theme.spacing(5),
        width: theme.spacing(80),
        height: theme.spacing(40),
    },
    padIt: {
        padding: theme.spacing(10)
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
                        <Grid justify={"space-between"} container>
                            <Grid item container sm={6} alignContent={"center"} justify={"center"}>
                                <Avatar
                                    alt="Lemon Logo"
                                    src={logo}
                                    variant="rounded"
                                    className={classes.avatar}
                                />
                            </Grid>
                            <Grid item container xs={12} sm={4} justify={"center"} className={classes.padIt}>
                                <ButtonMenu
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