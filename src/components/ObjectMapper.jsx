import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Capitalize from './Capitalize';

const displayValues = {
  age: true,
  description: true,
};

const ObjectMapper = ({ selectedCat, className }) => {
  return Object.keys(selectedCat)
    .filter((e) => !!displayValues[e])
    .map((attributeName) => {
      return (
        <Grid
          item
          container
          xs={12}
          md={9}
          component={Paper}
          elevation={6}
          className={className}
          key={`attribute_${attributeName}`}
        >
          <Typography component="h1" variant="h5">
            <Capitalize>{attributeName}</Capitalize>:{' '}
            {selectedCat[attributeName]}
          </Typography>
        </Grid>
      );
    });
};

ObjectMapper.propTypes = {
  selectedCat: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
};

ObjectMapper.defaultProps = {
  className: '',
};

export default ObjectMapper;
