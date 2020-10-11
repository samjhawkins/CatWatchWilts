import React from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import LinkedButton from '../links/LinkedButton';
import { withAuthContext } from '../wrappers/AuthContext';

const CatTitle = ({ name, age, editCat, isLoggedIn }) => {
  return (
    <Grid item container xs={12} justify="space-around">
      {isLoggedIn && (
        <LinkedButton
          onClick={editCat}
          to="editCat"
          size="small"
          color="secondary"
          text="Edit Details"
        />
      )}
      <Typography component="span">
        <>
          {/* eslint-disable-next-line eqeqeq */}
          {name} - {age} year{age == '1' || 's'} old
        </>
      </Typography>
    </Grid>
  );
};

CatTitle.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  name: PropTypes.string,
  age: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  editCat: PropTypes.func.isRequired,
};

CatTitle.defaultProps = {
  name: undefined,
  age: undefined,
};

export default withAuthContext(CatTitle);
