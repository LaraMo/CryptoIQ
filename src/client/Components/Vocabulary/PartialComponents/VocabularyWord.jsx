import React, {PureComponent} from 'react';
import _ from 'lodash';
import {validator}  from '../../../helpers/clientValidation';

export default class VocabularyWord extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      wordsEntered: '',
      definitionsEntered: '',
      pageNumberEntered: '',
    };
  }

  componentDidMount() {
    if (this.props.savedDefinition) {
      const {
        wordsEntered,
        definitionsEntered,
        pageNumberEntered,
        index,
      } = this.props.savedDefinition;
      this.setState({
        wordsEntered,
        definitionsEntered,
        pageNumberEntereda,
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.savedDefinition &&
      !prevState.wordsEntered &&
      !prevState.definitionsEntered &&
      !prevState.pageNumberEntered
    ) {
      const {
        wordsEntered,
        definitionsEntered,
        pageNumberEntered,
      } = this.props.savedDefinition;
      this.setState({
        wordsEntered,
        definitionsEntered,
        pageNumberEntered,
      });
    }
  }

  render() {
    //Form
    const word = 'Word';
    const definition = 'Definition';
    const pageNumber = 'Page/Slide';
    const {
      wordsEntered,
      definitionsEntered,
      pageNumberEntered,
      index,
    } = this.state;

    let pageNumberInput = null;
    if(this.props.acceptPageNumber) {
      pageNumberInput = 
      <div className="home-form-field-pageOrSlide">
      <p>{pageNumber}</p>

        <input
          className="pageNumber"
          value={pageNumberEntered}
          onChange={e => {
            this.props.onChange(e, this.props.index);
            //set to state only if valid (valid= numeric)
            if (validator(e.target.value, /^[0-9]*$/, 4)) { 
              this.setState(
                {
                  pageNumberEntered: e.target.value,
                },
                () => this.props.onChange(this.props.index, this.state),
              ); 
            }
          }}
        ></input>
      </div>
    }
    return (
      <div className="home-form-field">
        <div className="home-form-field-word">
          <p>{word}</p>
          <input
            value={wordsEntered}
            onChange={e => {
             //set to state only if valid (valid= letters less then 100)
              this.setState(
                {
                  wordsEntered: e.target.value,
                },
                () => this.props.onChange(this.props.index, this.state),
              );
             }
            }
          />
        </div>

        <div className="home-form-field-definition">
          <p>{definition}</p>
          <input
            id="definition"
            value={definitionsEntered}
            onChange={e => {
              this.props.onChange(e, this.props.index);
               //set to state only if valid (valid= letters less then 400)
              this.setState(
                {
                  definitionsEntered: e.target.value,
                },
                () => this.props.onChange(this.props.index, this.state),
              );
            }}
          ></input>
        </div>
        {pageNumberInput}
      </div>
    );
  }
}
