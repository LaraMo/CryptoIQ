class Crossword {

    constructor(clues) {
        //Crossword should at least contain 2 words
        if(clues && clues.length > 1) {
            //Sort the array from longest word to shortest word
            this.clues = clues.sort((a, b) => b.answer.length - a.answer.length);
            this.initBoard();   
            this.placeAnswersOnBoard();
        }
    }
    
    get clues() {
        return this.clues;
    }
    
    get board() {
        return this.board;
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

        this.board = new Array(this.GRID_ROWS);
        
        for(let i = 0; i < this.GRID_ROWS; i ++) {
            this.board[i] = new Array(this.GRID_COLS);
        }
    }

    /**
     * Places all the words on the board
     */
    placeAnswersOnBoard() {
        this.clues.forEach((word, index) => {
            if(index == 0) {
                //place the first word in the middle of the board, and build the rest of the board around the first word
                if(word.length % 2 == 0)
                    this.placeHorizontal(Math.floor(this.GRID_COLS/2), Math.floor(this.GRID_ROWS/2) - Math.floor(this.clues[0].answer.length/2) , word);
                else
                    this.placeVertical(Math.floor(this.GRID_ROWS/2), Math.floor(this.GRID_COLS/2) - Math.floor(this.clues[0].answer.length/2), word);
            }
            else {
                //build the rest of the board
                let position = this.findPositionForWord(word);
                
                if(position) {
                    if(position.direction == "h")
                        this.placeHorizontal(position.staticPosition, position.startIndex, word)
                    else if(position.direction == "v")
                        this.placeVertical(position.staticPosition, position.startIndex, word)
                }
                else {
                    this.wordsWhichCantBePlaced.push(word)
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
            this.board[yPosition][xStartPosition + letterIndex] = letter;
        })

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
            this.board[yStartPosition + letterIndex][xPosition] = letter;
        })

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
        let position = [];
        //loop over all the words already on the board
        this.placedWordsOnTheBoard.forEach(placedWord => {
            //loop over each letter in the word to be placed
            Array.prototype.forEach.call(word, (letter, letterIndex) => {
                //find points where the word to place intersects with the placedword
                wordCollisionIndexes = this.getAllIndexes(word,letter);
                if(wordCollisionIndexes.length > 0) {
                    wordPosition = this.checkForConflictingWords(placedWord, wordCollisionIndexes, letterIndex, word, 1)
                    if(!wordPosition)
                        return false;
                }
            })
        })
    }

    /**
     * Retrieves all indexes of the word which have the
     * 
     * @param {string} word the word to be searched
     * @param {char} letter the char to search for in the word
     */
    getAllIndexes(word, letter) {
        var indexes = [], i = -1;
        while ((i = word.indexOf(letter, i+1)) != -1){
            indexes.push(i);
        }
        return indexes;
    }

    /**
     * 
     * @param {string} placedWord the word placed on the board
     * @param {string} IntersectionIndex the index of the letter which intersects with tbe placedWord
     * @param {string} wordToPlace the word that I'm checking
     * @param {char} searchDirection if the word on the board in horizontal, then the search direction is vertical and vice versa 
     * @param {int} increaseDecrease -1 or 1, -1 to decrement the intersection index, and 1 to increment the intersection index
     */
        checkForConflictingWords(placedWord, wordCollisionIndexes, letterIntersectionIndex, wordToPlace) {

            let best = {};
            let bestIntersections = 0;
            const staticPosition = placedWord.startIndex + wordCollisionIndexes[i];
            //startPosition is an x/col position
            const startPosition = placedWord.staticPosition - (wordToPlace.substring(0, letterIntersectionIndex).length);

            for(let i = 0; i < wordCollisionIndexes.length; i++) {
                let currentPosition = startPosition;
                let intersections = 0;

                //checks that the current word does not overlap with another word that is already placed on the board
                this.placedWordsOnTheBoard.forEach(word => {
                    if(word.direction != placedWord.direction)
                        if(word.startIndex == startPosition && word.staticPosition == staticPosition)
                            return false;
                })

                if(placedWord.direction == "h") {
                    //The word crosses the placed word vertically
                    for(let j = 0; j < wordToPlace.length; j++) {
                        /*
                            checks col to the right and to the left, if there is a word to the right or to the left make sure that the current 
                            row/col holds the letter that we are trying to place which makes for a good intersection
                        */
                        if(this.board[currentPosition][staticPosition - 1] != null || this.board[currentPosition][staticPosition + 1] != null) {
                            if(this.board[currentPosition][staticPosition] != wordToPlace[letterIntersectionIndex])
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
                        if(this.board[staticPosition - 1][currentPosition] != null || this.board[staticPosition + 1][currentPosition] != null) {
                            if(this.board[staticPosition][currentPosition] != wordToPlace[letterIntersectionIndex])
                                return false;
                            else
                                intersections++;
                        }
                    }
                }

                //The more intersections better the placement position is
                if(best && intersections > bestIntersections) {
                    best = {
                        startIndex: startPosition,
                        staticPosition: staticPosition,
                        word : wordToPlace,
                        direction: placedWord.direction == "v" ? "h" : "v"
                    }
                    bestIntersections = intersections;
                }
            }
            
            if(!best)
                return false

            return best
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


    get Crossword() {
        return board;
    }

    /**
     * Checks to see if the 2 string array is already within the 
     * original array
     * 
     * @param {2D string array} array 
     * @param {array with 2 strings} item 
     */
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