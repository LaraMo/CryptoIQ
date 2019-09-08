import React, {PureComponent} from 'react';
import _ from 'lodash';

export default class VocabularyWord extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      wordsEntered: '',
      defintionsEntered: '',
    };
  }

  render() {
    //Form
    const word = 'Word';
    const defintion = 'Defintion';
    const {wordsEntered, defintionsEntered, index} = this.state;
    return (
      <div className="home-form-field">
        <div className="home-form-field-word">
          <p>{word}</p>
          <input
            value={wordsEntered}
            onChange={e => {
              this.setState(
                {
                  wordsEntered: e.target.value,
                },
                () => this.props.onChange(this.props.index, this.state,),
              );
            }}
          />
        </div>

        <div className="home-form-field-definition">
          <p>{defintion}</p>
          <input
            id="defintion"
            value={defintionsEntered}
            onChange={e => {
              this.props.onChange(e, this.props.index);
              this.setState(
                {
                  defintionsEntered: e.target.value,
                },
                () => this.props.onChange(this.props.index, this.state),
              );
            }}
          ></input>
        </div>
      </div>
    );
  }
}
