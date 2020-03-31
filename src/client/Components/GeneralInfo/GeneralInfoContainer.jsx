import React, {PureComponent} from 'react';
import {ErrorMessage, Checkbox} from '../PartialComponents/';
import {TicketDataInput} from './PartialComponents/';
import {validator}  from '../../helpers/clientValidation';
import {getLatestGameData} from '../../helpers/localStorageHelper';

export default class GeneralInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      general: {
        numberOfStudents: '',
        locks: false,
        textbook: false,
        rewardTicket: false,
        ticketContent: 'Congrats! You won 1% bonus point for the next quiz',
      },
      error: '',
    };

    this.validateInputField = this.validateInputField.bind(this);
    // this.nonNumericError = React.createRef();
    this._onCheckBoxChanged = this._onCheckBoxChanged.bind(this);
  }

  sync() {
    const {generalInfo} = getLatestGameData();
    if(!_.isEmpty(generalInfo)) {
      this.setStateExt({
        general: {
          numberOfStudents: generalInfo.numberOfStudents,
          locks: generalInfo.locks,
          textbook: generalInfo.textbook,
          rewardTicket: generalInfo.rewardTicket,
          ticketContent: generalInfo.ticketContent,
        },
      }, () => {
      });
    }
   
  }

  componentDidMount() {
    this.sync();
  }

  setStateExt(state, cb) {
    this.setState(state, () => {
      this.props.updateForm(this.state.general);
      if(cb && _.isFunction(cb)) {
        cb()
      }
    });
  }

  validateInputField(e) {
    const {general} = this.state;
    //(valid= numeric under 50)
    this.setStateExt({
      general: {...general, numberOfStudents: e.target.value},
    });
    if (validator(e.target.value, /^(?:[1-9]|[1-4][0-9]|50)$/, 3)) { 
      this.setStateExt({error: ''});
    } else {
      this.setStateExt({error: 'Please enter a number from 1-50'});
    }
  }

  _onCheckBoxChanged(value) {}

  render() {
    //Headers
    const generalInfo = 'Enter general information about your class';
    //Form
    const numberOfStudents = 'Number of students:';
    const numberOfStudentsPlaceholder = 'Numbers only';
    const locks = 'Include physical locks: ';
    const textbook = 'Use of textbook/slides:  ';
    const {general} = this.state;
    const questionToolTipNumberStudents = "Enter the amount of students in your class ";
    const questionToolTipUseTextBook = "Check this box if you are using a textbook or lecture slides and want to incorporate the numbers into your game";
    const questionToolTipUseLock = "Check this box if you will be using custom bike locks and want a combination generated"

    return (
      <div id="slide2" className="home-formContainer">
        <h3><span>{generalInfo}</span></h3>
        <div className="home-form">
          <ErrorMessage error={this.state.error} />
          <div className="home-form-field">
            <p id="flex">{numberOfStudents}
            <div className="questionContainer">
              <span className="question">?</span>
              <div className="question-toolTip">
               <div className="question-arrowLeft"></div>
               <span className="">{questionToolTipNumberStudents}</span>
              </div>
            </div>
            </p>
            <input
              id="numberOfStudents"
              className="home-form-inputText"
              name="numberOfStudents"
              value={general.numberOfStudents}
              placeholder={numberOfStudentsPlaceholder}
              onChange={this.validateInputField}
            />
          </div>

          <Checkbox
            className="home-form-field"
            label={locks}
            question
            questionToolTip={questionToolTipUseLock}
            default={this.state.general.locks}
            onChange={value =>
              this.setStateExt({
                general: {...this.state.general, locks: value},
              })
            }
          />

          <Checkbox
            className="home-form-field"
            label={textbook}
            question
            questionToolTip={questionToolTipUseTextBook}
            id="locks"
            default={this.state.general.textbook}
            onChange={value =>
              this.setStateExt({
                general: {...this.state.general, textbook: value},
              })
            }
          />

          <TicketDataInput
            onChecked={value => {
              this.setStateExt({
                general: {...this.state.general, rewardTicket: value},
              });
            }}
            onContentChange={e => {
              this.setStateExt({
                general: {...this.state.general, ticketContent: e.target.value},
              });
            }}
          />
        </div>
      </div>
    );
  }
}
