import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';

const DeleteButton = ({ disabled, className, onClick, noLabel, ...rest }) => {
  return (
    <Button
      type="button"
      variant="contained"
      onClick={onClick}
      disabled={disabled}
      className={className}
      {...rest}
    >
      {!noLabel && 'Delete'}
      <Delete />
    </Button>
  );
};

DeleteButton.propTypes = {
  disabled: PropTypes.bool,
  noLabel: PropTypes.bool,
  className: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

DeleteButton.defaultProps = {
  disabled: false,
  noLabel: false,
};

export default DeleteButton;
