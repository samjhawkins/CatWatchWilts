import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useStyles } from '../../themes/useStyles';

const UndecoratedLink = ({ to, href, className, children, onClick }) => {
  const classes = useStyles();
  return to ? (
    <Link to={to} className={`${classes.link} ${className}`} onClick={onClick}>
      {children}
    </Link>
  ) : (
    <a href={href} className={`${classes.link} ${className}`} onClick={onClick}>
      {children}
    </a>
  );
};

UndecoratedLink.propTypes = {
  to: PropTypes.string,
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

UndecoratedLink.defaultProps = {
  to: undefined,
  href: undefined,
  className: '',
  onClick: () => {},
};

export default UndecoratedLink;
