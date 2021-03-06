import React, {PureComponent} from 'react';
import {difficultyEnum} from '../Enums/difficulty';
import {getData, postData} from '../../helpers/apiHelper';
import DropdownOption from '../../Public/DropdownOption';
import SubmitButton from '../PartialComponents/SubmitButton';
import {ErrorMessage, TextArea} from '../PartialComponents/';
import CONSTANT from '../../Constant';
import SearchBox from './PartialComponent/SearchBox';
import {getLatestGameData} from '../../helpers/localStorageHelper';

let defaultStoryline = ["The king's rings", 'Secret Dawson'];

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
      searchResult: [],
    };

    this._getRandomStory = this._getRandomStory.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._onClickSave = this._onClickSave.bind(this);
    this._onSearchChange = _.debounce(this._onSearchChange.bind(this), 200);
    this._onResultClick = this._onResultClick.bind(this);
    this.setTitle = this.setTitle.bind(this);
    this._handleDropdownChange = this._handleDropdownChange.bind(this);
  }

  componentDidMount() {
    this.sync();
  }

  sync() {
    const {storyline} = getLatestGameData();
    if(!_.isEmpty(storyline)) {
      this.setStateExt({
        difficultyLevel: storyline.difficultyLevel,
      });
      this.setStoryline(storyline);
    }
  }
   

  setStateExt(state, cb) {
    this.setState(state, () => {
      let storyline = this.getStorylineFromState();
      this.props.updateForm(storyline);
      if (cb && cb instanceof Function) {
        cb();
      }
    });
  }

  setStoryline(storyline) {
    if (storyline) {
      let actionArray = [];
      Object.keys(storyline)
        .filter(keys => keys.indexOf('action') !== -1)
        .sort()
        .forEach(key => actionArray.push(storyline[key]));
      if(actionArray && _.isArray(actionArray) && _.isArray(actionArray[0])) {
        actionArray = actionArray[0];
      }
      this.setStateExt({
        title: storyline.title,
        opening: storyline.opening,
        quest: storyline.quest,
        ending: storyline.ending,
        actions: actionArray,
      });
    }
  }

  _handleDropdownChange(e) {
   this.setStateExt({difficultyLevel: e.target.value})
   //if current level of difficulty is 4, check the locks checkbox
   if(e.target.value === 4) {
     document.getElementById("locks").checked = true;
   }
}

  getStorylineFromState(seperateAction = false) {
    if (seperateAction) {
      let result = {
        title: this.state.title,
        opening: this.state.opening,
        quest: this.state.quest,
        ending: this.state.ending,
        difficultyLevel: this.state.difficultyLevel,
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
        difficultyLevel: this.state.difficultyLevel,
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

  async _onSearch() {
    this.setState({
      searchError: '',
    });
    let search = {};
    if (this.state.title) {
      search = await getData(
        `${CONSTANT.STORYLINE_ENDPOINT}/${encodeURIComponent(
          this.state.title,
        )}`,
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
    let storyline = (await getData(CONSTANT.STORYLINE_ENDPOINT)) || {};
    storyline = storyline.result;
    if (storyline) {
      this.setStoryline(storyline);
    } else {
      this.setState({
        generalError:
          'There are currently no saved Storyline! Please fill in the storyline and Save it!',
      });
    }
  }

  async _onClickSave() {
    this.setState({
      generalError: '',
    });
    let storyline = this.getStorylineFromState(true);
    if (storyline.title) {
      let result = await postData(CONSTANT.STORYLINE_ENDPOINT, storyline);
      if (result.status === 'SUCCESS') {
        alert('Storyline Saved!');
      } else if (result.status === 'FAILURE') {
        alert(result.result);
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

  async _onSearchChange(e) {
    this.setState({
      title: '',
    });
    const searchString = e.target.value;
    const result = await getData(`${CONSTANT.STORYLINE_ENDPOINT}/search`, {
      searchString: searchString,
    });
    if (result.status === 'SUCCESS') {
      this.setState({
        title: searchString,
        searchResult: result.result,
      });
    }
  }

  async _onResultClick(e) {
    let result = e.target.innerText;
    this.setStateExt(
      {
        title: result,
        searchResult: [],
      },
      () => {
        this._onSearch();
      },
    );
  }

  async setTitle(title) {
    this.setStateExt({
      title,
    });
  }

  render() {
    //Headers
    const storyline = 'choose a storyline';
    const chooseLevelOfDifficulty = 'Choose the level of difficulty:';
    const enterStorylinePart1 = 'Enter a storyline in the following';
    const enterStorylinePart2 = 'format';
    const questionToolTipFormat1 = "You may choose an existing story by clicking the search icon, or enter your own in the following format:";
    const questionToolTipFormat2 = "Intro - short opening to your story";
    const questionToolTipFormat3 = "Quest- The goal of your main character";
    const questionToolTipFormat4 = "Actions - What the character does to accomplish their goal";
    const questionToolTipFormat5 = "Ending - How the story ended";

    const title = 'Enter title:';
    const titlePlaceholder = "The king's ring";
    const opening = 'Enter opening:';
    const openingPlaceholder = 'Once upon a time...';
    const quest = 'Enter the main characters quest:';
    const questPlaceholder =
      'The king decided to go on the dangerous adventure in order to...';
    const ending = 'Enter ending:';
    const endingPlaceholder = '...and they lived happily ever after, the end!';
    let generateTextArea = [];

    let searchErrorMessage = null;
    if (this.state.searchError) {
      searchErrorMessage = <ErrorMessage error={this.state.searchError} />;
    }

    let generalErrorMessage = null;
    if (this.state.generalError) {
      generalErrorMessage = <ErrorMessage error={this.state.generalError} />;
    }

    for (let i = 0; i < this.state.difficultyLevel; i++) {
      generateTextArea.push(
        <TextArea
          rows = {15}
          storyline={true}
          index={i}
          key={i}
          value={this.state.actions[i]}
          onChange={event => this._onChangeAction(i, event)}
        />,
      );
    }

    const saveStory = 'Save story to community database 💾 ';
    const getRandomStory = 'Get me a storyline 🤞';
    return (
      <div className="home-formContainer storyline">
        <h3><span>{storyline}</span></h3>
        <div className="home-form">
          <p className="home-form-title">
            {enterStorylinePart1} {enterStorylinePart2}  
            <div className="questionContainer">
              <span className="question">?</span>
              <div className="question-toolTip">
               <span className="">{questionToolTipFormat1}<br/>{questionToolTipFormat2}<br/>{questionToolTipFormat3}<br/>{questionToolTipFormat4}<br/>{questionToolTipFormat5}</span>
              </div>
            </div>  
          </p>
          {generalErrorMessage}
          <div className="home-form-field">
            <p>{chooseLevelOfDifficulty}</p>
            <select
              className="home-form-selectMenu"
              onChange={e =>
                this._handleDropdownChange(e)
              }
            >
              {_.map(difficultyEnum, option => (
                <DropdownOption
                  key={option.VALUE}
                  value={option.VALUE}
                  label={option.LABEL}
                  {...{
                    selected:
                      option.VALUE === this.state.difficultyLevel
                        ? true
                        : null,
                  }}
                />
              ))}
            </select>
          </div>

          <div className="home-form-field">
            <SearchBox
              label={title}
              name="searchbox"
              title={this.state.title}
              placeholder={titlePlaceholder}
              _onResultClick={this._onResultClick}
              onChange={e => {
                e.persist();
                this._onSearchChange(e);
              }}
              setTitle={this.setTitle}
              result={this.state.searchResult}
            />
            <SubmitButton text={'🔍'} onClick={this._onSearch}></SubmitButton>
            <SubmitButton
              text={getRandomStory}
              onClick={this._getRandomStory}
            ></SubmitButton>
          </div>
          <div className="home-form-field">{searchErrorMessage}</div>

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
          {generateTextArea}

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
            <p><span>Note: </span><em>Saving your story into the community database makes it accessible by any teacher to view/use</em></p>
          </div>
        </div>
      </div>
    );
  }
}