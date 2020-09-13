import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import useStyles from '../../../themes/useStyles';

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
            className={classes.avatar_large}
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
