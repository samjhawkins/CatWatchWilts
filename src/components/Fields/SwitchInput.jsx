import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'react-final-form';
import { Switch } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const SwitchInput = ({ name, label, ...rest }) => {
  return (
    <>
      <Typography>{label}</Typography>
      <Field name={name} type="checkbox">
        {({ input, meta }) => (
          <Switch
            onChange={input.onChange}
            onBlur={input.onBlur}
            {...rest}
            id={meta.name}
            name={meta.name}
            error={meta.error && !!meta.error[0]}
            color="primary"
            checked={input.checked}
          />
        )}
      </Field>
    </>
  );
};

SwitchInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
};

SwitchInput.defaultProps = {
  label: '',
};

export default SwitchInput;
