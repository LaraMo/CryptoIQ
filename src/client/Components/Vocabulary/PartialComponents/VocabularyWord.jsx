import React, { PureComponent } from "react";
import _ from "lodash";
export default class VocabularyWord extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      index: this.props.index,
      wordsEntered: {},
      defintionsEntered: {}
    };
  }

  render() {
    //Form
    const word = "Word";
    const defintion = "Defintion";
    const { wordsEntered, defintionsEntered, index } = this.state;
    return (
        <div className="home-form-field">
        <div className="home-form-field-word">
          <p>{word}</p>
          <input
            value={wordsEntered[index]}
            onChange={e =>
              this.setState({
                wordsEntered: { ...wordsEntered, index: e.target.value }
              })
            }
          />
        </div>

        <div className="home-form-field-definition">
          <p>{defintion}</p>
          <input
            id="defintion"
            value={defintionsEntered[index]}
            onChange={e =>
              this.setState({
                defintionsEntered: { defintionsEntered, index: e.target.value }
              })
            }
          ></input>
        </div>
      </div>
    );
  }
}
