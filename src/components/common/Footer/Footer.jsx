import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Avatar, Grid, Link} from "@material-ui/core";
import faceBook from '../../../images/f_logo_White.png';
import instaGram from '../../../images/i_logo_Black.png';
import twitter from '../../../images/t_logo_White.png';
import LinkedButton from "../links/LinkedButton";
import UndecoratedLink from "../links/UndecoratedLink";
import SocialAvatar from "./SocialAvatar";

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
    },
    footerText: {
        marginLeft: theme.spacing(6),
        marginRight: theme.spacing(6),
        color: theme.color.white
    },
    bold: {
      fontWeight: "bold"
    }
}));

export default function StickyFooter() {
    const classes = useStyles();
    return (
        <AppBar position='sticky' className={classes.footer}>
            <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
            >
                <SocialAvatar
                    newWindow={true}
                    href="http://fb.me/wiltsandhantscats"
                    className={classes.footerItem}
                    alt="Facebook Logo"
                    src={faceBook}
                />
                <SocialAvatar
                    newWindow={true}
                    href="https://www.instagram.com/cat_watch_wilts/"
                    className={classes.footerItem}
                    alt="Instagram Logo"
                    src={instaGram}
                />

                <SocialAvatar
                    newWindow={true}
                    href="https://twitter.com/cat_watch_wilts"
                    className={classes.footerItem}
                    alt="Twitter Logo"
                    src={twitter}
                />
                <UndecoratedLink to="/contact" className={classes.footerText}>
                    Contact us
                </UndecoratedLink>
                <LinkedButton
                    className={`${classes.footerItem} ${classes.bold}`}
                    to="/donations"
                    text="Donate"
                    size="large"
                />
            </Grid>
        </AppBar>
    );
}