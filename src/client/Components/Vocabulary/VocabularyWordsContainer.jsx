import React, {PureComponent} from 'react';
import _ from 'lodash';
import VocabularyWord from './PartialComponents/VocabularyWord';
import ErrorMessage from '../PartialComponents/ErrorMessage';
import { getLatestGameData } from '../../helpers/localStorageHelper';

export default class VocabularyWordsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.MIN_WORD_COUNT = 8;
    this.MAX_WORD_COUNT = 25;
    this.state = {
      maxNumberOfWords: this.MIN_WORD_COUNT,
      words: [],
      error: '',
    };
    this._onWordChange = this._onWordChange.bind(this);

    this._onWordCountChange = value => {
      if (
        parseInt(value) <= this.MAX_WORD_COUNT &&
        parseInt(value) >= this.MIN_WORD_COUNT
      ) {
        this.setStateExt({maxNumberOfWords: value, error: ''});
      } else {
        this.setStateExt({
          maxNumberOfWords: value,
          error: `Invalid number of word! Please enter a number from ${this.MIN_WORD_COUNT} to ${this.MAX_WORD_COUNT}`,
        });
      }
    };
    this._onWordCountChange = this._onWordCountChange.bind(this);
  }

  componentDidMount() {
    this.sync()
  }

  sync() {
    const { vocalbulary }  = getLatestGameData()
    if(!_.isEmpty(vocalbulary)) {
      this.setVocabulary(vocalbulary);
    }
  }

  setVocabulary(vocabulary) {
    this.setStateExt({
      maxNumberOfWords: vocabulary.maxNumberOfWords,
      words: vocabulary.words
    })
  }

  setStateExt(state) {
    this.setState(state, () => {
      this.props.updateForm(this.state);
    });
  }

  _onWordChange(index, wordState) {
    this.state.words[index] = wordState;
    this.setStateExt(this.state);
  }

  render() {
    //Headers
    const vocabularyWords = 'Vocabulary Words';
    //Form
    const instructionsPart1 = 'Enter any';
    const instructionsPart2 = ' and/or ';
    const instructionsPart3 = 'vocabulary and defintions';
    const instructionsPart4 = 'events and dates';
    const maxNumberOfWords = 'How many words would you like to add?';
    const generateInput = [];
    if (!this.state.error) {
      for (let i = 0; i < this.state.maxNumberOfWords; i++) {
        generateInput.push(
          <VocabularyWord
            index={i}
            key={i}
            onChange={this._onWordChange}
            acceptPageNumber={this.props.acceptPageNumber}
            savedDefinition={this.state.words[i]}
          />,
        );
      }
    }

    let errorMessage = null;
    if (this.state.error) {
      errorMessage = <ErrorMessage error={this.state.error} />;
    }

    return (
      <div id="slide2" className="home-formContainer">
        <h3>{vocabularyWords} </h3>
        <div className="home-form">
          <p className="home-form-title">
            {instructionsPart1} <span>{instructionsPart3}</span>
            {instructionsPart2}
            <span>{instructionsPart4}</span>
          </p>
          {errorMessage}
          <div className="home-form-field">
            <p>{maxNumberOfWords}</p>
            <input
              className="home-form-inputText"
              name="numberOfStudents"
              value={this.state.maxNumberOfWords}
              onChange={e => {
                this._onWordCountChange(e.target.value);
              }}
            />
          </div>

          <span
            className="home-form-field-error hideError"
            ref={this.errorVocabularyWords}
          ></span>
          <div className="home-form-vocContainer">{generateInput}</div>
        </div>
      </div>
    );
  }
}
