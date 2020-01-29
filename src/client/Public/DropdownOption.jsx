import React from 'react';

const DropdownOption = props => {
  return (
    <option
      value={props.value}
      label={props.label}
      {...props}
    />
  );
};

export default DropdownOption;
