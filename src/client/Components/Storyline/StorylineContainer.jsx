import React, {PureComponent} from 'react';
import Textarea from './PartialComponents/Textarea';
import {difficultyEnum} from '../Enums/difficulty';
import DropdownOption from '../../Public/DropdownOption';
import SubmitButton from '../PartialComponents/SubmitButton';

export default class Storyline extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      difficultyLevel: difficultyEnum.EASY.VALUE, // 2 games --> easy, 3 games --> medium, 4 games --> advanced
      title: '',
      opening: '',
      quest: '',
      actions: [],
      ending: '',
    };
  }

  setStateExt(state) {
    this.setState(state, () => {
      this.props.updateForm(this.state);
    });
  }

  _onChangeAction(index, event) {
    let newState = [...this.state.actions];
    newState[index] = event.target.value;
    this.setStateExt({
      actions: newState
    })
  }

  render() {
    //Headers
    const storyline = 'Storyline';
    const chooseLevelOfDifficulty = 'Choose the level of difficulty:';
    const enterStorylinePart1 = 'Enter a storyline in the following';
    const enterStorylinePart2 = 'format';
    const title = 'Enter title:';
    const titlePlaceholder = 'The kings ring';
    const opening = 'Enter opening:';
    const openingPlaceholder = 'Once upon a time...';
    const quest = 'Enter the main characthers quest:';
    const questPlaceholder =
      'The left for the dangerous adventure in order to...';
    const ending = 'Enter ending:';
    const endingPlaceholder = '...and they lived happily ever after, the end!';
    const generateTextarea = [];

    for (let i = 0; i < this.state.difficultyLevel; i++) {
      generateTextarea.push(<Textarea index={i} key={i} value={this.state.actions[i]} onChange={(event) => this._onChangeAction(i, event)}/>);
    }

    const saveStory = "Save story 💾";
    const editStory = "Edit story ✍🏻";
    const deleteStroy = "Delete story 🗑️";

    return (
      <div id="slide2" className="home-formContainer">
        <h3>{storyline} </h3>
        <div className="home-form">
          <p className="home-form-title">
            {enterStorylinePart1} <a href="todo">{enterStorylinePart2}</a>
          </p>
          <div className="home-form-field">
            <p>{chooseLevelOfDifficulty}</p>
            <select
              className="home-form-selectMenu"
              onChange={e =>
                this.setStateExt({difficultyLevel: e.target.value})
              }
            >
              {_.map(difficultyEnum, option => (
                <DropdownOption
                  key={option.VALUE}
                  value={option.VALUE}
                  label={option.LABEL}
                />
              ))}
            </select>
          </div>

          <div className="home-form-field">
            <p>{title}</p>
            <input
              placeholder={titlePlaceholder}
              value={this.state.title}
              onChange={e => this.setStateExt({title: e.target.value})}
            />
          </div>
          <div className="home-form-field-storyline">
            <p>{opening}</p>
            <textarea
              rows="4"
              cols="50"
              placeholder={openingPlaceholder}
              value={this.state.opening}
              onChange={e => this.setStateExt({opening: e.target.value})}
            />
          </div>

          <div className="home-form-field-storyline">
            <p>{quest}</p>
            <textarea
              rows="4"
              cols="50"
              placeholder={questPlaceholder}
              value={this.state.quest}
              onChange={e => this.setStateExt({quest: e.target.value})}
            />
          </div>
          {generateTextarea}

          <div className="home-form-field-storyline">
            <p>{ending}</p>
            <textarea
              rows="4"
              cols="50"
              placeholder={endingPlaceholder}
              onChange={e => this.setStateExt({ending: e.target.value})}
            />
          </div>

          <div className="home-form-field-submission">
          <SubmitButton
            text={saveStory}
            onClick={this.props.save}></SubmitButton>

            <SubmitButton
            text={editStory}
            onClick={this.props.edit}></SubmitButton>


            <SubmitButton
            text={deleteStroy}
            onClick={this.props.delete}></SubmitButton>
          </div>
        </div>
      </div>
    );
  }
}
