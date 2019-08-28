import React, { PureComponent } from "react";
import _ from "lodash";
import VocabularyWord from './PartialComponents/VocabularyWord';
export default class VocabularyWordsContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      maxNumberOfWords: 1
    };
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
    const generateInput= [];
    for(let i = 0; i < this.state.maxNumberOfWords; i++) {
      generateInput.push(<VocabularyWord index={i} key={i}/>)
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
              onChange={e =>
                this.setState({maxNumberOfWords: e.target.value})
              }
            />
          </div>
        <div className="home-form-vocContainer">
            {generateInput}
          </div>
      </div>
      </div>
    );
  }
}
