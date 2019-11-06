import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Container, Avatar, Grid} from "@material-ui/core";
import faceBook from '../../images/f_logo_Black_1024.png';
import LinkedButton from "./links/LinkedButton";
import UndecoratedLink from "./links/UndecoratedLink";

const useStyles = makeStyles(theme => ({
    footer: {
        padding: theme.spacing(2),
        top: "auto",
        bottom: 0,
        maxHeight: "100px"
    },
    footerItem: {
        marginLeft: theme.spacing(4),
        marginRight: theme.spacing(4),
    }
}));

export default function StickyFooter() {
    const classes = useStyles();
    return (
        <AppBar position='fixed' className={classes.footer}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <Avatar
                    className={classes.footerItem}
                    alt="Facebook Logo"
                    src={faceBook}
                    variant="rounded"
                />
                <Avatar
                    className={classes.footerItem}
                    alt="Instagram Logo"
                    src={faceBook}
                    variant="rounded"
                />
                <Avatar
                    className={classes.footerItem}
                    alt="Twitter Logo"
                    src={faceBook}
                    variant="rounded"
                />
                <LinkedButton
                    className={classes.footerItem}
                    to="/donations"
                    text="Donate"
                    size="large"
                />
                <UndecoratedLink to="/contact" className={classes.footerItem}>
                    Contact us
                </UndecoratedLink>
            </Grid>
        </AppBar>
    );
}