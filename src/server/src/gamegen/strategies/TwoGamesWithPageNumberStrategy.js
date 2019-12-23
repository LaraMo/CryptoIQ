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
        let choosenWords = randomWords(this.words, 3);
        const cipherwheels = []

        cipherwheels[0] = new CipherWheel(choosenWords[0].wordsEntered, "EASY", true, true);
        cipherwheels[1] = new CipherWheel(choosenWords[1].wordsEntered, "EASY", true, false);
        cipherwheels[2] = new CipherWheel(choosenWords[2].wordsEntered, "EASY", true, false);
        
        
        let secondLevel = diffWords(this.words, choosenWords);
        secondLevel = randomWords(secondLevel, 3)
        const lockCombination = new Lock(choosenWords, false, false, true);
        return [cipherwheels, lockCombination];
    }

    toString() {
        return `${this._name}
                Available puzzles: ${TwoGamesWithLockAndPageNumberStrategy.puzzles}
        `
    }
}