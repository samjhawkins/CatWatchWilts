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
import { useFormState, useForm } from 'react-final-form';
import TextInput from './Fields/TextInput';
import CurrentSwitchInput from './Fields/CurrentSwitchInput';
import { useStyles } from '../themes/useStyles';
import DeleteButton from './CatForm/DeleteButton';

const DisplayStepper = (props) => {
  const {
    steps,
    setDimension,
    activeStep,
    setActiveStep,
    className,
    edit,
  } = props;
  const classes = useStyles({});
  let values;
  let change;
  if (edit) {
    change = useForm().change;
    values = useFormState().values;
  }
  const imageDisplaySteps = edit && values?.length ? values.imageArray : steps;

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
    const newArray = [...values.imageArray];
    newArray.splice(activeStep, 1);
    change('imageArray', newArray);
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
              style={{ width: '98%', marginTop: '15px', marginBottom: '15px' }}
              label="Image Name"
              variant="outlined"
              type="string"
            />
            <TextInput
              name={`imageArray[${activeStep}].image`}
              style={{ width: '98%', marginTop: '15px', marginBottom: '15px' }}
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
              <DeleteButton
                onClick={deleteImage}
                className={`${classes.redButton} ${classes.appBarItem}`}
                disabled={
                  imageDisplaySteps[activeStep].imageId === values.image
                }
              />
              <CurrentSwitchInput
                name="image"
                label="Main image"
                currentImageId={imageDisplaySteps[activeStep].imageId}
                className={classes.appBarItem}
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
