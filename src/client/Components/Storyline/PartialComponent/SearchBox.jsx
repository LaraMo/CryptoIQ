import React, {useState, useEffect, useRef} from 'react';

const SearchBox = props => {
  const [displayResult, setDisplayResult] = useState(false);

  useEffect(() => {
    setDisplayResult(props.result.length > 0 ? true : false);
  }, [props.result]);

  useEffect(() => {
    if(props.title) {
      setDisplayResult(false);
    }
  }, [props.title]);

  const onBlur = (e) => {
    setTimeout(() => {
      setDisplayResult(false);
    }, 500)
  };

  const onFocus = (e) => {
    setDisplayResult(true);
  };

  const _onResultClick = (e) => {
    console.log(e)
    props._onResultClick(e)
    setDisplayResult(false)
  };

  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <div>
        <input
          name={props.name}
          autoComplete="new-password"
          placeholder={props.placeholder}
          value={props.title || props.value}
          onChange={props.onChange}
          onBlur={onBlur}
          onFocus={onFocus}
        />
        {displayResult && (
          <div className="search-result">
              {props.result &&
                  <ul>
                    {props.result.map((el, key) => {
                      return (
                        <li onClickCapture={_onResultClick} key={key} className="result">
                          <span>{el}</span>
                        </li>
                      );
                    })}
                  </ul>
              }
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
