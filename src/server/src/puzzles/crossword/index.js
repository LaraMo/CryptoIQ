class Crossword {
    
    constructor(clues) {
        //Crossword should at least contain 2 words
        if(clues && clues.length > 1) {
            //Sort the array from longest word to shortest word
            this._clues = clues.sort((a, b) => b.answer.length - a.answer.length);
            this.initBoard();   
            this.placeAnswersOnBoard();
        }
    }
    
    get clues() {
        return this._clues;
    }
    
    get board() {
        return this._board;
    }

    /**
     * Initializes the game board with the dimensions of 100 x 100
     * Once the board is full, it will be optimized (shrinked) 
     */
    initBoard() {
        this.wordsWithSimilarFirstLetters = [];
        this.placedWordsOnTheBoard = [];
        this.wordsWhichCantBePlaced = [];
        this.GRID_ROWS = 100;
        this.GRID_COLS = 100;

        this._board = new Array(this.GRID_ROWS);
        
        for(let i = 0; i < this._board.length; i ++) {
            this._board[i] = new Array(this.GRID_COLS);
        }
    }

    /**
     * Places all the words on the board
     */
    placeAnswersOnBoard() {
        this._clues.forEach((word, index) => {
            if(index == 0) {
                //place the first word in the middle of the board, and build the rest of the board around the first word
                if(word.answer.length % 2 == 0)
                    this.placeHorizontal(Math.floor(this.GRID_COLS/2) - 1, Math.floor(this.GRID_ROWS/2) - 1 - (word.answer.length/2) , word.answer);
                else
                    this.placeVertical(Math.floor(this.GRID_ROWS/2) -1 , Math.floor(this.GRID_COLS/2) - 1 - Math.floor(word.answer.length/2), word.answer);
            }
            else {
                //build the rest of the board
                let position = this.findPositionForWord(word.answer);
                console.log(position);
                if(position) {
                    if(position.direction == "h")
                        this.placeHorizontal(position.staticPosition, position.startIndex, word.answer);
                    else if(position.direction == "v")
                        this.placeVertical(position.staticPosition, position.startIndex, word.answer);
                }
                else {
                    this.wordsWhichCantBePlaced.push(word.answer);
                }
             }
        })
    }

    /**
     * places the word horizontally on the board (left to right)
     * 
     * @param {int} yPosition static y position
     * @param {int} xStartPosition x start position, changes with every letter places
     * @param {string} word the word to add to the board
     */
    placeHorizontal(yPosition, xStartPosition, word) {

        Array.prototype.forEach.call(word, (letter, letterIndex) => {
            this._board[yPosition][xStartPosition + letterIndex] = letter;
        });

        this.placedWordsOnTheBoard.push({
            word: word,
            direction : "h",
            startIndex: xStartPosition,
            endIndex: xStartPosition + word.length -1,
            staticPosition: yPosition
        });
    }

    /**
     * places the word vertically on the board (top to bottom)
     * 
     * @param {int} xPosition static x position
     * @param {int} yStartPosition y start position, changes with every letter placed
     * @param {string} word the word to add to the board
     */
    placeVertical(xPosition, yStartPosition, word) {

        Array.prototype.forEach.call(word, (letter, letterIndex) => {
            this._board[yStartPosition + letterIndex][xPosition] = letter;
        });

        this.placedWordsOnTheBoard.push({
            word: word,
            direction : "v",
            startIndex: yStartPosition,
            endIndex: yStartPosition + word.length -1,
            staticPosition: xPosition
        });
    }

    /**
     * 
     * @param {string} word the word to be placed on the board
     */
    findPositionForWord(word) {
        //loop over all the words already on the board
        let position = false;
        this.placedWordsOnTheBoard.forEach(placedWord => {
            //loop over each letter in the word to be placed
            if(!position)
                Array.prototype.forEach.call(word, letter => {
                    //find points where the word to place intersects with the placedword
                    if(!position) {
                        let wordCollisionIndexes = this.getAllIndexes(word,letter);
                        if(wordCollisionIndexes.length > 0) { 
                            position = this.checkForConflictingWords(placedWord, wordCollisionIndexes, word);
                        }
                    }
                });
        });

        return position;
    }

    /**
     * Retrieves all indexes of the word which have the
     * 
     * @param {string} word the word to be searched
     * @param {char} letter the char to search for in the word
     */
    getAllIndexes(word, letter) {
        let indexes = [], i = -1;
        while ((i = word.indexOf(letter, i+1)) != -1){
            indexes.push(i);
        }
        return indexes;
    }

    /**
     * 
     * @param {string} placedWord the word placed on the board
     * @param {string} IntersectionIndex the index of the letter which intersects with tbe placedWord
     * @param {string} wordToPlace the word that is being checked
     */
    checkForConflictingWords(placedWord, wordCollisionIndexes, wordToPlace) {
        let best = {};
        let bestIntersections = -1;
        //startPosition is an x/col position
        
        for(let i = 0; i < wordCollisionIndexes.length; i++) {
            const startPosition = placedWord.staticPosition - (wordToPlace.substring(0, wordCollisionIndexes[i]).length);
            const staticPosition = placedWord.startIndex + wordCollisionIndexes[i];
            let currentPosition = startPosition;
            let intersections = 0;

            //checks that the current word does not overlap with another word that is already placed on the board
            let overlap = this.placedWordsOnTheBoard.some(word => {
                if(!overlap && word.direction != placedWord.direction) 
                    if(word.startIndex == startPosition && word.staticPosition == staticPosition) 
                        return true;
            });

            if(overlap) {
                return true;
            }

            if(placedWord.direction == "h") {
                //The word crosses the placed word vertically
                for(let j = 0; j < wordToPlace.length; j++) {
                    /*
                        checks col to the right and to the left, if there is a word to the right or to the left make sure that the current 
                        row/col holds the letter that we are trying to place which makes for a good intersection
                    */
                    if(this._board[currentPosition][staticPosition - 1] != null || this._board[currentPosition][staticPosition + 1] != null) {
                        if(this._board[currentPosition][staticPosition] != wordToPlace[wordCollisionIndexes[i]])
                            return false;
                        else
                            intersections++;
                    }
                }
            }
            else if(placedWord.direction == "v") {
                //The word crosses the placed word horizontally
                for(let j = 0; j < wordToPlace.length; j++) {
                    //does the same as above, but checks above and below the row 
                    if(this._board[staticPosition - 1][currentPosition] != null || this._board[staticPosition + 1][currentPosition] != null) {
                        if(this._board[staticPosition][currentPosition] != wordToPlace[wordCollisionIndexes[i]])
                            return false;
                        else
                            intersections++;
                    }
                }
            }

            //The more intersections better the placement position is
            if(intersections > bestIntersections) {
                best = {
                    startIndex: startPosition,
                    staticPosition: staticPosition,
                    word : wordToPlace,
                    direction: placedWord.direction == "v" ? "h" : "v",
                }
                bestIntersections = intersections;
            }
        }

        return best;
    }
}


export default Crossword;