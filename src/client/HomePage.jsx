import React, { PureComponent } from "react";
import '../client/styles/home.scss';
import PageProgress from "react-page-progress";

//global consts in this file
const word = "Word";
const defintion = "Defintion";
const maxVocabularyAmountError = "You have reached the limit of vocabulary words to input";
const fieldCantBeEmptyError = "This field is requiered";

export default class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ////FORM 1
      //input
      numberOfStudents: "",
      avarageAge: "",
      duration: 15
      //checkbox
      ////FORM 2
      //array of input fields
    };

    this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
    this.vocabularyContainer = React.createRef();
  }

  /**
   * Adds up to 15 input fields to enter words and defintions for the game
   *  words (to ask)
   */
  handleAddButtonClick() {
    //find the form
    const form = this.vocabularyContainer.current;
    //allow to add only if length is less than 15
    if (form.children.length < 3) {
      //create elements to append to the form
      const field = document.createElement("div");
      field.classList.add("home-form-field");
      //word
      const wordContainer = document.createElement("div");
      const wordText = document.createElement("p");
      wordText.innerHTML = word;

      const wordInput = document.createElement("input");

      wordContainer.appendChild(wordText);
      wordContainer.appendChild(wordInput);
      field.appendChild(wordContainer);
      //defintion
      const defintionContainer = document.createElement("div");
      const defintionText = document.createElement("p");
      defintionText.innerHTML = defintion;

      const defintionInput = document.createElement("input");
      defintionInput.id = "defintion";
      defintionContainer.appendChild(defintionText);
      defintionContainer.appendChild(defintionInput);
      field.appendChild(defintionContainer);

      form.appendChild(field);
    } else if (form.children.length == 3) {
      //generate an error message
      const errorMessage = document.createElement("p");
      errorMessage.classList.add("errorMessage");
      errorMessage.innerHTML = maxVocabularyAmountError;
      form.appendChild(errorMessage);
    }
  };

  render() {
    const numberOfStudents = "Number of students:";
    const numbersOnlyPlaceholder = "Numbers only";
    const duration = " Duration of activity:";
    const durationOption1 = "15 mintues";
    const durationOption2 = "20 mintues";
    const durationOption3 = "30 mintues";
    const locks = "Include locks:";
    const textbook = "Allow use of textbook:";
    const enterData = "Enter any";
    const andOr = "and/or";
    const vocabulary = "vocabulary and defintions";
    const eventsAndDates = "events and dates";
    const add = "Add";
    const next = "Next";
    return (
      <div className="home">
        <PageProgress color={'skyblue'} height={8} />
        <div className="homeContainer">
          <div id="slide1" className="home-title">
            <h1>CryptIQ 🧩</h1>
            <h2>
              <span>Simple</span> and <span>reusable</span> platfrom to generate
              escape rooms for <span>educational purposes</span>.
            </h2>
            <h2>
              Get started <span>now</span>!
            </h2>
          </div>
          <form id="slide2" className="home-formContainer">
            <div className="home-form">
              <div className="home-form-field">
                <p>{numberOfStudents}</p>
                <input
                  type="number"
                  name="numberOfStudents"
                  value={this.state.numberOfStudents}
                  placeholder={numbersOnlyPlaceholder}
                  min="1"
                  max="100"
                  onChange={e =>
                    this.setState({ numberOfStudents: e.target.value })
                  }
                />
              </div>
              <div className="home-form-field">
                <p>{duration}</p>
                <select
                  onChange={e => this.setState({ duration: e.target.value })}
                >
                  <option value="15" label={durationOption1} />
                  <option value="20" label={durationOption2} />
                  <option value="30" label={durationOption3} />
                </select>
              </div>
              <div className="home-form-field">
                <p>{locks}</p>
                <input type="checkbox" value="" />

                <p>{textbook}</p>
                <input type="checkbox" value="" />
              </div>
            </div>

            <div className="home-form">
              <div ref={this.vocabularyContainer}>
                <p>
                  {enterData} <span>{vocabulary}</span> {andOr}
                  <span>{eventsAndDates}</span>
                </p>

                <div className="home-form-field">
                  <div>
                    <p>{word}</p>
                    <input value="" />
                  </div>

                  <div>
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
