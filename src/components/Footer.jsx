import React from 'react';
import { AppBar, Grid, Typography } from '@material-ui/core';
import { CopyrightRounded } from '@material-ui/icons';
import SocialAvatarGroup from './SocialAvatarGroup';
import { useStyles } from '../themes/useStyles';

const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar position="relative" color="primary" className={classes.footer}>
      <Grid xs={11} md={10} item container alignItems="center" justify="center">
        <Grid item container alignItems="center" justify="center">
          <div>
            <hr />
            <Typography component="h3">
              We hope you come back soon, and that you spread the word! If you
              want to contact us then feel free to email us at&nbsp;
              <a
                href="mailto:marnie@catwatchwilts.com?Subject=CatWatchWiltshire enquiry: <subject_line_here>"
                target="_top"
              >
                marnie@catwatchwilts.com
              </a>
            </Typography>
          </div>
        </Grid>
        <Grid item container alignItems="center" justify="center">
          <Typography component="h3">
            If you prefer, you can also you can find us on social media:
          </Typography>
        </Grid>
        <Grid item container alignItems="center" justify="center">
          <SocialAvatarGroup />
        </Grid>
        <Grid item container alignItems="center" justify="center">
          <div>
            <hr />
            <Typography component="p">
              {/* TODO: CHARITY DETAILS GO HERE */}
              Charity details go here
            </Typography>
          </div>
        </Grid>
        <Grid item container alignItems="center" justify="center">
          <div>
            <hr />
            <Typography component="p">
              If you see anything wrong with our site then please let us know
              via our social media accounts and we will do our best to fix it!
            </Typography>
          </div>
        </Grid>
        <Grid item container alignItems="center" justify="center">
          <Typography component="p">
            This site was created by Sam Hawkins and Jacob Lambrou
          </Typography>
          <CopyrightRounded />
        </Grid>
      </Grid>
    </AppBar>
  );
};

export default Footer;
