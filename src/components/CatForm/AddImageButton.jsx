import React from 'react';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import newIdGenerator from '../../utils/newIdGenerator';

const AddImageButton = ({ className, setActiveStep, imageArray, change }) => {
  const addNewImage = () => {
    const newSteps = [...imageArray];
    newSteps.push({
      imageId: newIdGenerator(),
      imageName: 'Image Name',
      image: 'Image Url',
    });
    change('imageArray', newSteps);
    setActiveStep(newSteps.length - 1);
  };

  return (
    <Button
      aria-label="Add a cat image"
      className={className}
      color="primary"
      variant="contained"
      onClick={addNewImage}
    >
      <Typography>New image</Typography>
      <Add />
    </Button>
  );
};

AddImageButton.propTypes = {
  className: PropTypes.string.isRequired,
  setActiveStep: PropTypes.func.isRequired,
  imageArray: PropTypes.arrayOf(PropTypes.shape({})),
  change: PropTypes.func.isRequired,
};

AddImageButton.defaultProps = {
  imageArray: [],
};

export default AddImageButton;
