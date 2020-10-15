import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';

const EditButton = ({ disabled, className, onClick, noLabel, ...rest }) => {
  return (
    <Button
      type="button"
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...rest}
    >
      {!noLabel && 'Edit'}
      <Edit />
    </Button>
  );
};

EditButton.propTypes = {
  disabled: PropTypes.bool,
  noLabel: PropTypes.bool,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

EditButton.defaultProps = {
  disabled: false,
  noLabel: false,
};

export default EditButton;
