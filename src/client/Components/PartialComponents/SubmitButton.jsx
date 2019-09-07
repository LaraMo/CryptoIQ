import React from 'react';

const SubmitButton = (props) => {
  const _onSubmit = (e) => {
    props.onClick()
    console.log('hello');
    e.preventDefault();
  };
  return <button type="button" className="" onClick={_onSubmit}>Submit</button>;
};

export default SubmitButton;
