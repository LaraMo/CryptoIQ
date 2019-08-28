class Crossword {
    board = [];
    clues = [];
    wordsWithSimilarFirstLetters = []
    
    constructor(clues) {
        this.clues = clues;
    }
    
    get clues() {
        return this.clues;
    }
    
    get board() {
        return this.board;
    }

    /**
     * Initializes the game board with the dimensions of 100 x 100
     * Once the board is full, it will be shrinked 
     */
    initBoard() {
        for(let i = 0; i < 100; i ++) {
            for(let j = 0; j < 100; j ++) {
                this.board[i][j] = null;
            }
        }
    }

    /**
     * Sorts the array of words by their length, largest to smallest
     */
    sortAnswersByLength() {
        if(this.clues) {
            this.clues.sort((a, b) => b.answer.length - a.answer.length)
        }
    }

    /**
     * Places all the words on the board
     */
    placeAnswersOnBoard() {
        let startPosition = Math.floor(49 - (this.clues[0].answer.length/2)) ;        

        this.clues.forEach((word, index) => {
            if(index == 0) {
                //place the first word in the middle of the board, and build the rest of the board around the first word
                placeHorizontal(49, startPosition, word);
            }
            else {
                //build the rest of the board
             }

        })
    }

    /**
     * places the word horizontally on the board
     * 
     * @param {int} yPosition static y position
     * @param {int} xStartPosition x start position, changes with every letter places
     * @param {string} word the word to add to the board
     */
    placeHorizontal(yPosition, xStartPosition, word) {
        Array.prototype.forEach.call(word, (letter, letterIndex) => {
            this.board[yPosition][xStartPosition + letterIndex] = letter;
        })
    }

    /**
     * places the word vertically on the board
     * 
     * @param {int} xPosition static x position
     * @param {int} yStartPosition y start position, changes with every letter placed
     * @param {string} word the word to add to the board
     */
    placeVertical(xPosition, yStartPosition, word) {
        Array.prototype.forEach.call(word, (letter, letterIndex) => {
            this.board[yStartPosition + letterIndex][xPosition] = letter;
        })
    }







    /**
     * finds words which start with the same first letter and adds them to an array
     * from this array you can know which words can be used together (vertical + horizontal)
     * because of their first letter match
     */
    findWordsWithSimilarFirstLetters() {
        this.clues.forEach(clue => {
            this.clues.forEach(cluematch => {
                if(clue !== cluematch && !this.checkDuplicateArrayEntries(this.wordsWithSimilarFirstLetters, [clue.answer, cluematch.answer]) && clue.answer.charAt(0) == cluematch.answer.charAt(0)) {
                    this.wordsWithSimilarFirstLetters.push([clue.answer, cluematch.answer]);
                }
            })
        })
        return this.wordsWithSimilarFirstLetters;
    }


    checkDuplicateArrayEntries(array, item) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][0] == item[0] && array[i][1] == item[1] || 
                array[i][0] == item[1] && array[i][1] == item[0] ) {
                    return true; 
            }
        }
        return false;
    }


}


export default Crossword;