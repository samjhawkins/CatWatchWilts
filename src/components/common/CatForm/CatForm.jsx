import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'react-final-form';
import { Paper, Grid, Button } from '@material-ui/core';
import TextInput from '../Fields/TextInput';

const CatForm = ({ mode, cat, withInitialDisplay }) => (
  <Form
    onSubmit={(formValues) => {
      console.log('formValues', formValues);
    }}
    initialValues={cat}
    validate={() => {}}
    render={({ handleSubmit, reset, submitting, pristine, values }) => (
      <form onSubmit={handleSubmit} noValidate>
        <Paper style={{ padding: 16 }}>
          <Grid container alignItems="flex-start" spacing={2}>
            <Grid item xs={6}>
              <TextInput label="Name" name="name" variant="outlined" />
            </Grid>
            <Grid item xs={6}>
              <TextInput
                label="Age"
                name="age"
                variant="outlined"
                type="number"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                label="Description"
                name="description"
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                label="Image description"
                name="imageName"
                variant="outlined"
              />
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
              <Button
                type="button"
                variant="contained"
                onClick={reset}
                disabled={submitting || pristine}
              >
                Reset
              </Button>
            </Grid>
            <Grid item style={{ marginTop: 16 }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={submitting}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Paper>
        {withInitialDisplay && <pre>{JSON.stringify(values, 0, 2)}</pre>}
      </form>
    )}
  />
);

CatForm.propTypes = {
  cat: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  withInitialDisplay: PropTypes.bool,
};

CatForm.defaultProps = {
  withInitialDisplay: false,
};

export default CatForm;
