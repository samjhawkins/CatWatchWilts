import React from 'react';
import { AppBar, Toolbar, Avatar, Grid } from '@material-ui/core/index';
import logo from '../../../images/logo.jpg';
import UndecoratedLink from '../links/UndecoratedLink';
import MainMenu from './MainMenu';
import { MediaQuery } from '../wrappers/MediaQuery';
import { useStyles } from '../../../themes/useStyles';

const NavBar = () => {
  const classes = useStyles();
  return (
    <AppBar position="sticky">
      <Toolbar>
        <Grid
          item
          container
          justify="center"
          alignContent="flex-end"
          className={classes.container}
        >
          <UndecoratedLink to="/">
            <Avatar
              alt="Cat watch wiltshire logo"
              src={logo}
              variant="rounded"
              className={classes.avatar_small}
            />
          </UndecoratedLink>
          <MediaQuery>
            <MainMenu className={classes.appBarItem} />
          </MediaQuery>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
