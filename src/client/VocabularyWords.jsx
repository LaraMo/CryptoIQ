import React, { PureComponent } from "react";
import PageProgress from "react-page-progress";
import _ from "lodash";
import "../client/styles/homePage.scss";
import GeneralInfo from "./GeneralInfo";
export default class VocabularyWords extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      numberOfWords: 1,
      wordsEntered: {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
        11: "",
        12: "",
        13: "",
        14: "",
        15: ""
      },
      defintionsEntered: {
        1: "",
        2: "",
        3: "",
        4: "",
        5: "",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "",
        11: "",
        12: "",
        13: "",
        14: "",
        15: ""
      }
    };

    //Bindings
    this.generateInputFields = this.generateInputFields.bind(this);
    this.submitFrom = this.submitFrom.bind(this);
    //Refs
    this.vocabularyContainer = React.createRef();
  }

  // /**
  //  * Generate 15 possible vocabulary words
  //  */
  generateInputFields() {
    const { wordsEntered, defintionsEntered } = this.state;
    const word = "Word";
    const defintion = "Defintion";
    return (
      <div className="home-form-field">
        <div className="home-form-field-word">
          <p>{word}</p>
          <input
            value={wordsEntered[0]}
            onChange={e =>
              this.setState({
                wordsEntered: { ...wordsEntered, 1: e.target.value }
              })
            }
          />
        </div>

        <div className="home-form-field-definition">
          <p>{defintion}</p>
          <input
            id="defintion"
            value={defintionsEntered[0]}
            onChange={e =>
              this.setState({
                defintionsEntered: { defintionsEntered, 1: e.target.value }
              })
            }
          ></input>
        </div>
      </div>
    );
  }

  /**
   * Performes validation on the input fields
   */
  submitFrom(e) {
    console.log(this.state);
  }

  render() {
    //Headers
    const vocabularyWords = "Vocabulary Words";

    //Form
    const enterData = "Enter any";
    const andOr = "and/or ";
    const vocabularyAndDefintions = "vocabulary and defintions";
    const eventsAndDates = "events and dates";
    const next = "Next";
    const maxNumberOfWords = "How many words would you like to add?";
    const maxNumberOfWordsArray = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15"
    ];
    const { wordsEntered, defintionsEntered } = this.state;
    const word = "Word";
    const defintion = "Defintion";
    return (
      <div id="slide2" className="home-title">
        <h3>{vocabularyWords} </h3>
        <div className="home-form">
          <p className="home-form-title">
            {enterData} <span>{vocabularyAndDefintions}</span> {andOr}
            <span>{eventsAndDates}</span>
          </p>
          <div className="home-form-maxVoc">
            <p>{maxNumberOfWords}</p>
            <select
              className="home-form-selectMenu"
              onChange={e => this.setState({ numberOfWords: e.target.value })}
            >
              {_.map(maxNumberOfWordsArray, item => {
                return <option key={item} value={item} label={item} />;
              })}
            </select>
          </div>
          <div
            className="home-form-vocContainer"
            ref={this.vocabularyContainer}
          >
            <div className="home-form-field">
              <div className="home-form-field-word">
                <p>{word}</p>
                <input
                  value={wordsEntered[0]}
                  onChange={e =>
                    this.setState({
                      wordsEntered: { ...wordsEntered, 1: e.target.value }
                    })
                  }
                />
              </div>

              <div className="home-form-field-definition">
                <p>{defintion}</p>
                <input
                  id="defintion"
                  value={defintionsEntered[0]}
                  onChange={e =>
                    this.setState({
                      defintionsEntered: {
                        defintionsEntered,
                        1: e.target.value
                      }
                    })
                  }
                ></input>
              </div>
            </div>

            <div className="home-form-field">
              <div className="home-form-field-word">
                <p>{word}</p>
                <input
                  value={wordsEntered[1]}
                  onChange={e =>
                    this.setState({
                      wordsEntered: { ...wordsEntered, 2: e.target.value }
                    })
                  }
                />
              </div>
              <div className="home-form-field-definition">
                <p>{defintion}</p>
                <input
                  id="defintion"
                  value={defintionsEntered[1]}
                  onChange={e =>
                    this.setState({
                      defintionsEntered: {
                        ...defintionsEntered,
                        2: e.target.value
                      }
                    })
                  }
                ></input>
              </div>
            </div>
            {/* {_.times(this.state.numberOfWords, this.generateInputFields)} */}
          </div>
        </div>
      </div>
    );
  }
}
