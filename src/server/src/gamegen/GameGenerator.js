import {
    getEnumFrom,
    difficultyEnum as Difficulty
} from '../lib/enums/Difficulty';
import Storyline from '../lib/enums/Storyline';
import DefaultStoryline from '../lib/enums/DefaultStoryline';
import {styleDefault} from "../lib/pdf/canvasHelpers"
import Puzzle from '../lib/enums/Puzzle';
import CipherWheel from '../puzzles/cipherwheel';
import Crossword from '../puzzles/crossword'
import Lock from '../puzzles/lock'
import {
    TwoGamesWithLockAndPageNumberStrategy
} from "./strategies/";
import PdfObjectType from '../lib/enums/PdfObjectType';
import {
    textInstruction
} from '../lib/pdf/pdfHelpers';

class GameGenerator {
    storyline = {};
    puzzles = [];
    vocabulary = [];
    generalInfo = {};
    game = [];
    gameData = {};
    insPdf = [];
    gamePdf = [];
    strategies = {};
    strategy;

    constructor(data) {
        if (this.storyline) {
            this.storyline = data.storyline;
        } else {
            this.storyline = DefaultStoryline[0];
        }
        this.vocabulary = data.vocalbulary.words;
        this.generalInfo = data.general;

        this.gameData.teams = this.calculateTeamSize();
        this.loadStrategies();
        // this.pushGameInstruction();
    }

    loadStrategies() {
        const _2GLPN = new TwoGamesWithLockAndPageNumberStrategy(
            '2GLPN',
            this.vocabulary,
        );
        // const _2GNB = new TwoGamesNoBook(
        //     '2GNB',
        //     this.vocabulary,
        // );
        // const _2GNL = new TwoGamesWithLockAndPageNumberStrategy(
        //     '2GNL',
        //     this.vocabulary,
        // );
        this.strategies['2GLPN'] = _2GLPN;
    }

    async generate() {
        this.pushHeader();
        switch (this.storyline.difficultyLevel) {
            case Difficulty.EASY.VALUE:
                if (this.generalInfo.locks && this.generalInfo.textbook) {
                    let generated = this.strategies['2GLPN'].generate();
                    for (let i = 0; i < generated.length; i++) {
                        await this.pushStage(generated[i], Storyline[`ACTION${i + 1}`]);
                    }
                }
                break;
            case Difficulty.MEDIUM.VALUE:
                if (this.generalInfo.locks) {
                    let allowedPuzzles = [
                        Puzzle.CIPHER_WHEEL,
                        Puzzle.LOCK_COMBINATION,
                        Puzzle.CROSS_WORD,
                    ];
                }
                break;
            case Difficulty.ADVANCED.VALUE:
                break;
            default:
                throw new Error('Invalid enum value for difficulty level');
        }
        this.pushStoryLine(Storyline.ENDING, this.gamePdf);
        this.pushStoryLine(Storyline.ENDING, this.insPdf);
    }


    async pushHeader() {
        let title = this.getTitleStep();
        // GAME HEADER
        this.gamePdf.push({
            'type': PdfObjectType.TEXT,
            "text": "Name: ________________________________________________"
        }, {
            'type': PdfObjectType.BR,
        })
        title.forEach(part => this.gamePdf.push(part));
        this.gamePdf.push({
            type: PdfObjectType.TEXT,
            fontSize: styleDefault.fontSize 
        });
        this.pushStoryLine(Storyline.OPENING, this.gamePdf);
        this.pushStoryLine(Storyline.QUEST, this.gamePdf);
        


        // INS HEADER
        // this.insPdf.push({
        //     'type': PdfObjectType.TEXT
        // })
        // this.insPdf.push(title)
        // this.pushGameInstruction();
        // let teamSizeRecommendedText = this.gameData.teams.reduce(
        //     (accumulator, value) =>
        //     `${accumulator} ${value['teamNumber']} of ${value['teamSize']}`,
        // );

        // let meta = [{
        //     type: PdfObjectType.TEXT,
        //     text: `Recommended team size: ${teamSizeRecommendedText}`,
        // }, ];

        // this.insPdf.push(meta);
    }

