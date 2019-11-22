import React, {useState} from 'react';

const Checkbox = props => {
  const [isChecked, setIsChecked] = useState(props.default || false);
  const changeCallback = props.onChange;
  function toggleCheckboxChange() {
    setIsChecked(!isChecked);
    if (changeCallback) {
      changeCallback(!isChecked);
    }
  }

  const {label} = props;

  return (
    <div className="home-form-field checkbox">
      <label>
        {label}
        <input
          type="checkbox"
          className="home-form-checkbox"
          checked={isChecked}
          onChange={toggleCheckboxChange}
        />
      </label>
    </div>
  );
};

export default Checkbox;
