import React from 'react';
import PropTypes from 'prop-types';
import LinkedButton from './links/LinkedButton';
import { useStyles } from '../themes/useStyles';

const DonateButton = ({ href, size }) => {
  const classes = useStyles();
  return (
    <LinkedButton
      className={`${classes.appBarItem} ${classes.donateButton}`}
      href={href}
      text="Donate"
      size={size}
      variant="outlined"
    />
  );
};

DonateButton.propTypes = {
  href: PropTypes.string.isRequired,
  size: PropTypes.string,
};

DonateButton.defaultProps = {
  size: 'small',
};

export default DonateButton;
