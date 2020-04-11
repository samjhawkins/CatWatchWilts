import React from 'react';
import PropTypes from 'prop-types';
import { Tabs, Tab } from '@material-ui/core/index';
import { makeStyles } from '@material-ui/styles/index';
import { withRouter } from 'react-router-dom';
import UndecoratedLink from '../links/UndecoratedLink';
import { pageList } from '../../../routes/routes.config';

const useStyles = makeStyles((theme) => ({
  menuItem: {
    backgroundColor: theme.color.white,
    '&:hover': {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  smallText: {
    fontSize: '0.7em',
  },
}));

const MainMenu = ({ matches, location, className }) => {
  const classes = useStyles();
  const currentTab = pageList.findIndex(
    (route) => route.path === location?.pathname,
  );
  const smallTextClass = matches?.aboveSM ? undefined : classes.smallText;
  return (
    <Tabs
      value={currentTab > -1 ? currentTab : 0}
      indicatorColor="secondary"
      textColor="primary"
      variant="scrollable"
      scrollButtons="on"
      className={className}
    >
      {pageList.map((route, index) => (
        <UndecoratedLink key={`${route.name}-${route.path}`} to={route.path}>
          <Tab
            value={index}
            color={route.color}
            label={route.name}
            selected={currentTab === index}
            className={`${classes.menuItem} ${smallTextClass}`}
          />
        </UndecoratedLink>
      ))}
    </Tabs>
  );
};

MainMenu.propTypes = {
  matches: PropTypes.shape({}).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
  className: PropTypes.string,
};

MainMenu.defaultProps = {
  location: {},
  className: '',
};

export default withRouter(MainMenu);
