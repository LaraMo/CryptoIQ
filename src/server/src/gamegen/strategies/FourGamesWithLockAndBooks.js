import Puzzle from '../../lib/enums/Puzzle';
import CipherWheel from '../../puzzles/cipherwheel';
import Crossword from '../../puzzles/crossword';
import Lock from '../../puzzles/lock';
import WordSearch from '../../puzzles/wordsearch';
import {
    randomWords,
    diffWords
} from '../../lib/helperFunctions'
import Strategy from './Strategy';

export default class FourGamesWithLockAndPageNumberStrategy extends Strategy {
    constructor(name, words) {
        super(name);
        this.words = words;
    }
    puzzles = [Puzzle.CIPHER_WHEEL, Puzzle.LOCK_COMBINATION, Puzzle.CROSS_WORD, Puzzle.WORD_SEARCH];

    generate() {
        let firstLevel = randomWords(this.words, 3);
        const cipherwheel = new CipherWheel(firstLevel[0].wordsEntered);
        let wordArrayForWordSearch = [];

        let secondLevel = diffWords(this.words, firstLevel);
        secondLevel = randomWords(secondLevel, 3)
        const lockCombination = new Lock(secondLevel, false, false, true);

        let wordsInFirstAndSecondLevel = firstLevel.concat(secondLevel)
        let thirdLevel = diffWords(this.words, wordsInFirstAndSecondLevel);
        thirdLevel = randomWords(thirdLevel, this.words.length - wordsInFirstAndSecondLevel.length);
        thirdLevel.forEach(word => {
            word.word = word.wordsEntered;
            word.clue = word.definitionsEntered;
            wordArrayForWordSearch.push(word.wordsEntered);
        });
        
        const crossword = new Crossword(thirdLevel);

        //the fourth level is using the same words from the third level
        const wordSearch = new WordSearch(wordArrayForWordSearch, true);
        
        return [cipherwheel, lockCombination, crossword, wordSearch];
    }

    toString() {
        return `${this._name}
                Available puzzles: ${FourGamesWithLockAndPageNumberStrategy.puzzles}
        `
    }
}