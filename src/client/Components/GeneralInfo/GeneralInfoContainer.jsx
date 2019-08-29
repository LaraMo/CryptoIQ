import React, { PureComponent } from "react";

export default class GeneralInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      general: {
        numberOfStudents: "",
        duration: 15,
        locks: false,
        textbook: false
      },
      error: ""
    };

    this.validateInputField = this.validateInputField.bind(this);
    this.nonNumericError = React.createRef();
  }

  validateInputField(e) {
    //check if empty --> ask?
    const { general } = this.state;
    //set to state only if valid
    this.setState({
      general: { ...general, numberOfStudents: e.target.value }
     })
     const errorContainer = this.nonNumericError.current;

    if(e.target.value.match(/([1-9]|[1-4][0-9]|50)/)){
       this.setState({error: ""})
       errorContainer.classList.add("hideError");
      }
  else {
    this.setState({error: "Please enter a number from 0-50"})
    errorContainer.classList.remove("hideError");
  }
  }
  render() {
    //Headers
    const generalInfo = "General Info";
    //Form
    const numberOfStudents = "Number of students:";
    const numberOfStudentsPlaceholder = "Numbers only";
    const duration = "Duration of activity:";
    const durationOption1 = "15 mintues";
    const durationOption2 = "20 mintues";
    const durationOption3 = "30 mintues";
    const locks = "Include locks:";
    const textbook = "Allow use of textbook:";
    const { general } = this.state;

    return (
      <div id="slide2" className="home-formContainer">
        <h3>{generalInfo}</h3>

        <div className="home-form">
          <div className="home-form-field">
            <p>{numberOfStudents}</p>
            <input
              className="home-form-inputText"
              name="numberOfStudents"
              value={general.numberOfStudents}
              placeholder={numberOfStudentsPlaceholder}
              onChange={this.validateInputField}
            />
          </div>
          <span className="home-form-field-error hideError" ref={this.nonNumericError}>{this.state.error}</span>
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
      </div>
    );
  }
}
