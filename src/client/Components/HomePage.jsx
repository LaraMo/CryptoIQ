import React, {PureComponent, use} from 'react';
import PageProgress from 'react-page-progress';
import _ from 'lodash';
import '../styles/homePage.scss';
import GeneralInfoContainer from './GeneralInfo/GeneralInfoContainer';
import Title from './PartialComponents/Title';
import Footer from './Footer';
import VocabularyWordsContainer from './Vocabulary/VocabularyWordsContainer';
import StorylineContainer from './Storyline/StorylineContainer';
import {difficultyEnum} from './Enums/difficulty';
import SubmitButton from './PartialComponents/SubmitButton';
import {submitGameGen} from '../helpers/apiHelper';
import {useState, useEffect} from 'react';
import {
  getLatestGameData,
  storeItem,
  generalInfoKey,
  vocalbularyKEy,
  storylineKey,
} from '../helpers/localStorageHelper';
import {validateForm} from '../helpers/utility';

const HomePage = () => {
  const [generalInfo, setGeneralInfo] = useState({
    numberOfStudents: '',
    duration: 15,
    locks: false,
    textbook: false,
    rewardTicket: false,
    ticketContent: 'Congrats! You won 1% bonus point for the next quiz',
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

  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    const gameData = getLatestGameData();
    if (gameData) {
      const {generalInfo, vocalbulary, storyline} = gameData;
      if (generalInfo) {
        setGeneralInfo(gameData.generalInfo);
      }

      if (vocalbulary) {
        setVocabulary(vocalbulary);
      }

      if (storyline) {
        setStoryline(storyline);
      }
    }
  }, []);

  useEffect(() => {
    try {
      let payload = Object.assign(
        {},
        {general: generalInfo},
        {vocalbulary: vocalbulary},
        {storyline: storyline},
      );
      validateForm(payload);
      setCanSubmit(true);
    } catch (error) {
      setCanSubmit(false);
    }
  });

  const createEscapeRoom = 'Give me an escape room!';
  const _onSubmit = () => {
    let payload = Object.assign(
      {},
      {general: generalInfo},
      {vocalbulary: vocalbulary},
      {storyline: storyline},
    );
    storeItem(generalInfoKey, generalInfo);
    storeItem(vocalbularyKEy, vocalbulary);
    storeItem(storylineKey, storyline);
    submitGameGen(payload);
  };

  return (
    <div className="home">
      <PageProgress color={'skyblue'} height={8} />
      <div className="homeContainer">
        <Title />
        <form id="slide2" className="home-formContainer" onSubmit={_onSubmit}>
          <GeneralInfoContainer
            updateForm={state => {
              setGeneralInfo(state);
            }}
          />
          <VocabularyWordsContainer
            updateForm={state => setVocabulary(state)}
            acceptPageNumber={generalInfo.textbook}
          />
          <StorylineContainer updateForm={state => setStoryline(state)} />
          <SubmitButton
            disabled={!canSubmit}
            text={createEscapeRoom}
            onClick={_onSubmit}
          ></SubmitButton>
        </form>
      </div>
    </div>
  );
};
export default HomePage;
