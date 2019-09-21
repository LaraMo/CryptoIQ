import PdfObjectType from '../../lib/enums/PdfObjectType'; 
import { calculateCenterX } from '../../lib/pdf/pdfHelpers';
import { removeDuplicates } from '../../lib/helperFunctions';
import { createCanvas } from 'canvas';

class Crossword {
    constructor(clues) {
        //Crossword should at least contain 2 words
        if(clues && clues.length > 1) {
            //Sort the array from longest word to shortest word
            this._clues = clues.sort((a, b) => b.answer.length - a.answer.length);
            this._currentVerticalPosition = 1;
            this._currentHorizontalPosition = 1;
            this.initBoard();
            let wordsNotPlaced = this._clues;
            this.placeAnswersOnBoard(wordsNotPlaced);

            for(let i = 0; i < 10; i++) {
                wordsNotPlaced = this.wordsWhichCantBePlaced;
                this.wordsWhichCantBePlaced = [];
                this.placeAnswersOnBoard(clues);
            }
            this.shrink();
        }
    }
    get clues() {
        return this._clues;
    }
    
    get board() {
        return this._board;
    }

    /**
     * gets all the clues for the words which are placed vertically
     */
    get verticalClues() {
       return removeDuplicates(this.getClues("v"), 'word');
    }

    /**
     * gets all the clues for the words which are placed horizontally
     */
    get horizontalClues() {
        return removeDuplicates(this.getClues("h"), 'word');
    }

    get longestHorizontalClueLength() {
        return Math.max.apply(Math, removeDuplicates(this.horizontalClues, 'word').map(clue => clue.word.length));
    }

    get longestVerticalClueLength() {
        return Math.max.apply(Math, removeDuplicates(this.verticalClues, 'word').map(clue => clue.word.length));
    }

