import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import DisplayStepper from '../../common/DisplayStepper';
import { withCatContext } from '../../common/wrappers/CatContext';
import { useStyles } from '../../../themes/useStyles';
import { withMediaQuery } from '../../common/wrappers/MediaQuery';
import mockSteps from '../../../mocks/mockSteps';
import { Form } from 'react-final-form';
import FieldMapper from '../../common/FieldMapper';
import { Button } from '@material-ui/core';

const EditCat = ({ selectedCat, matches: { aboveSM } }) => {
  const [dimension, setDimension] = useState(false);
  const classes = useStyles({ aboveSM });
  const dimensionClass = dimension
    ? classes.swapDimensionsTrue
    : classes.swapDimensionsFalse;

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const withInitialDisplay = true;

  return (
    <Form
      onSubmit={(formValues) => {
        console.log('formValues submit with', formValues);
        // updateCat(formValues);
      }}
      initialValues={selectedCat}
      validate={() => {}}
      render={({ handleSubmit, reset, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit} noValidate style={{ width: '100%' }}>
          <Grid item container xs={12} justify="center">
            <Grid
              item
              container
              xs={12}
              md={9}
              component={Paper}
              elevation={6}
              className={`${classes.verticalMargin} ${classes.container}`}
            >
              <Typography component="h1" variant="h3">
                {selectedCat.name}
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs={12}
              md={9}
              elevation={6}
              className={classes.verticalMargin}
            >
              <DisplayStepper
                steps={selectedCat.imageArray || mockSteps}
                setDimension={setDimension}
                className={dimensionClass}
              />
            </Grid>
            <FieldMapper
              selectedCat={selectedCat}
              className={`${classes.verticalMargin} ${classes.container}`}
            />
            <Grid
              item
              container
              xs={12}
              md={9}
              component={Paper}
              elevation={6}
              className={`${classes.verticalMargin} ${classes.container}`}
            >
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
            </Grid>
            {withInitialDisplay && <pre>{JSON.stringify(values, 0, 2)}</pre>}
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
  matches: PropTypes.shape({
    aboveSM: PropTypes.bool.isRequired,
    aboveMD: PropTypes.bool.isRequired,
  }),
};

EditCat.defaultProps = {
  matches: { aboveSM: false, aboveMD: false },
};

export default withCatContext(withMediaQuery(EditCat));
