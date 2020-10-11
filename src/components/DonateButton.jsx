import React from 'react';
import PropTypes from 'prop-types';
import LinkedButton from './links/LinkedButton';
import { useStyles } from '../themes/useStyles';

const DonateButton = ({ to, size }) => {
  const classes = useStyles();
  return (
    <LinkedButton
      className={`${classes.appBarItem} ${classes.donateButton}`}
      to={to}
      text="Donate"
      size={size}
      variant="outlined"
    />
  );
};

DonateButton.propTypes = {
  to: PropTypes.string.isRequired,
  size: PropTypes.string,
};

DonateButton.defaultProps = {
  size: 'small',
};

export default DonateButton;
