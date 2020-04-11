import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core/index';
import UndecoratedLink from './UndecoratedLink';

const LinkedButton = ({ to, text, size, colour, className, variant }) => {
  return (
    <UndecoratedLink to={to}>
      <Button
        size={size}
        variant={variant}
        color={colour}
        className={className}
      >
        {text}
      </Button>
    </UndecoratedLink>
  );
};

LinkedButton.propTypes = {
  to: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  size: PropTypes.string,
  colour: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.string,
};

LinkedButton.defaultProps = {
  variant: 'contained',
  size: 'small',
  colour: undefined,
  className: '',
};

export default LinkedButton;
