import React, {useState, useEffect} from 'react';

const Checkbox = props => {
  const [isChecked, setIsChecked] = useState(props.default || false);

  useEffect(() => {
    console.log(props.default)
    // if(props.default !== isChecked) {
    //   toggleCheckboxChange();
    // }
    setIsChecked(props.default)
  }, [props.default])
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
