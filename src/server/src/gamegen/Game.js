import {getEnumFrom, difficultyEnum as Difficulty} from '../lib/enums/Difficulty';

class GameGenerator {
    storyline = {
        TITLE: "The kings rings",
        OPENING: "",
        ACTION1: "",
        ACTION2: "",
        ENDING: "",
        
    };
    puzzles = [];
    vocabulary = [];
    generalInfo = {};
    game = [];

    constructor(data) {
        this.storyline = data.storyline;
        this.vocabulary = data.vocabulary;
        this.generalInfo = data.generalInfo;
        
        this.generate();
    }

    generate() {
        this.pushTeac
        this.pushStoryLine();
        switch(getEnumFrom(this.storyline.difficultyLevel)) {
            case Difficulty.EASY.VALUE:
                break;
            case Difficulty.MEDIUM.VALUE:
                break;
            case Difficulty.HARD.VALUE:
                break;
            default:
                throw new Error("Invalid enum value for difficulty level");
        }
    }

    pushStoryLine(storylineEnum) {
        this.game.push(this.storyline[storylineEnum])
    }

    generatePuzzles(number) {
        
    }

    toPdf() {
        return this.pdfBuildStep;
    }

}

export default GameGenerator;