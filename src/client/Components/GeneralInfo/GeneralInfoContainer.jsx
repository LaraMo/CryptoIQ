import React, {PureComponent} from 'react';
import DropdownOption from '../../Public/DropdownOption';
import {ErrorMessage, Checkbox} from '../PartialComponents/';
import {durationEnum} from '../Enums/duration';

export default class GeneralInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      general: {
        numberOfStudents: '',
        duration: 15,
        locks: true,
        textbook: true,
      },
      error: '',
    };

    this.validateInputField = this.validateInputField.bind(this);
    this.nonNumericError = React.createRef();
    this._onCheckBoxChanged = this._onCheckBoxChanged.bind(this);
  }

  setStateExt(state) {
    this.setState(state, () => {
      this.props.updateForm(this.state.general);
    });
  }

  validateInputField(e) {
    //check if empty --> ask?
    const {general} = this.state;
    //set to state only if valid
    this.setStateExt({
      general: {...general, numberOfStudents: e.target.value},
    });
    const errorContainer = this.nonNumericError.current;

    if (e.target.value.match(/([1-9]|[1-4][0-9]|50)/)) {
      this.setStateExt({error: ''});
      errorContainer.classList.add('hideError');
    } else {
      this.setStateExt({error: 'Please enter a number from 0-50'});
      errorContainer.classList.remove('hideError');
    }
  }

  _onCheckBoxChanged(value) {}

  render() {
    //Headers
    const generalInfo = 'General Info';
    //Form
    const numberOfStudents = 'Number of students:';
    const numberOfStudentsPlaceholder = 'Numbers only';
    const duration = 'Duration of activity:';
    const locks = 'Include locks:';
    const textbook = 'Use of textbook:';
    const {general} = this.state;

    return (
      <div id="slide2" className="home-formContainer">
        <h3>{generalInfo}</h3>

        <div className="home-form">
          <ErrorMessage error={this.state.error} />
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
          <div className="home-form-field">
            <p>{duration}</p>
            <select
              className="home-form-selectMenu"
              onChange={e =>
                this.setStateExt({
                  general: {...general, duration: e.target.value},
                })
              }
            >
              {_.map(durationEnum, option => (
                <DropdownOption
                  key={option.VALUE}
                  value={option.VALUE}
                  label={option.LABEL}
                />
              ))}
            </select>
          </div>

          <Checkbox
            className="home-form-field"
            label={locks}
            default={this.state.general.locks}
            handleCheckboxChange={value =>
              this.setStateExt({
                general: {...this.state.general, locks: value},
              })
            }
          />

          <Checkbox
            className="home-form-field"
            label={textbook}
            default={this.state.general.textbook}
            handleCheckboxChange={value =>
              this.setStateExt({
                general: {...this.state.general, textbook: value},
              })
            }
          />
        </div>
      </div>
    );
  }
}
