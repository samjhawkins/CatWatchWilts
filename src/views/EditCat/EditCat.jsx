import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import DisplayStepper from '../../components/DisplayStepper';
import { withCatContext } from '../../components/wrappers/CatContext';
import { useStyles } from '../../themes/useStyles';
import { withMediaQuery } from '../../components/wrappers/MediaQuery';
import mockSteps from '../../mocks/mockSteps';
import FieldMapper from '../../components/FieldMapper';
import TextInput from '../../components/Fields/TextInput';
import SwitchInput from '../../components/Fields/SwitchInput';
import CatAttributeTile from '../../components/CatForm/CatAttributeTile';

const EditCat = ({ selectedCat, matches: { aboveSM } }) => {
  const [dimension, setDimension] = useState(false);
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
        console.log('formValues submit with', formValues);
        // updateCat(formValues);
      }}
      initialValues={{ ...selectedCat, imageArray: mockSteps }}
      validate={() => {}}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
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
            <CatAttributeTile component={Paper} className={catAttributeClass}>
              <Button
                aria-label="Add a cat image"
                className={classes.icon}
                color="primary"
                variant="contained"
              >
                <Typography>New image</Typography>
                <Add />
              </Button>
              <Typography className={classes.warning}>
                (Warning: This will not be confirmed until you save below)
              </Typography>
            </CatAttributeTile>
            <CatAttributeTile className={classes.verticalMargin}>
              <DisplayStepper
                edit
                steps={selectedCat.imageArray || mockSteps}
                setDimension={setDimension}
                className={dimensionClass}
              />
            </CatAttributeTile>
            <FieldMapper
              selectedCat={selectedCat}
              className={catAttributeClass}
            />
            <CatAttributeTile component={Paper} className={catAttributeClass}>
              <Button
                type="button"
                variant="contained"
                onClick={reset}
                disabled={submitting || pristine}
              >
                Reset
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
              >
                Submit
              </Button>
            </CatAttributeTile>
            {process.env.DEBUG_FORM === 'true' && (
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
    image: PropTypes.number,
    rows: PropTypes.number,
    cols: PropTypes.number,
    imageArray: PropTypes.arrayOf(
      PropTypes.shape({
        imageName: PropTypes.string,
        image: PropTypes.string,
      }),
    ),
  }).isRequired,
  matches: PropTypes.shape({
    aboveSM: PropTypes.bool.isRequired,
    aboveMD: PropTypes.bool.isRequired,
  }),
};

EditCat.defaultProps = {
  matches: { aboveSM: false, aboveMD: false },
};

export default withCatContext(withMediaQuery(EditCat));
