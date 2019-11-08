import React, {useState} from 'react';

const Checkbox = props => {
  const [isChecked, setIsChecked] = useState(props.default || false);

  function toggleCheckboxChange() {
    const {handleCheckboxChange, label} = props;
    handleCheckboxChange(!isChecked);
    setIsChecked(!isChecked);
  }

  const {label} = props;

  return (
    <div className="home-form-field checkbox">
      <label>
        {label}
        <input
          type="checkbox"
          className="home-form-checkbox"
          value={label}
          checked={isChecked}
          onChange={toggleCheckboxChange}
        />
      </label>
    </div>
  );
};

export default Checkbox;
