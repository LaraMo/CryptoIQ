import Puzzle from '../../lib/enums/Puzzle';
import WordSearch from '../../puzzles/wordsearch';
import Crossword from '../../puzzles/crossword';
import CipherWheel from '../../puzzles/cipherwheel';
import { randomWords, diffWords } from '../../lib/helperFunctions'
import Strategy from './Strategy';

export default class TwoGamesNoBookStrategy extends Strategy {
    constructor(name, words) {
        super(name);
        this.words = words;
    }
    puzzles = [Puzzle.CROSS_WORD, Puzzle.WORD_SEARCH, Puzzle.CIPHER_WHEEL];
    
    generate() {
        debugger;
        let thirdlevel = randomWords(this.words, 1) 
        let wordArrayForWordSearch = [];
        
        
        let firstLevel = this.words;
        firstLevel.forEach(word => {
            word.word = word.wordsEntered;
            word.clue = word.definitionsEntered;
            wordArrayForWordSearch.push(word.wordsEntered);
        });
        let crossword = new Crossword(firstLevel);
        
        if (crossword.activeWordList.length == this.words.length) {
            let words = diffWords(this.words, thirdlevel)
            crossword = new Crossword(words);
        }
        else {
            let difference = [];
            this.words.forEach(word => {
                crossword.activeWordList.forEach(activeWord => {
                    if(activeWord.word !== word.wordsEntered)
                        difference.push(word);
                })
            })
            thirdlevel = randomWords(difference, 1); 
        }

        //the second level is using the same words from the first level
        const wordSearch = new WordSearch(wordArrayForWordSearch, true);

        //Third level uses only one word
        let cipherWheel = new CipherWheel(thirdlevel[0].wordsEntered, "EASY", true, true);

        return [crossword, wordSearch, cipherWheel];
    }

    toString() {
        return `${this._name}
                Available puzzles: ${TwoGamesWithLockAndPageNumberStrategy.puzzles}
        `
    }
}