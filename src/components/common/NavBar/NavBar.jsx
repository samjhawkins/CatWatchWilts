import React from 'react';
import PropTypes from 'prop-types';
import { AppBar, Toolbar, Avatar, Grid, Button } from '@material-ui/core';
import logo from '../../../images/logo.jpg';
import UndecoratedLink from '../links/UndecoratedLink';
import MainMenu from './MainMenu';
import { MediaQuery } from '../wrappers/MediaQuery';
import { useStyles } from '../../../themes/useStyles';
import { withAuthContext } from '../wrappers/AuthContext';

const NavBar = ({ logout, isLoggedIn }) => {
  const classes = useStyles({ imageHeight: 3 });
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
          {isLoggedIn && (
            <Button
              size="large"
              variant="contained"
              color="secondary"
              onClick={logout}
              className={classes.appBarItem}
            >
              Logout
            </Button>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  logout: PropTypes.func.isRequired,
};

export default withAuthContext(NavBar);
