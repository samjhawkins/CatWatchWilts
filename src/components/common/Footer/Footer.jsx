import React from "react";
import {AppBar, Grid, Typography} from '@material-ui/core';
import SocialAvatarGroup from "../SocialAvatarGroup";

const Footer = props => (
  <AppBar position={"relative"} color="primary">
    <Grid item container alignItems={"center"} justify={"center"}>
      <Typography component={"h3"}>
         You can find us on social media!
      </Typography>
    </Grid>
    <Grid item container alignItems={"center"} justify={"center"}>
      <SocialAvatarGroup/>
    </Grid>
    <Grid item container alignItems={"center"} justify={"center"}>
      <Typography component={"p"} color={"textSecondary"}>
        If you see anything wrong with our site then please let us know via our social media accounts and we will do our best to fix it!
      </Typography>
    </Grid>
    <Grid item container alignItems={"center"} justify={"center"}>
      <Typography component={"p"} color={"textSecondary"}>
        We hope you come back soon, and that you spread the word!
      </Typography>
    </Grid>
  </AppBar>
);

export default Footer;