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
import TwoGamesWithPageNumberStrategy from './strategies/TwoGamesWithPageNumberStrategy';
import TwoGameNoBookStrategy from './strategies/TwoGameNoBookStrategy';
import ThreeGamesWithLockAndPageNumberStrategy from './strategies/ThreeGamesWithLockAndBooks';
import ThreeGamesWithBooks from './strategies/ThreeGamesWithBooks';
import ThreeGamesNoBookStrategy from './strategies/ThreeGamesNoBookStrategy';
import FourGamesWithLockAndBooks from './strategies/FourGamesWithLockAndBooks';
import FourGamesWithBooks from './strategies/FourGamesWithBooks';

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
        const _2GPN = new TwoGamesWithPageNumberStrategy(
            '2GPN',
            this.vocabulary,
        );
        const _2G = new TwoGameNoBookStrategy(
            '2G',
            this.vocabulary,
        );
        const _3GLPN = new ThreeGamesWithLockAndPageNumberStrategy(
            '3GLPN',
            this.vocabulary,
        );
        const _3GPN = new ThreeGamesWithBooks(
            '3GPN',
            this.vocabulary,
        );
        const _3G = new ThreeGamesNoBookStrategy(
            '3G',
            this.vocabulary,
        );
        const _4GLPN = new FourGamesWithLockAndBooks(
            '4GLPN',
            this.vocabulary,
        );
        const _4GPN = new FourGamesWithBooks(
            '4GPN',
            this.vocabulary,
        );

        this.strategies['4GLPN'] = _4GLPN;
        this.strategies['3GLPN'] = _3GLPN;
        this.strategies['2GLPN'] = _2GLPN; 

        this.strategies['4GPN'] = _4GPN;
        this.strategies['3GPN'] = _3GPN;
        this.strategies['2GPN'] = _2GPN;

        this.strategies['3G'] = _3G;
        this.strategies['2G'] = _2G;
    }

    async generate() {
        this.pushHeader();
        let generated;
        switch (this.storyline.difficultyLevel) {
            case Difficulty.EASY.VALUE:
                if (this.generalInfo.textbook) {
                    if(this.generalInfo.locks)
                        generated = await this.strategies['2GLPN'].generate();
                    else
                        generated = await this.strategies['2GPN'].generate();
                } 
                else {
                    generated = await this.strategies['2G'].generate();
                }
                break;
            case Difficulty.MEDIUM.VALUE:
                if ( this.generalInfo.textbook) {
                    if(this.generalInfo.locks)
                        generated = await this.strategies['3GLPN'].generate();
                    else 
                        generated = await this.strategies['3GPN'].generate();
                }
                else {
                    generated = await this.strategies['3G'].generate();
                }
                break;
            case Difficulty.ADVANCED.VALUE:
                if(this.generalInfo.locks)
                        generated = await this.strategies['4GLPN'].generate();
                    else 
                        generated = await this.strategies['4GPN'].generate();
                break;
            default:
                throw new Error('Invalid enum value for difficulty level');
        }

        for (let i = 0; i < generated.length; i++) {
            await this.pushStage(generated[i], Storyline[`ACTION${i + 1}`]);
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