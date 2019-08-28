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
    const storyline = "Storyline";
    const chooseLevelOfDifficulty = "Choose the level of difficulty:";
    const difficultyLevelOption1 = "Easy (2 games)";
    const difficultyLevelOption2 = "Medium (3 games)";
    const difficultyLevelOption3 = "Advanced (4 games)";
    const enterStorylinePart1 = "Enter a storyline in the following";
    const enterStorylinePart2 = "format";
    const quest = "Enter the main characthers quest:";
    const questPlaceholder = "The left for the dangerous adventure in order to...";
    const ending = "Enter ending:";
    const endingPlaceholder = "...and they lived happily ever after, the end!";

    return (
          <div className="home-form-field">
            <textarea rows="4" cols="50">
At w3schools.com you will learn how to make a website. We offer free tutorials in all web development technologies. 
</textarea>
          </div>
    );
  }
}
