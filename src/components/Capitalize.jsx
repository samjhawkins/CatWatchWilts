import React from 'react';
import PropTypes from 'prop-types';

const Capitalize = ({ children }) => (
  <span style={{ textTransform: 'capitalize' }}>{children}</span>
);

Capitalize.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Capitalize;
