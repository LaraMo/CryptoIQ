import React, { PureComponent } from "react";
import _ from "lodash";
import VocabularyWord from "./PartialComponents/VocabularyWord";

export default class VocabularyWordsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      maxNumberOfWords: 1,
      error: ""
    };
    this.validateInputField = this.validateInputField.bind(this);
    this.nonNumericError = React.createRef();
  }

  validateInputField(e) {
    //check if empty --> ask?
    //set to state only if valid
    this.setState({ maxNumberOfWords: e.target.value });
    const errorVocabularyWords = this.nonNumericError.current;

    if (e.target.value.match(/(^[1-9]$|^[1-4][0-9]$|^50$)/)) {
      this.setState({ error: "" });
      errorVocabularyWords.classList.add("hideError");
    } else {
      this.setState({ error: "Please enter a number from 1-50" });
      errorVocabularyWords.classList.remove("hideError");
    }
  }

  render() {
    //Headers
    const vocabularyWords = "Vocabulary Words";
    //Form
    const instructionsPart1 = "Enter any";
    const instructionsPart2 = "and/or ";
    const instructionsPart3 = "vocabulary and defintions";
    const instructionsPart4 = "events and dates";
    const maxNumberOfWords = "How many words would you like to add?";
    const generateInput = [];
    for (let i = 0; i < this.state.maxNumberOfWords; i++) {
      generateInput.push(<VocabularyWord index={i} key={i} />);
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

          <div className="home-form-field">
            <p>{maxNumberOfWords}</p>
            <input
              className="home-form-inputText"
              name="numberOfStudents"
              value={this.state.maxNumberOfWords}
              onChange={this.validateInputField}
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
