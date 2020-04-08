import React from 'react';
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

export const DonateButton = (props) => {
  const classes = useStyles();
  return (
    <LinkedButton
      className={`${classes.appBarItem} ${classes.donateButton}`}
      to={props.to}
      text="Donate"
      size={props.size}
      variant="outlined"
    />
  );
};

export default DonateButton;
