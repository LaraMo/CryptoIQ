import React from "react";
// import dawson from "../../assets/dawson.png";
//Main Title and Description Section
const projectTitle = "CryptIQ Classroom";
const instructionsPart1 = "✔️ Simple and reusable platform to generate educational escape rooms for active learning"
const instructionsPart2 = "✔️ Your previous game will be saved with us. No more retyping information"
const instructionsPart3 = "✔️ When generating a game, an answer sheet will be provided for the teachers for easy correction, all in one zip file" 
const Title = () => {
  return (
    <div className="home-title">
      <h1>{projectTitle} <span>💬</span></h1>
      <div>
        <h3>{instructionsPart1}</h3>
        <h3>{instructionsPart2}</h3>
        <h3>{instructionsPart3}</h3>
      </div>
    </div>
  );
};

export default Title;
