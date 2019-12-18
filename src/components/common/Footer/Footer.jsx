import React from "react";
import {AppBar, Grid, Typography} from '@material-ui/core';
import SocialAvatarGroup from "../SocialAvatarGroup";
import {ChevronRight} from "@material-ui/icons/index";

const Footer = props => (
  <AppBar position={"relative"} color="primary">
    <Grid item container alignItems={"center"} justify={"center"}>
      <Typography component={"h3"}>
         You can find us on social media! <ChevronRight/>
      </Typography>
      <SocialAvatarGroup/>
    </Grid>
  </AppBar>
);

export default Footer;