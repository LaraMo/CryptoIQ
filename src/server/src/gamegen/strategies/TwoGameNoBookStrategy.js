import Puzzle from '../../lib/enums/Puzzle';
import WordSearch from '../../puzzles/wordsearch';
import Crossword from '../../puzzles/crossword';
import { randomWords, diffWords } from '../../lib/helperFunctions'
import Strategy from './Strategy';

export default class TwoGamesNoBookStrategy extends Strategy {
    constructor(name, words) {
        super(name);
        this.words = words;
    }
    puzzles = [Puzzle.CROSS_WORD, Puzzle.WORD_SEARCH];
    
    async generate() {
        let wordArray = [];
        let firstLevel = this.words;
        firstLevel.forEach(word => {
            word.word = word.wordsEntered;
            word.clue = word.definitionsEntered;
            wordArray.push(word.wordsEntered);
        });
        const crossword = new Crossword(firstLevel);

        
        //the second level is using the same workds from the first level
        const wordSearch = new WordSearch(wordArray, true);

        return [crossword, wordSearch];
    }

    toString() {
        return `${this._name}
                Available puzzles: ${TwoGamesWithLockAndPageNumberStrategy.puzzles}
        `
    }
}