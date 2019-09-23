import {getEnumFrom, difficultyEnum as Difficulty} from '../lib/enums/Difficulty';
import Puzzle from '../lib/enums/Puzzle';
import CipherWheel from '../puzzles/cipherwheel';
import Crossword from '../puzzles/crossword'
import Lock from '../puzzles/lock'

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
    gameData = {}
    insPdf = []
    gamePdf = []

    constructor(data) {
        this.storyline = data.storyline;
        this.vocabulary = data.vocabulary;
        this.generalInfo = data.generalInfo;
        
        // this.generate();
    }

    generate() {
        this.gameData.teams = this.calculateTeamSize();
        // this.pushStoryLine();
        switch(getEnumFrom(this.storyline.difficultyLevel)) {
            case Difficulty.EASY.VALUE:
                if(this.generalInfo.locks)
                let allowedPuzzles = [];
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

    calculateTeamSize() {
        let teamSize = {};
        let numberStudent = parseInt(this.generalInfo.numberOfStudents);
        let preferableTeamSize = [3, 4, 5];

        preferableTeamSize.forEach((size) => teamSize[size] =  numberStudent % size)

        let bestMatch = [];
        Object.keys(teamSize).forEach((size) => {
            if(teamSize[size] == 0) {
                bestMatch = [{
                    "teamSize": parseInt(size),
                    "teamNumber":parseInt(numberStudent / size),
                }] 
            } else {
                if(bestMatch.length === 0) {
                    bestMatch = [{
                        "teamSize": parseInt(size),
                        "teamNumber": parseInt(numberStudent / size) 
                    }, {
                        "teamSize": parseInt(numberStudent % size),
                        "teamNumber": 1
                    }]
                } else {
                    if(bestMatch.length === 1) return;
                    if(bestMatch[1].teamSize >= teamSize[size]) {
                        bestMatch = [{
                            "teamSize": parseInt(size),
                            "teamNumber": parseInt(numberStudent / size)
                        }, {
                            "teamSize": parseInt(numberStudent % size),
                            "teamNumber": 1
                        }]
                    }
                }
            }
        }) 
        return bestMatch;
    }

    generatePuzzles(number) {
        
    }

    toGamePdf() {
        return this.gamePdf;
    }

    toInstructionPdf() {
        return this.insPdf;
    }
}

export default GameGenerator;