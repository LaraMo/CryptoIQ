import React, {PureComponent} from 'react';
import PageProgress from 'react-page-progress';
import _ from 'lodash';
import '../styles/homePage.scss';
import GeneralInfoContainer from './GeneralInfo/GeneralInfoContainer';
import Title from './PartialComponents/Title';
import VocabularyWordsContainer from './Vocabulary/VocabularyWordsContainer';
import StorylineContainer from './Storyline/StorylineContainer';
import {difficultyEnum} from './Enums/difficulty';
import SubmitButton from './PartialComponents/SubmitButton';
import {submitGameGen} from '../helpers/apiHelper';
import {useState} from 'react';

const HomePage = () => {
  const [generalInfo, setGeneralInfo] = useState({
    numberOfStudents: '',
    duration: 15,
    locks: true,
    textbook: true,
  });

  const [vocalbulary, setVocabulary] = useState({
    maxNumberOfWords: 1,
  });

  const [storyline, setStoryline] = useState({
    difficultyLevel: difficultyEnum.EASY.VALUE, // 2 games --> easy, 3 games --> medium, 4 games --> advanced
    title: '',
    opening: '',
    quest: '',
    action1: '',
    action2: '',
    action3: '',
    action4: '',
    ending: '',
  });

  const createEscapeRoom = 'Give me an escape room!';
  const _onSubmit = () => {
    let payload = Object.assign(
      {},
      {general: generalInfo},
      {vocalbulary: vocalbulary},
      {storyline: storyline},
    );
    submitGameGen(payload);
  };

  const _onSubmitSaveStory = () => {
    let payload = Object.assign(
      {},
      {general: generalInfo},
      {vocalbulary: vocalbulary},
      {storyline: storyline},
    );
    console.log(payload);
    submitGameGen(payload);
  };

  const _onSubmitDeleteStory = () => {
    let payload = Object.assign(
      {},
      {general: generalInfo},
      {vocalbulary: vocalbulary},
      {storyline: storyline},
    );
    console.log(payload);
    submitGameGen(payload);
  };

  const _onSubmitEditStory = () => {
    let payload = Object.assign(
      {},
      {general: generalInfo},
      {vocalbulary: vocalbulary},
      {storyline: storyline},
    );
    console.log(payload);
    submitGameGen(payload);
  };

  return (
    <div className="home">
      <PageProgress color={'skyblue'} height={8} />
      <div className="homeContainer">
        <Title />
        <form id="slide2" className="home-formContainer" onSubmit={_onSubmit}>
          <GeneralInfoContainer updateForm={state => {setGeneralInfo(state)}} />
          <VocabularyWordsContainer
            updateForm={state => setVocabulary(state)}
            acceptPageNumber={generalInfo.textbook}
          />
          <StorylineContainer
            delete={_onSubmitDeleteStory}
            edit={_onSubmitEditStory}
            save={_onSubmitSaveStory}
            updateForm={state => setStoryline(state)}
          />
          <SubmitButton
            text={createEscapeRoom}
            onClick={_onSubmit}
          ></SubmitButton>
        </form>
      </div>
    </div>
  );
};
export default HomePage;
