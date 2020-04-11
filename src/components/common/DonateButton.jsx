import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import LinkedButton from './links/LinkedButton';

const useStyles = makeStyles((theme) => ({
  appBarItem: {
    margin: theme.spacing(3),
  },
  donateButton: {
    height: theme.spacing(30),
    fontWeight: 'bold',
    backgroundColor: theme.color.white,
    '&:hover': {
      backgroundColor: theme.color.tertiary.main,
    },
  },
}));

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
