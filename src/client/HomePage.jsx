import React, { PureComponent } from "react";
import "../client/styles/home.scss";
import PageProgress from "react-page-progress";

//global consts in this file
const word = "Word";
const defintion = "Defintion";
const maxVocabularyAmountError =
  "You have reached the limit of vocabulary words to input";
const fieldCantBeEmptyError = "This field is requiered";

export default class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      //*** FROM 1 ***/
      //input
      numberOfStudents: "",
      avarageAge: "",
      duration: 15,
      difficultyLevel: "easy"

      //checkbox

      //*** FROM 2 ***/
      //array of input fields
    };

    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.vocabularyContainer = React.createRef();
  }

  /**
   * Adds up to 15 input fields to enter words and defintions for the game
   */
  handleAddButtonClick() {
    const maxVoc = 3; //NOTE: change to 3 when testing
    //find the form
    const form = this.vocabularyContainer.current;
    //allow to add only if length is less than 15
    if (form.children.length < maxVoc) {
      //create elements to append to the form
      const field = document.createElement("div");
      field.classList.add("home-form-field");
      //word
      const wordContainer = document.createElement("div");
      wordContainer.classList.add("home-form-field-word");
      const wordText = document.createElement("p");
      wordText.innerHTML = word;

      const wordInput = document.createElement("input");

      wordContainer.appendChild(wordText);
      wordContainer.appendChild(wordInput);
      field.appendChild(wordContainer);
      //defintion
      const defintionContainer = document.createElement("div");
      defintionContainer.classList.add("home-form-field-definition");
      const defintionText = document.createElement("p");
      defintionText.innerHTML = defintion;

      const defintionInput = document.createElement("input");
      defintionInput.id = "defintion";
      defintionContainer.appendChild(defintionText);
      defintionContainer.appendChild(defintionInput);
      field.appendChild(defintionContainer);

      form.appendChild(field);
    } else if (form.children.length == maxVoc) {
      //generate an error message
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("errorMessage");
      errorMessage.innerHTML = maxVocabularyAmountError;
      form.appendChild(errorMessage);
    }
  }

  render() {
    //Title and description section
    const projectTitle = "CryptIQ 🧩";
    const descriptionPart1 = "Simple ";
    const descriptionPart2 = "and ";
    const descriptionPart3 = "reusable ";
    const descriptionPart4 = "platfrom to generate escape rooms for ";
    const descriptionPart5 = "educational purposes";
    const getStartedPart1 = "Get started ";
    const getStartedPart2 = "now";

    //form variables
    const numberOfStudents = "Number of students:";
    const numbersOnlyPlaceholder = "Numbers only";
    const duration = " Duration of activity:";
    const durationOption1 = "15 mintues";
    const durationOption2 = "20 mintues";
    const durationOption3 = "30 mintues";
    const difficultyLevel = "Difficulty level:";
    const difficultyLevelOption1 = "Easy (2 games)";
    const difficultyLevelOption2 = "Medium (3 games)";
    const difficultyLevelOption3 = "Advanced (4 games)";
    const locks = "Include locks:";
    const textbook = "Allow use of textbook:";
    const enterData = "Enter any";
    const andOr = "and/or ";
    const vocabulary = "vocabulary and defintions";
    const eventsAndDates = "events and dates";
    const add = "Add";
    const next = "Next";
    return (
      <div className="home">
        <PageProgress color={"skyblue"} height={8} />
        {/* Title Container */}
        <div className="homeContainer">
          <div id="slide1" className="home-title">
            <h1>{projectTitle}</h1>
            <h2>
              <span>{descriptionPart1}</span>
              {descriptionPart2}
              <span>{descriptionPart3}</span> {descriptionPart4}
              <span>{descriptionPart5}</span>.
            </h2>
            <h2>
              {getStartedPart1}
              <span>{getStartedPart2}</span>!
            </h2>
          </div>
          {/* Form 1 - Basic Info */}
          <form id="slide2" className="home-formContainer">
            <div className="home-form">
              <div className="home-form-field">
                <p>{numberOfStudents}</p>
                <input
                  className="home-form-inputText"
                  type="number"
                  name="numberOfStudents"
                  value={this.state.numberOfStudents}
                  min="1"
                  max="100"
                  placeholder={numbersOnlyPlaceholder}
                  onChange={e =>
                    this.setState({ numberOfStudents: e.target.value })
                  }
                />
              </div>
              <div className="home-form-field">
                <p>{duration}</p>
                <select
                  className="home-form-selectMenu"
                  onChange={e => this.setState({ duration: e.target.value })}
                >
                  <option value="15" label={durationOption1} />
                  <option value="20" label={durationOption2} />
                  <option value="30" label={durationOption3} />
                </select>
              </div>

              <div className="home-form-field">
                <p>{difficultyLevel}</p>
                <select
                  className="home-form-selectMenu"
                  onChange={e => this.setState({ duration: e.target.value })}
                >
                  <option value="easy" label={difficultyLevelOption1} />
                  <option value="medium" label={difficultyLevelOption2} />
                  <option value="hard" label={difficultyLevelOption3} />
                </select>
              </div>
              <div className="home-form-field">
                <p>{locks}</p>
                <input className="home-form-checkbox" type="checkbox" value="" />

                <p>{textbook}</p>
                <input  className="home-form-checkbox" type="checkbox" value="" />
              </div>
            </div>
            {/* Form 2 - Vocabulary */}
            <div className="home-form">
            <p className="home-form-title">
                  {enterData} <span>{vocabulary}</span> {andOr}
                  <span>{eventsAndDates}</span>
                </p>
              <div className="home-form-vocContainer" ref={this.vocabularyContainer}>
                <div className="home-form-field">
                  <div className="home-form-field-word">
                    <p>{word}</p>
                    <input value="" />
                  </div>

                  <div className="home-form-field-definition">
                    <p>{defintion}</p>
                    <input id="defintion" value="" />
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={this.handleAddButtonClick}
                id="addMore"
              >
                {add}
              </button>
              <button
                type="button"
                onClick={this.handleAddButtonClick}
                id="addMore"
              >
                {next}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
