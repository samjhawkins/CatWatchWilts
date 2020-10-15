import React from 'react';
import PropTypes from 'prop-types';
import { Field, useFormState, useForm } from 'react-final-form';
import { Switch, FormControlLabel } from '@material-ui/core';

const SwitchInput = ({ name, label, currentImageId, ...rest }) => {
  const { change } = useForm();
  const { values } = useFormState();
  const onChange = () => {
    if (currentImageId !== values.image) {
      change('image', currentImageId);
    }
  };
  return (
    <FormControlLabel
      label={label}
      control={
        <Field name={name} type="checkbox">
          {({ input, meta }) => (
            <Switch
              onChange={onChange}
              onBlur={input.onBlur}
              {...rest}
              id={meta.name}
              name={meta.name}
              error={meta.error && !!meta.error[0]}
              color="primary"
              checked={currentImageId === values.image}
            />
          )}
        </Field>
      }
    />
  );
};

SwitchInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  currentImageId: PropTypes.string,
};

SwitchInput.defaultProps = {
  label: '',
  currentImageId: '',
};

export default SwitchInput;
