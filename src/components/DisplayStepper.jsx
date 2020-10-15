import React from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  MobileStepper,
  Typography,
  Grid,
} from '@material-ui/core/index';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { useFormState } from 'react-final-form';
import Delete from '@material-ui/icons/Delete';
import TextInput from './Fields/TextInput';
import CurrentSwitchInput from './Fields/CurrentSwitchInput';

const DisplayStepper = (props) => {
  const {
    steps,
    setDimension,
    activeStep,
    setActiveStep,
    className,
    edit,
  } = props;
  const { values } = useFormState();
  const imageDisplaySteps = edit && values.length ? values.imageArray : steps;

  const handleNext = () => {
    const updatedStep = (activeStep + 1) % steps.length;
    setActiveStep(updatedStep);
  };

  const handleBack = () => {
    const updatedStep = (activeStep + steps.length - 1) % steps.length;
    setActiveStep(updatedStep);
  };

  const onLoad = ({ target }) => {
    const imageRatio = target.offsetHeight / target.offsetWidth;
    setDimension(imageRatio >= 1);
  };

  const deleteImage = () => {
    // set current image array without current, reset to 0 index
    setActiveStep(0);
  };

  return (
    <Card raised style={{ width: '100%' }}>
      <CardContent style={{ padding: 0, textAlign: 'center' }}>
        <CardMedia
          onLoad={onLoad}
          component="img"
          alt={imageDisplaySteps[activeStep].imageName}
          image={imageDisplaySteps[activeStep].image}
          title={imageDisplaySteps[activeStep].imageName}
          className={className}
        />
        {edit ? (
          <>
            <TextInput
              name={`imageArray[${activeStep}].imageName`}
              style={{ width: '98%', marginTop: '10px', marginBottom: '10px' }}
              label="Image Name"
              variant="outlined"
              type="string"
            />
            <TextInput
              name={`imageArray[${activeStep}].image`}
              style={{ width: '98%', marginTop: '10px', marginBottom: '10px' }}
              label="Image URL"
              variant="outlined"
              type="string"
            />
            <Grid
              item
              container
              xs={12}
              justify="space-around"
              alignContent="center"
            >
              <Button
                type="button"
                variant="contained"
                onClick={deleteImage}
                disabled={
                  imageDisplaySteps[activeStep].imageId === values.image
                }
              >
                Delete
                <Delete />
              </Button>
              <CurrentSwitchInput
                name="image"
                label="Main image"
                currentImageId={imageDisplaySteps[activeStep].imageId}
              />
            </Grid>
          </>
        ) : (
          <Typography gutterBottom variant="h5" component="h2">
            {steps[activeStep].imageName}
          </Typography>
        )}
      </CardContent>
      <CardActions>
        <MobileStepper
          style={{ width: '100%' }}
          steps={steps.length}
          position="static"
          variant="dots"
          activeStep={activeStep}
          nextButton={
            <Button size="small" onClick={handleNext}>
              Next
              <KeyboardArrowRight />
            </Button>
          }
          backButton={
            <Button size="small" onClick={handleBack}>
              <KeyboardArrowLeft />
              Back
            </Button>
          }
        />
      </CardActions>
    </Card>
  );
};

DisplayStepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      imageName: PropTypes.string,
      image: PropTypes.string,
    }),
  ),
  setDimension: PropTypes.func.isRequired,
  className: PropTypes.string,
  edit: PropTypes.bool,
  activeStep: PropTypes.number.isRequired,
  setActiveStep: PropTypes.func.isRequired,
};

DisplayStepper.defaultProps = {
  className: '',
  edit: false,
  steps: [
    {
      imageName: '',
      image: '',
      imageId: '',
    },
  ],
};

export default DisplayStepper;
