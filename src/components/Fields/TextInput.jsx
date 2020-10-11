import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { TextField } from '@material-ui/core';

const TextInput = ({ name, ...rest }) => {
  return (
    <Field name={name}>
      {({ input, meta }) => (
        <TextField
          onChange={input.onChange}
          onBlur={input.onBlur}
          {...rest}
          id={meta.name}
          name={meta.name}
          error={meta.error && !!meta.error[0]}
          helperText={meta.error && meta.error[0]}
          value={input.value}
        />
      )}
    </Field>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TextInput;