    async pushFooter() {

    }

    async pushStage(puzzle, storylineEnum) {
        let temp = []
        if(puzzle instanceof Array && puzzle.length > 1) {
            for(let i = 0; i < puzzle.length; i++) {
                await temp.push(...await puzzle[i].toGamePdf());
            }
        } else {
            temp = await puzzle.toGamePdf();
        }
        this.pushStoryLine(storylineEnum.toLowerCase(), this.gamePdf);
        this.pushPuzzle(temp, this.gamePdf);
        temp = []
        if(puzzle instanceof Object && puzzle.length > 1) {
            for(let i = 0; i < puzzle.length; i++) {
                await temp.push(...await puzzle[i].toInstructionPdf());
            }
        } else {
            temp = await puzzle.toInstructionPdf();
        }
        this.pushStoryLine(storylineEnum.toLowerCase(), this.insPdf);
        this.pushPuzzle(temp, this.insPdf);
    }

    pushStoryLine(storylineEnum, pdfArray) {
        let options = {
            indent: styleDefault.paragraphIndent,
            align: 'justified'
        }
        if(pdfArray) {
            pdfArray.push(textInstruction(this.storyline[storylineEnum.toLowerCase()], options));
            pdfArray.push({
                type: PdfObjectType.BR,
            })
        } else {
            this.gamePdf.push(textInstruction(this.storyline[storylineEnum.toLowerCase()], options));
            this.gamePdf.push({
                type: PdfObjectType.BR,
            })
            this.insPdf.push(textInstruction(this.storyline[storylineEnum.toLowerCase()], options));
            this.gamePdf.push({
                type: PdfObjectType.BR,
            })
        }

        
    }

    pushPuzzle(puzzle, pdfArray) {
        if (pdfArray && puzzle) {
            puzzle.forEach(ins => {
                pdfArray.push(ins)
            })
        }
        else
            console.error("Invalid input for puzzle generated")
    }

    pushGameInstruction() {

    }

    getTitleStep() {
        return [
            {
                type: PdfObjectType.BR,
            },
            {
                type: PdfObjectType.TEXT,
                fontSize: styleDefault.titleSize
            },
            {
                type: PdfObjectType.TEXT,
                text: this.storyline[Storyline.TITLE.toLowerCase()].toUpperCase(),
                options: {
                    align: 'center',
                }
            },
            {
                type: PdfObjectType.TEXT,
                fontSize: styleDefault.fontSize
            },
            {
                type: PdfObjectType.BR,
            }
        ]
       
    }

    calculateTeamSize() {
        let teamSize = {};
        let numberStudent = parseInt(this.generalInfo.numberOfStudents);
        let preferableTeamSize = [3, 4, 5];

        preferableTeamSize.forEach(size => (teamSize[size] = numberStudent % size));

        let bestMatch = [];
        Object.keys(teamSize).forEach(size => {
            if (teamSize[size] == 0) {
                bestMatch = [{
                    teamSize: parseInt(size),
                    teamNumber: parseInt(numberStudent / size),
                }, ];
            } else {
                if (bestMatch.length === 0) {
                    bestMatch = [{
                            teamSize: parseInt(size),
                            teamNumber: parseInt(numberStudent / size),
                        },
                        {
                            teamSize: parseInt(numberStudent % size),
                            teamNumber: 1,
                        },
                    ];
                } else {
                    if (bestMatch.length === 1) return;
                    if (bestMatch[1].teamSize >= teamSize[size]) {
                        bestMatch = [{
                                teamSize: parseInt(size),
                                teamNumber: parseInt(numberStudent / size),
                            },
                            {
                                teamSize: parseInt(numberStudent % size),
                                teamNumber: 1,
                            },
                        ];
                    }
                }
            }
        });
        return bestMatch;
    }

    toGamePdf() {
        return this.gamePdf;
    }

    toInstructionPdf() {
        return this.insPdf;
    }
}

export default GameGenerator;