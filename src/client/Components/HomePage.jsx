import React, { PureComponent } from "react";
import PageProgress from "react-page-progress";
import _ from "lodash";
import "../styles/homePage.scss";
import GeneralInfoContainer from "./GeneralInfo/GeneralInfoContainer";
import Title from "./PartialComponents/Title";
import VocabularyWordsContainer from "./Vocabulary/VocabularyWordsContainer";
import StorylineContainer from "./Storyline/StorylineContainer";

const HomePage = () => {
  return (
    <div className="home">
      <PageProgress color={"skyblue"} height={8} />
      <div className="homeContainer">
        <Title />
        <form id="slide2" className="home-formContainer">
          <GeneralInfoContainer />
          <VocabularyWordsContainer />
          <StorylineContainer />
        </form>
      </div>
    </div>
  );
};
export default HomePage;
