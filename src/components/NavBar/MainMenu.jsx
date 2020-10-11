import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core/index';
import { withRouter } from 'react-router-dom';
import UndecoratedLink from '../links/UndecoratedLink';
import { pageList } from '../../utils/routes.config';
import { useStyles } from '../../themes/useStyles';

const MainMenu = ({ matches, location, className }) => {
  const { aboveSM } = matches;
  const classes = useStyles();
  const currentTab = pageList.findIndex(
    (route) => route.path === location?.pathname,
  );
  const smallTextClass = aboveSM ? undefined : classes.smallText;
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
            className={`${classes.secondaryButton} ${smallTextClass}`}
          />
        </UndecoratedLink>
      ))}
    </Tabs>
  );
};

MainMenu.propTypes = {
  matches: PropTypes.shape({ aboveSM: PropTypes.bool, aboveMD: PropTypes.bool })
    .isRequired,
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
