import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles/index';

const useStyles = makeStyles(() => ({
  link: {
    textDecoration: 'none',
  },
}));

const UndecoratedLink = ({ to, href, className, children }) => {
  const classes = useStyles();
  return (
    <Link to={to} href={href} className={`${classes.link} ${className}`}>
      {children}
    </Link>
  );
};

UndecoratedLink.propTypes = {
  to: PropTypes.string.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

UndecoratedLink.defaultProps = {
  href: undefined,
  className: '',
};

export default UndecoratedLink;
