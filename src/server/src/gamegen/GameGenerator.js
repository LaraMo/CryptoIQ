import {
    getEnumFrom,
    difficultyEnum as Difficulty
} from '../lib/enums/Difficulty';
import Storyline from '../lib/enums/Storyline';
import DefaultStoryline from '../lib/enums/DefaultStoryline';
import {
    styleDefault
} from "../lib/pdf/canvasHelpers"
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
import {
    gameGenerate
} from './core';
import TicketGenerator from './TicketGenerator';
import _ from 'lodash';

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
        const {
            general,
            vocalbulary
        } = data
        this.preferedSize = [3, 4];

        this.generalInfo = general;
        this.studentCounts = general.numberOfStudents
        if (this.storyline) {
            this.storyline = data.storyline;
        } else {
            this.storyline = DefaultStoryline[0];
        }
        this.generateTicket = general.rewardTicket;
        if (general.rewardTicket) {
            this.ticketMessage = data.ticketContent || "Congrats! You won!"
        }

        this.vocabulary = vocalbulary.words;
        this.generalInfo = data.general;
        this.teams = this.calculateTeamSize(this.studentCounts, this.preferedSize);
        this.loadStrategies();
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
        if (this.generateTicket && this.ticketMessage) {
            let noTicket = Math.max.apply(Math, this.teams[1])
            var tickets = [];
            for (let i = 0; i < noTicket; i++) {
                tickets.push();
                this.insPdf.push(await new TicketGenerator(this.ticketMessage).toInstructionPdf())
            }
        }
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
        this.insPdf.push(title)
        let teamSize = this.teams[1].reduce((prev, current, i, arr) => {
            if (current in prev) {
                prev[current] += 1
            } else {
                prev[current] = 1
            }
            return prev
        },  {})
        let teamSizeRecommendedText = 
            `${this.teams[0]} teams - ${Object.keys(teamSize)
                .map(val => `${teamSize[val]} of ${val > 1 ? val + " people": val + " person"}`).join(', ')}`;
        let meta = [{
            type: PdfObjectType.TEXT,
            text: `Recommended team size: ${teamSizeRecommendedText}`,
        }, ];

        this.insPdf.push(meta);
    }

    async pushStage(puzzle, storylineEnum) {
        let temp = []
        if (puzzle instanceof Array && puzzle.length > 1) {
            for (let i = 0; i < puzzle.length; i++) {
                await temp.push(...await puzzle[i].toGamePdf());
            }
        } else {
            temp = await puzzle.toGamePdf();
        }
        this.pushStoryLine(storylineEnum.toLowerCase(), this.gamePdf);
        this.pushPuzzle(temp, this.gamePdf);
        temp = []
        if (puzzle instanceof Object && puzzle.length > 1) {
            for (let i = 0; i < puzzle.length; i++) {
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
        if (pdfArray) {
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
        } else
            console.error("Invalid input for puzzle generated")
    }

    pushGameInstruction() {

    }

    getTitleStep() {
        return [{
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

    calculateTeamSize(total, preferedSize) {
        if (total === 0) {
            return [0, []];
        }
        if (preferedSize.length === 0 && total > 0) {
            return [Infinity, []];
        }
        if (preferedSize[0] > total) {
            return this.calculateTeamSize(total, preferedSize.slice(1));
        } else {
            var loseIt = this.calculateTeamSize(total, preferedSize.slice(1)); // just one call of change
            var useIt = this.calculateTeamSize(total - preferedSize[0], preferedSize); // just one call of change
            if (loseIt[0] < 1 + useIt[0]) {
                return loseIt;
            } else {
                return [1 + useIt[0], useIt[1].concat(preferedSize[0])];
            }
        }
    }

    toGamePdf() {
        return this.gamePdf;
    }

    toInstructionPdf() {
        return this.insPdf.reduce((acc, cur) => {
            if(_.isArray(cur)) {
                cur.forEach(val => acc.push(val))
            } else {
                acc.push(cur)
            }
            return acc
        }, []);
    }
}

export default GameGenerator;