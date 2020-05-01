import React from 'react';
import PropTypes from 'prop-types';
import { useMediaQuery } from '@material-ui/core';

const MediaQuery = ({ children }) => {
  const renderChildren = {
    ...children,
    props: {
      ...children.props,
      matches: {
        aboveXS: useMediaQuery((theme) => theme.breakpoints.up('xs')),
        aboveSM: useMediaQuery((theme) => theme.breakpoints.up('sm')),
        aboveMD: useMediaQuery((theme) => theme.breakpoints.up('md')),
        aboveLG: useMediaQuery((theme) => theme.breakpoints.up('lg')),
        aboveXL: useMediaQuery((theme) => theme.breakpoints.up('xl')),
      },
    },
  };

  return <>{renderChildren}</>;
};

MediaQuery.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MediaQuery;
