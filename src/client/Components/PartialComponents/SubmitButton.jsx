import React from 'react';

const SubmitButton = props => {
  const _onSubmit = e => {
    props.onClick();
    e.preventDefault();
  };
  return (
    <button
      type="button"
      className="submitButton"
      onClick={_onSubmit}
    >
      {props.text}
    </button>
  );
};

export default SubmitButton;
