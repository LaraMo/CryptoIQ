import React, { PureComponent } from "react";
import PageProgress from "react-page-progress";
import _ from "lodash";
import "../styles/homePage.scss";
import GeneralInfo from './GeneralInfo/GeneralInfoContainer';
import Title from './PartialComponents/Title';
import VocabularyWordsContainer from './Vocabulary/VocabularyWordsContainer';
import Storyline from "./Storyline/StorylineContainer";
export default class HomePage extends PureComponent {
  render() {
    return (
      <div className="home">
        <PageProgress color={"skyblue"} height={8} />
        <div className="homeContainer">
          <Title/>
          <form id="slide2" className="home-formContainer">
            <GeneralInfo/>          
            <VocabularyWordsContainer/>
            <Storyline/>
          </form>
        </div>
      </div>
    );
  }
}
