import React, { PureComponent } from "react";
import PageProgress from "react-page-progress";
import _ from "lodash";
import "../client/styles/homePage.scss";

export default class HomePage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      numberOfWords: 1,
      general: {
        numberOfStudents: "",
        duration: 15,
        difficultyLevel: 2,
        locks: false,
        textbook: false
      },
      //vocabulary
      wordsEntered: {},
      defintionsEntered: {},
      //stroyline
      storyline: {
        title: "",
        p1: "",
        p2: "",
        p3: "",
        p4: ""
      }
    };

    this.generateInputVocFields = this.generateInputVocFields.bind(this);
    this.generateStoryline = this.generateStoryline.bind(this);
    this.submitFrom = this.submitFrom.bind(this);
    this.vocabularyContainer = React.createRef();
  }

  /**
   * Generate a storyline depending on the difficulty
   */
  generateStoryline() {
    const { storyline } = this.state;
    const action = "Enter action:";
    const actionPlaceholder = "The prince has to...";
    return (
      <div className="home-form-field-storyline">
      <p>{action}</p>
      <textarea
      textarea rows="4" cols="60"
       value={storyline.numberOfStudents}
       placeholder={actionPlaceholder}
       onChange={e =>
         this.setState({
          storyline: { ...storyline, numberOfStudents: e.target.value }
         })
       }
     />
     </div>
    );
  }

  /**
   * Generate 15 possible vocabulary words
   */
  generateInputVocFields() {
    const { wordsEntered, defintionsEntered } = this.state;
    const word = "Word";
    const defintion = "Defintion";    
    return (
      <div className="home-form-field">
        <div className="home-form-field-word">
          <p>{word}</p>
          <input
            value={wordsEntered}
            onChange={e =>
              this.setState({
                wordsEntered: { wordsEntered : e.target.value }
              })
            }
          />
        </div>

        <div className="home-form-field-definition">
          <p>{defintion}</p>
          <input
            id="defintion"
            value={defintionsEntered}
            onChange={e =>
              this.setState({
                defintionsEntered: { defintionsEntered: e.target.value }
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
  submitFrom(e){
    console.log(this.state)
  }

  render() {
    //Main Title and Description Section
    const projectTitle = "CryptIQ 🧩";
    const descriptionPart1 = "Simple ";
    const descriptionPart2 = "and ";
    const descriptionPart3 = "reusable ";
    const descriptionPart4 = "platfrom to generate escape rooms for ";
    const descriptionPart5 = "educational purposes";
    const getStartedPart1 = "Get started ";
    const getStartedPart2 = "now";

    //Headers
    const generalInfo = "General Info";
    const vocabularyWords = "Vocabulary Words";
    const storyline = "Storyline";

    //Form
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
    const vocabularyAndDefintions = "vocabulary and defintions";
    const eventsAndDates = "events and dates";
    const next = "Next";
    const maxNumberOfWords = "How many words would you like to add?"
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
    const titleOfStory = "Enter title:";
    const titleOfStoryPlaceholder = "The kings ring";
    const opening = "Enter opening:";
    const openingPlaceholder = "Once upon a time...";
    const quest = "Enter the main characthers quest:";
    const questPlaceholder = "The left for the dangerous adventure in order to...";
    const ending = "Enter ending:";
    const endingPlaceholder = "...and they lived happily ever after, the end!";
    const { general} = this.state;
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
          {/* Form Part1 - Basic Info */}
          <form id="slide2" className="home-formContainer">
            <h3>{generalInfo}</h3>

            <div className="home-form">
              <div className="home-form-field">
                <p>{numberOfStudents}</p>
                <input
                  className="home-form-inputText"
                  name="numberOfStudents"
                  value={general.numberOfStudents}
                  placeholder={numbersOnlyPlaceholder}
                  onChange={e =>
                    this.setState({
                      general: { ...general, numberOfStudents: e.target.value }
                    })
                  }
                />
              </div>

              <div className="home-form-field">
                <p>{duration}</p>
                <select
                  className="home-form-selectMenu"
                  onChange={e =>
                    this.setState({
                      general: { ...general, duration: e.target.value }
                    })
                  }
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
                  onChange={e =>
                    this.setState({
                      general: { ...general, difficultyLevel: e.target.value }
                    })
                  }
                >
                  <option value="2" label={difficultyLevelOption1} />
                  <option value="3" label={difficultyLevelOption2} />
                  <option value="4" label={difficultyLevelOption3} />
                </select>
              </div>

              <div className="home-form-field">
                <p>{locks}</p>
                <input
                  className="home-form-checkbox"
                  type="checkbox"
                  onChange={e =>
                    this.setState({
                      general: { ...general, locks: e.target.checked }
                    })
                  }
                />

                <p>{textbook}</p>
                <input
                  className="home-form-checkbox"
                  type="checkbox"
                  onChange={e =>
                    this.setState({
                      general: { ...general, textbook: e.target.checked }
                    })
                  }
                />
              </div>
            </div>

            {/* Form Part2 - Vocabulary */}
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
                  onChange={e =>
                    this.setState({ numberOfWords: e.target.value })
                  }
                >
                  {_.map(maxNumberOfWordsArray, item => {
                    return <option value={item} label={item} />;
                  })}
                </select>
                </div>
              <div
                className="home-form-vocContainer"
                ref={this.vocabularyContainer}
              >
                {_.times(this.state.numberOfWords, this.generateInputVocFields)}
              </div>
            </div>


          
            {/* Form Part3 - Storyline */}
            <h3>{storyline} </h3>
            <div className="home-form">
            <div className="home-form-field-storyline">
                <div>
                <p>{titleOfStory}</p>
                <input
                  className="home-form-inputText"
                  name="numberOfStudents"
                  value={general.numberOfStudents}
                  placeholder={titleOfStoryPlaceholder}
                  onChange={e =>
                    this.setState({
                      general: { ...general, numberOfStudents: e.target.value }
                    })
                  }
                />
                </div>
                <div>
                <p>{opening}</p>
                <textarea
                 textarea rows="4" cols="60"
                  value={general.numberOfStudents}
                  placeholder={openingPlaceholder}
                  onChange={e =>
                    this.setState({
                      general: { ...general, numberOfStudents: e.target.value }
                    })
                  }
                />
                </div>
                <div>
                <p>{quest}</p>
                <textarea
                 textarea rows="4" cols="60"
                  value={general.numberOfStudents}
                  placeholder={questPlaceholder}
                  onChange={e =>
                    this.setState({
                      general: { ...general, numberOfStudents: e.target.value }
                    })
                  }
                />
                </div> 
                {_.times(this.state.general.difficultyLevel, this.generateStoryline)}
                <div>
                <p>{ending}</p>
                <textarea
                 textarea rows="4" cols="60"
                  value={general.numberOfStudents}
                  placeholder={endingPlaceholder}
                  onChange={e =>
                    this.setState({
                      general: { ...general, numberOfStudents: e.target.value }
                    })
                  }
                />
                </div>
              </div>
              </div>
          </form>
        </div>
      </div>
    );
  }
}
