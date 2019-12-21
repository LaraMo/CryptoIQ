import React from 'react';

const TextArea = props => {
  const label = props.label || 'Enter action #';
  const placeholder = props.placeholder || 'Then he...';
  let {rows, cols} = props;
  rows = rows || 5;
  cols = cols || 50;
  return (
    <div className="home-form-field-storyline">
      <p>
        {label}
        {props.storyline? props.index + 1 : "" } {/* This logic is used since the text area box is used in other forms, not just the storyline */}
      </p>
      <textarea
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

export default TextArea;
