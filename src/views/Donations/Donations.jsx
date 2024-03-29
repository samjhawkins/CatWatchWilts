import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import payPalLogo from '../../images/pp-logo.png';
import justGivingLogo from '../../images/just_giving_logo.jpg';
import PaymentMethod from './PaymentMethod';
import DonateButton from '../../components/DonateButton';
import { useStyles } from '../../themes/useStyles';
import { withMediaQuery } from '../../components/wrappers/MediaQuery';

const imgUrl =
  'https://images.unsplash.com/photo-1517331156700-3c241d2b4d83?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1048&q=80';

const Donations = ({ matches: { aboveSM } }) => {
  const classes = useStyles({ imgUrl, aboveSM });
  return (
    <Grid
      item
      container
      component="main"
      xs={12}
      sm={10}
      justify="space-between"
      className={`${classes.root} ${classes.minHeight}`}
    >
      <Grid
        item
        container
        sm={12}
        md={5}
        component={Paper}
        elevation={6}
        square
        className={classes.paper}
      >
        <Grid item xs={12}>
          <Typography>
            We rely on your donations to keep our cats happy. If you wish to
            donate then we have a paypal link and a just giving page that you
            can go to below.
          </Typography>
        </Grid>
        <PaymentMethod
          name="Paypal"
          logo={payPalLogo}
          button={
            <DonateButton
              href="https://www.paypal.com/paypalme/catwatchdonations"
              size="large"
            />
          }
        />
        <PaymentMethod
          name="JustGiving"
          logo={justGivingLogo}
          button={<DonateButton href="/donations" size="large" />}
        />
        <Grid item xs={12}>
          <Typography component="div">
            At the very least, thank you for your time, and thank you so much
            for your support, it means the world to us (and to our little furry
            wards!). If you need to, you can contact us in the following ways:
            <ul>
              <li>email: marnie@catwatchwilts.com</li>
              <li>address</li>
              <li>socialmedia</li>
              <li>charityinfo</li>
            </ul>
          </Typography>
        </Grid>
      </Grid>
      <Grid item sm={false} md={7} className={classes.image} />
    </Grid>
  );
};

Donations.propTypes = {
  matches: PropTypes.shape({
    aboveSM: PropTypes.bool.isRequired,
  }),
};
Donations.defaultProps = {
  matches: { aboveSM: false },
};

export default withMediaQuery(Donations);
