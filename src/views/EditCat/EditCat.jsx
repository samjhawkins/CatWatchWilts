import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import DisplayStepper from '../../components/DisplayStepper';
import { withCatContext } from '../../components/wrappers/CatContext';
import { useStyles } from '../../themes/useStyles';
import { withMediaQuery } from '../../components/wrappers/MediaQuery';
import logger from '../../utils/logger';
import FieldMapper from '../../components/FieldMapper';
import TextInput from '../../components/Fields/TextInput';
import SwitchInput from '../../components/Fields/SwitchInput';
import CatAttributeTile from '../../components/CatForm/CatAttributeTile';
import AddImageButton from '../../components/CatForm/AddImageButton';

const EditCat = ({ selectedCat, updateCat, matches: { aboveSM } }) => {
  const [dimension, setDimension] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const classes = useStyles({ aboveSM });
  const dimensionClass = dimension
    ? classes.swapDimensionsTrue
    : classes.swapDimensionsFalse;
  const catAttributeClass = `${classes.verticalMargin} ${classes.container}`;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <Form
      onSubmit={(formValues) => {
        // eslint-disable-next-line no-console
        logger('formValues submit with', formValues);
        updateCat(formValues);
      }}
      initialValues={selectedCat}
      validate={() => {}}
      render={({ handleSubmit, submitting, pristine, values, form }) => (
        <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
          <Grid item container xs={12} justify="center">
            <CatAttributeTile
              className={catAttributeClass}
              component={Paper}
              justify="space-around"
            >
              <TextInput
                name="name"
                style={{ width: '80%' }}
                label="Name"
                variant="outlined"
                type="string"
              />
              <SwitchInput name="active" label="Active" />
            </CatAttributeTile>
            <CatAttributeTile
              component={Paper}
              className={catAttributeClass}
              justify="space-around"
            >
              <AddImageButton
                className={`${classes.icon} ${classes.appBarItem}`}
                setActiveStep={setActiveStep}
                imageArray={values.imageArray}
                change={form.change}
              />
              <Typography
                className={`${classes.warning} ${classes.appBarItem}`}
              >
                (Warning: No changes will take effect until save is pressed
                below)
              </Typography>
            </CatAttributeTile>
            <CatAttributeTile className={classes.verticalMargin}>
              <DisplayStepper
                edit
                steps={values.imageArray}
                setDimension={setDimension}
                className={dimensionClass}
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </CatAttributeTile>
            <FieldMapper selectedCat={values} className={catAttributeClass} />
            <CatAttributeTile component={Paper} className={catAttributeClass}>
              <Button
                size="large"
                type="button"
                variant="contained"
                onClick={(...args) => {
                  setActiveStep(0);
                  form.reset(...args);
                }}
                disabled={submitting || pristine}
                className={classes.appBarItem}
              >
                Reset
              </Button>

              <Button
                size="large"
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
                className={classes.appBarItem}
              >
                Save
              </Button>
            </CatAttributeTile>
            {process.env.FEVAR_DEBUG_FORM === 'true' && (
              <pre
                style={{ overflowWrap: 'break-word' }}
                className={classes.root}
              >
                {JSON.stringify(values, 0, 2)}
              </pre>
            )}
          </Grid>
        </form>
      )}
    />
  );
};

EditCat.propTypes = {
  selectedCat: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    rows: PropTypes.number,
    cols: PropTypes.number,
    imageArray: PropTypes.arrayOf(
      PropTypes.shape({
        imageName: PropTypes.string,
        image: PropTypes.string,
      }),
    ),
  }).isRequired,
  updateCat: PropTypes.func.isRequired,
  matches: PropTypes.shape({
    aboveSM: PropTypes.bool.isRequired,
    aboveMD: PropTypes.bool.isRequired,
  }),
};

EditCat.defaultProps = {
  matches: { aboveSM: false, aboveMD: false },
};

export default withCatContext(withMediaQuery(EditCat));
