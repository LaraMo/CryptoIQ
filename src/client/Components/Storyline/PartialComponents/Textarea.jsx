import React, { PureComponent } from "react";

export default class Storyline extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      difficultyLevel: 2, // 2 games --> easy, 3 games --> medium, 4 games --> advanced
      storyline: {
        title: "",
        p1: "",
        p2: "",
        p3: "",
        p4: ""
      }
    };
  }

  render() {
    //Headers
    const action = "Enter action #";
    const actionPlaceholder = "Then he...";

    return (
      <div className="home-form-field-storyline">
        <p>
          {action}
          {this.props.index + 1}:
        </p>
        <textarea rows="5" cols="50" placeholder={actionPlaceholder} />
      </div>
    );
  }
}
