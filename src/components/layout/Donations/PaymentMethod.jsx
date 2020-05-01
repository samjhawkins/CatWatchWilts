import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(6),
    width: theme.spacing(100),
    height: theme.spacing(25),
  },
  topMargin: {
    paddingTop: theme.spacing(8),
  },
}));

const PaymentMethod = ({ name, button, logo }) => {
  const classes = useStyles();
  return (
    <>
      <Grid item container xs={12} className={classes.topMargin}>
        <Grid item xs={12} sm={8} md={12} lg={9}>
          <Avatar
            alt={`${name} logo`}
            src={logo}
            variant="rounded"
            className={classes.avatar}
          />
        </Grid>
        <Grid item xs={12} sm={4} md={12} lg={3}>
          {button}
        </Grid>
      </Grid>
    </>
  );
};

PaymentMethod.propTypes = {
  name: PropTypes.string.isRequired,
  button: PropTypes.node.isRequired,
  logo: PropTypes.string.isRequired,
};

export default PaymentMethod;