    /**
     * gets all the clues for the words which are placed in a given direction
     * @param {string} direction h or v
     * @returns {Array} clues
     */
    getClues(direction) {
        if(direction === "v" || direction === "h")
            return this.placedWordsOnTheBoard.filter(word => word.direction == direction).sort((a,b) => a.position - b.position)

        console.log(this.placedWordsOnTheBoard.filter(word => word.direction == direction).sort((a,b) => a.position - b.position));
        return new Array();
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
    placeAnswersOnBoard(clues) {
        clues.forEach((word, index) => {
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
                if(position) {
                    if(position.direction == "h")
                        this.placeHorizontal(position.staticPosition, position.startIndex, word.answer);
                    else if(position.direction == "v")
                        this.placeVertical(position.staticPosition, position.startIndex, word.answer);
                    else {
                        /*
                            if the return was solely true, without a position, it is not meant to be added
                            usually occurs when a word overlaps with another
                        */
                        this.wordsWhichCantBePlaced.push(word.answer);
                    }
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
            staticPosition: yPosition,
            position: this._currentHorizontalPosition
        });
        this._currentHorizontalPosition++;
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
            staticPosition: xPosition,
            position: this._currentVerticalPosition
        });

        this._currentVerticalPosition++;
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
                        let wordCollisionIndexes = this.getAllIndexes(placedWord.word,letter);
                        if(wordCollisionIndexes.length > 0) {
                            position = this.checkForConflictingWords(placedWord, wordCollisionIndexes, word, letter);
                        }
                    }
                });
        });

        return position;
    }

    /**
     * Retrieves all indexes of where the letter intersects with the word
     *
     * @param {string} word the word to be searched
     * @param {char} letter the char to search for in the word
     * @returns {Array} array of indexes
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
    checkForConflictingWords(placedWord, wordCollisionIndexes, wordToPlace, collisionLetter) {
        let best = {};
        let bestIntersections = -1;
        //startPosition is an x/col position

        for(let i = 0; i < wordCollisionIndexes.length; i++) {
            const startPosition = placedWord.staticPosition - (wordToPlace.substring(0, wordToPlace.indexOf(collisionLetter)).length);
            const staticPosition = placedWord.startIndex + wordCollisionIndexes[i];
            let intersections = 0;


            //checks that the current word does not overlap with another word that is already placed on the board
            let overlap = this.placedWordsOnTheBoard.some(word => {
                if(!overlap && word.direction != placedWord.direction)
                if(word.startIndex == startPosition && word.staticPosition == staticPosition)
                return true;
            });

            if(overlap) {
                return overlap;
            }

            // console.log("WORD: " + wordToPlace +
            // "\n" + (wordToPlace.substring(0, wordToPlace.indexOf(collisionLetter)).length) +
            // "\n" + "word-Collision: " + wordCollisionIndexes[i] +
            // "\n" + "start-pos: " + startPosition +
            // "\n" + "static-pos: " + staticPosition +
            // "\n" + "placed-word: " + placedWord.word +
            // "\n" + "placed-static-pos: " + placedWord.staticPosition
            // );

            if(placedWord.direction == "h") {
                //The word crosses the placed word vertically
                for(let j = 0; j < wordToPlace.length; j++) {
                    if(staticPosition + j > this.GRID_ROWS)
                        return false;
                    /*
                        checks col to the right and to the left, if there is a word to the right or to the left make sure that the current
                        row/col holds the letter that we are trying to place which makes for a good intersection
                    */
                    if(this._board[startPosition + j][staticPosition - 1] != null || this._board[startPosition + j][staticPosition + 1] != null) {
                        if(this._board[startPosition + j][staticPosition] && this._board[startPosition + j][staticPosition] != null) { 
                            if(this._board[startPosition + j][staticPosition] != wordToPlace[j])
                                return false;
                            else 
                                intersections++;
                        } else {
                            for(let k = 0; k < j; k++) {
                                if(this._board[startPosition + j][staticPosition - (j + k)] != wordToPlace[k]) {
                                    return false;
                                }
                            }
                        }
                    } 
                }
            }
            else if(placedWord.direction == "v") {
                //The word crosses the placed word horizontally
                for(let j = 0; j < wordToPlace.length; j++) {
                    if(staticPosition + j > this.GRID_COLS)
                        return false;
                    //does the same as above, but checks above and below the row
                    if(this._board[staticPosition - 1][startPosition + j] != null || this._board[staticPosition + 1][startPosition + j] != null) {
                        if(this._board[staticPosition][startPosition + j] !=null) {
                            //TODO: add logic to check row above to see if the letter above is == wordToPlace[j-1] if j > 0
                            if(this._board[staticPosition][startPosition + j] != wordToPlace[j])
                                return false;
                            else
                                intersections++;
                        } else {
                            for(let k = 0; k < j; k++) {
                                if(this._board[staticPosition - (j + k)][startPosition + j] != wordToPlace[k]) {
                                    return false;
                                }
                            }
                        }
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

    shrink() {
        let minRow = this.GRID_ROWS;
        let minCol = this.GRID_COLS;
        let maxRow = 0;
        let maxCol = 0;

        for (let i = 0; i < this.GRID_ROWS; i++) {
            for(let j = 0; j < this.GRID_COLS; j++) {
                if(this._board[i][j]) {
                    if(j < minCol) minCol = j;
                    if(j > maxCol) maxCol = j;
                    if(i < minRow) minRow = i;
                    if(i > maxRow) maxRow = i;
                }
            }
        }


        const newBoard = Array(maxRow - minRow + 1).fill([]);
        for (let i = 0; i < maxRow - minRow + 1; i++) {
            newBoard[i] = new Array(maxCol - minCol + 1).fill(undefined);
        }

        for (let i = 0, a = 0; i < this._board.length; i++) {
            for(let j = 0, b = 0; j < this._board[0].length; j++) {
                if(i >= minRow && i <= maxRow && j >= minCol && j <= maxCol) {
                    newBoard[a][b] = this._board[i][j];
                    b++;
                }
            }
            if (i >= minRow && i <= maxRow) {
                a++;
            }
        }

        this._board = newBoard;
        this.GRID_COLS = maxCol - minCol + 1;
        this.GRID_ROWS = maxRow - minRow + 1;
    }

    generateCrossWordImage(doc, showAnswer) {
        const supposedWidth = (doc.page.width - doc.page.margins.right - doc.page.margins.left) / this.longestHorizontalClueLength;
        const tileWidth = 40 > supposedWidth ? supposedWidth : 40;
        const tileHeight = tileWidth;
        console.log(tileWidth * this.longestHorizontalClueLength);
        const canvas = createCanvas(tileWidth * this.longestHorizontalClueLength, tileHeight * this.longestVerticalClueLength);
        const ctx = canvas.getContext('2d');

        ctx.font = "12px Arial";
        ctx.textAlign = "center";
        for (let i = 0; i <= this.GRID_COLS; i++) {
            for(let j = 0; j <= this.GRID_ROWS; j++) {
                if(this.board[i][j]) {
                    ctx.fillText(this.board[i][j], tileWidth*j + tileWidth/2 - 1, tileHeight*i + tileHeight/2 + 2)
                    ctx.strokeRect(tileWidth*j, tileHeight*i , tileWidth, tileHeight);
                }

            }
        }
        this.crossWordImageWidth = this.GRID_ROWS * tileWidth;
        return canvas.toBuffer();
    }

    toInstructionPdf() {
        return []
    }

    toGamePdf() {
        let _this = this;
        let pdfIns = [
            {
                type: PdfObjectType.TEXT,
                text: "Testing: ",
            },
            {
                type: PdfObjectType.VECTOR,
                callback: async (doc) => {
                    console.log("In cb")
                    const imageData = _this.generateCrossWordImage(doc, false);
                    console.log(imageData);
                    doc.image(imageData, calculateCenterX(doc, this.crossWordImageWidth));
                }
            }
        ];

        for(let i = 0; i < this.horizontalClues.length; i++) {
            console.log(`Question: ${this.horizontalClues[i]}`)
            pdfIns.push({
                "type": PdfObjectType.BR
            })
            pdfIns.push({
                "type": PdfObjectType.TEXT,
                "text": `Question: ${this.horizontalClues[i].question}`
            })
        }
        return pdfIns
    }
}


export default Crossword;