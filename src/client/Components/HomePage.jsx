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
import {validateOnSubmission, validateArrayOnSubmission, validateStoryline, validateBonusTicket, validatePageNumbers, areUniqueWord} from "../helpers/clientValidation";
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
    maxNumberOfWords: 8,
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

      if (!_.isEmpty(generalInfo)) {
        setGeneralInfo(gameData.generalInfo);
      }

      if (!_.isEmpty(vocalbulary)) {
        setVocabulary(vocalbulary);
      }

      if (!_.isEmpty(storyline)) {
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
    //before making a post request validate data , get all input elements and check if they are not empty  
    //GENERAL FORM: check if number of students is empty
    const numberOfStudents =  document.getElementById("numberOfStudents");
    //GENERAL FORM: check if bonus ticket field is not empty, (the method will check if the checkbox is selected before making this validation)
    const bonusTicketContainer = document.getElementById("bonusTicketContainer");
    //VOCBULARY FORM: check if any vocabulary words are empty
    const voc =  document.getElementsByClassName("home-form-vocContainer")[0];
    //VOCABULURY FORM: check if there is at least 3 unique combinations of page numbers for the lock game to work.
    const pageNumbers = document.getElementsByClassName("pageNumber");
    const isValidPageNumber = validatePageNumbers(pageNumbers, "locks", "There should be at least 3 unique combinations of page numbers for the lock game to work");
    //VOCUBULARY FORM: check if there are no duplicates in the array of words
    const words = document.getElementsByClassName("home-form-field-word");
    const isValidArrayOfWords = areUniqueWord(words);
    //STORY FORM: check if any fields in the story are empty
    const storylineContainer =  document.getElementsByClassName("storyline")[0];
    //STORY FORM: check if level of diff. is 4. If yes, make sure that the locks checkbox is selected 
    if(
    validateArrayOnSubmission(voc, "All vocabulary fields must be filled") 
    && 
    validateOnSubmission(numberOfStudents, "Number of students is empty")
    &&
    validateStoryline(storylineContainer, "All storyline inputs in this form must be filled")
    &&
    validateBonusTicket(bonusTicketContainer, "If bonus ticket checkbox is selected, the type of bonus she be provided")
    && isValidPageNumber
    ){
      submitGameGen(payload, () => {
        storeItem(generalInfoKey, generalInfo);
        storeItem(vocalbularyKEy, vocalbulary);
        storeItem(storylineKey, storyline);
      });
    }
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
          <Footer/>
        </form>
      </div>
    </div>
  );
};
export default HomePage;
