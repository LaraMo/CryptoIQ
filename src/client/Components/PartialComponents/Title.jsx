










import React from "react";
//Main Title and Description Section
const projectTitle = "CryptIQ";
const descriptionPart1 = "Simple ";
const descriptionPart2 = "and ";
const descriptionPart3 = "reusable ";
const descriptionPart4 = "platform to generate escape rooms for ";
const descriptionPart5 = "educational purposes";
const getStartedPart1 = "Get started ";
const getStartedPart2 = "now";
const instructionsPart1 = "✔️ Your previous game will be saved with us. No more retyping information!"
const instructionsPart2 = "✔️ An answer sheet will be provided for the teachers for easy correction!" 

const Title = () => {
  return (
    <div id="slide1" className="home-title">
      <h1>{projectTitle} <span>💬</span></h1>
      <h2>
        <span>{descriptionPart1}</span>
        {descriptionPart2}
        <span>{descriptionPart3}</span> {descriptionPart4}
        <span>{descriptionPart5}</span>.
      </h2>
      <h2>
        {getStartedPart1}
        <span>{getStartedPart2}</span>!
      </h2>
      <div>
        <h3>{instructionsPart1}</h3>
        <h3>{instructionsPart2}</h3>
      </div>
    </div>
  );
};

export default Title;
