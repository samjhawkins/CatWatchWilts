import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useStyles } from '../../../themes/useStyles';

const UndecoratedLink = ({ to, href, className, children, onClick }) => {
  const classes = useStyles();
  return (
    <Link
      to={to}
      href={href}
      className={`${classes.link} ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

UndecoratedLink.propTypes = {
  to: PropTypes.string.isRequired,
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

UndecoratedLink.defaultProps = {
  href: undefined,
  className: '',
  onClick: () => {},
};

export default UndecoratedLink;
