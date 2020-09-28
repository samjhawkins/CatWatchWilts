import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  MobileStepper,
  Button,
  Card,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
} from '@material-ui/core/index';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';

const DisplayStepper = (props) => {
  const { steps, setDimension, className } = props;
  const [activeStep, setActiveStep] = useState(0);

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

  return (
    <Card raised>
      <CardContent style={{ padding: 0, textAlign: 'center' }}>
        <CardMedia
          onLoad={onLoad}
          component="img"
          alt={steps[activeStep].imageName}
          image={steps[activeStep].image}
          title={steps[activeStep].imageName}
          className={className}
        />
        <Typography gutterBottom variant="h5" component="h2">
          {steps[activeStep].imageName}
        </Typography>
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
  ).isRequired,
  setDimension: PropTypes.func.isRequired,
  className: PropTypes.string,
};

DisplayStepper.defaultProps = {
  className: '',
};

export default DisplayStepper;
