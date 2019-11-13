import Puzzle from '../../lib/enums/Puzzle';
import CipherWheel from '../../puzzles/cipherwheel';
import Lock from '../../puzzles/lock';
import { randomWords, diffWords } from '../../lib/helperFunctions'
import Strategy from './Strategy';

export default class TwoGamesWithLockAndPageNumberStrategy extends Strategy {
    constructor(name, words) {
        super(name);
        this.words = words;
    }
    puzzles = [Puzzle.CIPHER_WHEEL, Puzzle.LOCK_COMBINATION];
    
    generate() {
        let firstLevel = randomWords(this.words);
        const cipherwheel = new CipherWheel(firstLevel[0].wordsEntered);
        let secondLevel = diffWords(this.words, firstLevel);
        secondLevel = randomWords(secondLevel, 3)
        const lockCombination = new Lock(secondLevel);
        return [cipherwheel, lockCombination];
    }

    toString() {
        return `${this._name}
                Available puzzles: ${TwoGamesWithLockAndPageNumberStrategy.puzzles}
        `
    }
}