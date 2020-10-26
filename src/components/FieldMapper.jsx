import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextInput from './Fields/TextInput';
import capitalize from '../utils/capitalize';

const removedValues = {
  imageArray: true,
  cols: true,
  rows: true,
  active: true,
  id: true,
  image: true,
};

const FieldMapper = ({ selectedCat, className }) => {
  return Object.keys(selectedCat)
    .filter((e) => !removedValues[e])
    .map((attributeName) => {
      const label = capitalize(attributeName);
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
          <TextInput
            style={{ width: '98%' }}
            label={label}
            name={attributeName}
            variant="outlined"
            type={`${typeof selectedCat[attributeName]}`}
          />
        </Grid>
      );
    });
};

FieldMapper.propTypes = {
  selectedCat: PropTypes.shape({}).isRequired,
  className: PropTypes.string,
};

FieldMapper.defaultProps = {
  className: '',
};

export default FieldMapper;
