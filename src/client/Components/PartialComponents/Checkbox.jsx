import React, {useState, useEffect} from 'react';

const Checkbox = props => {
  const [isChecked, setIsChecked] = useState(props.default || false);

  useEffect(() => {
    setIsChecked(props.default)
  }, [props.default])
  const changeCallback = props.onChange;
  function toggleCheckboxChange() {
    setIsChecked(!isChecked);
    if (changeCallback) {
      changeCallback(!isChecked);
    }
  }

  const {label, id, question, questionToolTip} = props;
  return (
    <div className="home-form-field checkbox">
      <label>
        {label}
        {question ?
          <p className="questionContainer">
            <span className="question">?</span>
            <span className="question-toolTip">{questionToolTip}</span>
          </p> 
        : ""}
        <input
          type="checkbox"
          id={id}
          className="home-form-checkbox"
          checked={isChecked}
          onChange={toggleCheckboxChange}
        />
      </label>
    </div>
  );
};

export default Checkbox;
