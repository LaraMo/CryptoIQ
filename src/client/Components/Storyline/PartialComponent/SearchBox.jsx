import React, {useState, useEffect, useRef} from 'react';

const SearchBox = props => {
  const [displayResult, setDisplayResult] = useState(false);
  const [val, setVal] = useState("");

  useEffect(() => {
    setDisplayResult(props.result.length > 0 ? true : false);
  }, [props.result]);

  useEffect(() => {
    if(props.title) {
      // setDisplayResult(false);
      setVal(props.title);

    }
  }, [props.title]);

  const onBlur = (e) => {
    setTimeout(() => {
      setDisplayResult(false);
    }, 200)
    props.setTitle(e.target.value)
  };

  const onFocus = (e) => {
    setDisplayResult(true);
  };

  const _onResultClick = (e) => {
    props._onResultClick(e)
    setVal(e.target.value)
    setDisplayResult(false)
  };

  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <div>
        <input
          className="search-box"
          name={props.name}
          autoComplete="new-password"
          placeholder={props.placeholder}
          value={val}
          onChange={(e) => {
            setVal(e.target.value)
            props.onChange(e);
          }}
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
