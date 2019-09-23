import React from 'react';

const ErrorMessage = props => {
  return (
    <span
      className={`home-form-field-error ${props.error ? '': 'hideError'}`}
    >
      {props.error}
    </span>
  );
};

export default ErrorMessage;
