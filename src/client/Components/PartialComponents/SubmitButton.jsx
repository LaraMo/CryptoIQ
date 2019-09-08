import React from 'react';

const SubmitButton = (props) => {
  const _onSubmit = (e) => {
    props.onClick()
    e.preventDefault();
  };
  return <button type="button" className="submitButton" onClick={_onSubmit}>Get me an escape room!</button>;
};

export default SubmitButton;
