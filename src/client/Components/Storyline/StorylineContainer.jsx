import React, {PureComponent} from 'react';
import {difficultyEnum} from '../Enums/difficulty';
import {
  getData,
  EndPointMap,
  postData,
  deleteData,
} from '../../helpers/apiHelper';
import DropdownOption from '../../Public/DropdownOption';
import SubmitButton from '../PartialComponents/SubmitButton';
import {ErrorMessage, TextArea} from '../PartialComponents/';
import CONSTANT from '../../Constant';
import SearchBox from './PartialComponent/SearchBox';

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
      searchResult: []
    };

    this._getRandomStory = this._getRandomStory.bind(this);
    this._onSearch = this._onSearch.bind(this);
    this._onClickSave = this._onClickSave.bind(this);
    this._onClickDelete = this._onClickDelete.bind(this);
    this._onSearchChange = _.debounce(this._onSearchChange.bind(this),  200)
    this._onResultClick = this._onResultClick.bind(this); 
    this.setTitle = this.setTitle.bind(this)
  }

  setStateExt(state, cb) {
    this.setState(state, () => {
      let storyline = this.getStorylineFromState();
      this.props.updateForm(storyline);
      if(cb && cb instanceof Function) {
        cb()
      }
    });
  }

  setStoryline(storyline) {
    if (storyline) {
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
    let storyline = (await getData(EndPointMap.storyline)) || {};
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
      let result = await postData(EndPointMap.storyline, storyline);
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
      if (defaultStoryline.indexOf(storyline.title) === -1) {
        let result = await deleteData(
          `${EndPointMap.storyline}/${encodeURIComponent(this.state.title)}`,
          storyline,
        );
        if (result.status) {
          this.setStoryline({
            title: '',
            opening: '',
            quest: '',
            ending: '',
            actions: ['', '', '', ''],
          });
        }
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

  async _onSearchChange(e) {
    this.setState({
      title: ''
    })
    const searchString = e.target.value;
    const result = await getData(`${CONSTANT.STORYLINE_ENDPOINT}/search`, {
      "searchString": searchString
    })
    if(result.status === 'SUCCESS') {
      this.setState({
        searchResult: result.result
      })
    }
  }

  async _onResultClick(e) {
    let result = e.target.innerText;
    this.setStateExt({
      title: result,
      searchResult: []
    }, () => {
      this._onSearch()
    })
  }

  async setTitle(title) {
    this.setStateExt({
      title
    })
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
          storyline={true}
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

          <div className="home-form-field">
            <SearchBox
              label={title}
              name="searchbox"
              title={this.state.title}
              _onResultClick={this._onResultClick}
              onChange={e=> {
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
          <div className="home-form-field">
            {searchErrorMessage}
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
