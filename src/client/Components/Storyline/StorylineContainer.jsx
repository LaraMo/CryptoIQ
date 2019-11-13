import React, {PureComponent} from 'react';
import Textarea from './PartialComponents/Textarea';
import {difficultyEnum} from '../Enums/difficulty';
import {
  getData,
  EndPointMap,
  postData,
  deleteData,
} from '../../helpers/apiHelper';
import DropdownOption from '../../Public/DropdownOption';
import SubmitButton from '../PartialComponents/SubmitButton';
import {ErrorMessage} from '../PartialComponents/';

let defaultStoryline = ["The king's rings", "Secret Dawson"];

export default class Storyline extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      difficultyLevel: difficultyEnum.EASY.VALUE, // 2 games --> easy, 3 games --> medium, 4 games --> advanced
      title: '',
      opening: '',
      quest: '',
      actions: ['', '', '', ''],
      ending: '',
      searchError: '',
      generalError: '',
    };

    this._getRandomStory = this._getRandomStory.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._onClickSave = this._onClickSave.bind(this);
    this._onClickDelete = this._onClickDelete.bind(this);
  }

  setStateExt(state) {
    this.setState(state, () => {
      let storyline = this.getStorylineFromState();
      this.props.updateForm(storyline);
    });
  }

  setStoryline(storyline) {
    if(storyline) {
      const actionArray = [];
      Object.keys(storyline)
        .filter(keys => keys.indexOf('action') !== -1)
        .sort()
        .forEach(key => actionArray.push(storyline[key]));
      this.setStateExt({
        title: storyline.title,
        opening: storyline.opening,
        quest: storyline.quest,
        ending: storyline.ending,
        actions: actionArray,
      });
    }
  }

  getStorylineFromState(seperateAction = false) {
    if (seperateAction) {
      let result = {
        title: this.state.title,
        opening: this.state.opening,
        quest: this.state.quest,
        ending: this.state.ending,
      };
      this.state.actions.forEach(
        (action, i) => (result[`action${i + 1}`] = action),
      );
      return result;
    } else {
      return {
        title: this.state.title,
        opening: this.state.opening,
        quest: this.state.quest,
        ending: this.state.ending,
        actions: this.state.actions,
      };
    }
  }

  _onChangeAction(index, event) {
    let newState = [...this.state.actions];
    newState[index] = event.target.value;
    this.setStateExt({
      actions: newState,
    });
  }

  async _saveStory() {}

  async _onSearch(e) {
    console.log(this.state);
    this.setState({
      searchError: '',
    });
    let search = {};
    if (this.state.title) {
      search = await getData(
        `${EndPointMap.storyline}/${encodeURIComponent(this.state.title)}`,
      );
      if (search.status === 'SUCCESS' && search.result) {
        this.setStoryline(search.result);
      } else {
        this.setState({
          searchError: 'No storyline found with the given title',
        });
      }
    } else {
      this.setState({
        searchError: 'Please insert a title',
      });
    }
    setTimeout(() => {
      this.setState({
        searchError: '',
      });
    }, 3000);
  }

  async _getRandomStory() {
    let storyline = await getData(EndPointMap.storyline);
    storyline = storyline.result;
    if(storyline) {
      this.setStoryline(storyline);
    } else {
      this.setState({
        generalError: 'There are currently no saved Storyline! Please fill in the storyline and Save it!'
      })
    }
  }

  async _onClickSave() {
    this.setState({
      generalError: '',
    });
    let storyline = this.getStorylineFromState(true);
    console.log(storyline);
    if (storyline.title) {
      let result = await postData(EndPointMap.storyline, storyline);
      console.log(result);
    } else {
      this.setState({
        generalError: 'Please insert a title',
      });
    }

    setTimeout(() => {
      this.setState({
        generalError: '',
      });
    }, 3000);
  }

  async _onClickDelete() {
    this.setState({
      generalError: '',
    });
    let storyline = this.getStorylineFromState(false);

    if (storyline.title) {
      if(defaultStoryline.indexOf(storyline.title) === -1) {
        let result = await deleteData(
          `${EndPointMap.storyline}/${encodeURIComponent(this.state.title)}`,
          storyline,
        );
        if(result.status) {
          this.setStoryline({
            title: '',
            opening: '',
            quest: '',
            ending: '',
            actions: ['', '', '', ''],
          });
        }
        console.log(result);
      } else {
        this.setState({
          generalError: "Can't delete a default storyline!",
        });
      }
      
    } else {
      this.setState({
        generalError: 'Please insert a title',
      });
    }
    setTimeout(() => {
      this.setState({
        generalError: '',
      });
    }, 3000);
  }

  render() {
    //Headers
    const storyline = 'Storyline';
    const chooseLevelOfDifficulty = 'Choose the level of difficulty:';
    const enterStorylinePart1 = 'Enter a storyline in the following';
    const enterStorylinePart2 = 'format';
    const title = 'Enter title:';
    const titlePlaceholder = "The king's ring";
    const opening = 'Enter opening:';
    const openingPlaceholder = 'Once upon a time...';
    const quest = 'Enter the main characthers quest:';
    const questPlaceholder =
      'The left for the dangerous adventure in order to...';
    const ending = 'Enter ending:';
    const endingPlaceholder = '...and they lived happily ever after, the end!';
    let generateTextarea = [];

    let searchErrorMessage = null;
    if (this.state.searchError) {
      searchErrorMessage = <ErrorMessage error={this.state.searchError} />;
    }

    let generalErrorMessage = null;
    if (this.state.generalError) {
      generalErrorMessage = <ErrorMessage error={this.state.generalError} />;
    }

    for (let i = 0; i < this.state.difficultyLevel; i++) {
      generateTextarea.push(
        <Textarea
          index={i}
          key={i}
          value={this.state.actions[i]}
          onChange={event => this._onChangeAction(i, event)}
        />,
      );
    }

    const saveStory = 'Save story 💾';
    const editStory = 'Edit story ✍🏻';
    const deleteStroy = 'Delete story 🗑️';
    const getRandomStory = 'Get me a storyline 🤞';
    return (
      <div id="slide2" className="home-formContainer">
        <h3>{storyline} </h3>
        <div className="home-form">
          <p className="home-form-title">
            {enterStorylinePart1} <a>{enterStorylinePart2}</a>
          </p>
          {generalErrorMessage}
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
          <SubmitButton
            text={getRandomStory}
            onClick={this._getRandomStory}
          ></SubmitButton>
          {searchErrorMessage}
          <div className="home-form-field">
            <p>{title}</p>
            <input
              placeholder={titlePlaceholder}
              value={this.state.title}
              onChange={e => this.setStateExt({title: e.target.value})}
            />
          </div>

          <SubmitButton text={'🔍'} onClick={this._onSearch}></SubmitButton>

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
              value={this.state.ending}
              onChange={e => this.setStateExt({ending: e.target.value})}
            />
          </div>

          <div className="home-form-field-submission">
            <SubmitButton
              text={saveStory}
              onClick={this._onClickSave}
            ></SubmitButton>
            {/* 
            <SubmitButton
            text={editStory}
            onClick={this.props.edit}></SubmitButton> */}

            <SubmitButton
              text={deleteStroy}
              onClick={this._onClickDelete}
            ></SubmitButton>
          </div>
        </div>
      </div>
    );
  }
}
