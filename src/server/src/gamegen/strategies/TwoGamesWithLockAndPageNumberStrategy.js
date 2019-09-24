import Puzzle from '../../lib/enums/Puzzle';
import CipherWheel from '../../puzzles/cipherwheel';
import Lock from '../../puzzles/lock';
import { randomWords } from '../../lib/helperFunctions'

export default class TwoGamesWithLockAndPageNumberStrategy {
    static puzzles = [Puzzle.CIPHER_WHEEL, Puzzle.LOCK_COMBINATION];
    static generate(words) {
        const cipherwheel = new CipherWheel(randomWords(words));
        const lockCombination = new Lock(randomWords(words, 2));

        return [cipherwheel, lockCombination]
    }
}