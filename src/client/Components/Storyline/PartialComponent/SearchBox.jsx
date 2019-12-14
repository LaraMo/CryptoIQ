import React from 'react';

const SearchBox = props => {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        name={props.name}
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        {...props}
      />
      <div className="search-result">
        {props.result.forEach(el => {
            <div class="result">
                <span>{el}</span>
            </div>
        })}
      </div>
    </div>
  );
};

export default SearchBox;
