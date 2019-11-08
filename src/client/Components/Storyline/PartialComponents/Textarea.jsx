import React from "react";

const action = "Enter action #";
const actionPlaceholder = "Then he...";
const TextArea = props => {
  return (
    <div className="home-form-field-storyline">
      <p>
        {action}
        {props.index + 1}
      </p>
      <textarea rows="5" cols="50" placeholder={actionPlaceholder} onChange={props.onChange} />
    </div>
  );
};

export default TextArea;
