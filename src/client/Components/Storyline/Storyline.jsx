import React, { PureComponent } from "react";
import Textarea from './PartialComponents/Textarea';

export default class Storyline extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      difficultyLevel: 2, // 2 games --> easy, 3 games --> medium, 4 games --> advanced
      title: "",
      opening: "",
      quest: "",
      action1: "",
      action2: "",
      action3: "",
      action4: "",
      ending: "",
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
    const title = "Enter title:";
    const titlePlaceholder = "The kings ring";
    const opening = "Enter opening:";
    const openingPlaceholder = "Enter opening:";
    const quest = "Enter the main characthers quest:";
    const questPlaceholder = "The left for the dangerous adventure in order to...";
    const ending = "Enter ending:";
    const endingPlaceholder = "...and they lived happily ever after, the end!";

    const generateTextarea= [];
    for(let i = 0; i < this.state.difficultyLevel; i++) {
      generateTextarea.push(<Textarea index={i} key={i}/>)
    }
    return (

      <div id="slide2" className="home-formContainer">
      <h3>{storyline} </h3>
      <div className="home-form">
          <div className="home-form-field">
          <p>{chooseLevelOfDifficulty}</p>
            <select
              className="home-form-selectMenu"
              onChange={e =>
                this.setState({difficultyLevel: e.target.value })
              }
            >
              <option value="2" label={difficultyLevelOption1} />
              <option value="3" label={difficultyLevelOption2} />
              <option value="4" label={difficultyLevelOption3} />
            </select>
          </div>

          <div className="home-form-field-storyline">
          <p>{enterStorylinePart1} <a href="j">{enterStorylinePart2}</a></p>
          
          <div className="home-form-field">
            <p>{title}</p>
            <input
            placeholder ={openingPlaceholder}
              onChange={e =>
                this.setState({opening : e.target.checked })}
            />
          </div>

          <div className="home-form-field-storyline">
            <p>{quest}</p>
            <textarea rows="4" cols="50" placeholder={questPlaceholder}/>
          </div>
            {generateTextarea}
          </div>
        </div>
    </div>
    );
  }
}
