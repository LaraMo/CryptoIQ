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
    console.log(generalInfo);
    this.setStateExt({
      general: {
        numberOfStudents: generalInfo.numberOfStudents,
        locks: generalInfo.locks,
        textbook: generalInfo.textbook,
        rewardTicket: generalInfo.rewardTicket,
        ticketContent: generalInfo.ticketContent,
      },
    }, () => {
      console.log(this.state);
    });
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
    const generalInfo = 'General Info';
    //Form
    const numberOfStudents = 'Number of students:';
    const numberOfStudentsPlaceholder = 'Numbers only';
    const duration = 'Duration of activity:';
    const locks = 'Include physical locks:';
    const textbook = 'Use of textbook/slide:';
    const {general} = this.state;

    return (
      <div id="slide2" className="home-formContainer">
        <h3>{generalInfo}</h3>

        <div className="home-form">
          <ErrorMessage error={this.state.error} />
          <div className="home-form-field">
            <p>{numberOfStudents}</p>
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
