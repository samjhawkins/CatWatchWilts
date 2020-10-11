import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';

const CatAttributeTile = ({ children, ...rest }) => (
  <Grid
    item
    container
    xs={12}
    md={9}
    elevation={6}
    alignContent="center"
    {...rest}
  >
    {children}
  </Grid>
);

CatAttributeTile.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CatAttributeTile;
