import Puzzle from '../../lib/enums/Puzzle';
import CipherWheel from '../../puzzles/cipherwheel';
import Lock from '../../puzzles/lock';
import Crossword from '../../puzzles/crossword';
const util = require('util')

import {
    randomWords,
    diffWords
} from '../../lib/helperFunctions'
import Strategy from './Strategy';

export default class ThreeGamesWithLockAndPageNumberStrategy extends Strategy {
    constructor(name, words) {
        super(name);
        this.words = words;
    }
    puzzles = [Puzzle.CIPHER_WHEEL, Puzzle.LOCK_COMBINATION, Puzzle.CROSS_WORD];

    generate() {
        let firstLevel = randomWords(this.words, 3);

        const cipherwheels = []

        cipherwheels[0] = new CipherWheel(firstLevel[0].wordsEntered, "EASY", true, true);
        cipherwheels[1] = new CipherWheel(firstLevel[1].wordsEntered, "EASY", true, false);
        cipherwheels[2] = new CipherWheel(firstLevel[2].wordsEntered, "EASY", true, false);

        let secondLevel = diffWords(this.words, firstLevel);
        secondLevel = randomWords(secondLevel, 3)
        const lockCombination = new Lock(secondLevel, false, false, true);

        let wordsInFirstAndSecondLevel = firstLevel.concat(secondLevel)
        let thirdLevel = diffWords(this.words, wordsInFirstAndSecondLevel);
        thirdLevel = randomWords(thirdLevel, this.words.length - wordsInFirstAndSecondLevel.length);
        thirdLevel.forEach(word => {
            word.word = word.wordsEntered;
            word.clue = word.definitionsEntered;
        });
        
        const crossword = new Crossword(thirdLevel);
        
        return [cipherwheels, lockCombination, crossword];
    }

    toString() {
        return `${this._name}
                Available puzzles: ${ThreeGamesWithLockAndPageNumberStrategy.puzzles}
        `
    }
}