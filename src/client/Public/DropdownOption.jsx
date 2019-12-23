import React from 'react';

const DropdownOption = props => {
  return (
    <option
      value={props.value}
      label={props.label}
      selected={props.selected}
      {...props}
    />
  );
};

export default DropdownOption;
