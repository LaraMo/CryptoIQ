import PdfObjectType from '../../lib/enums/PdfObjectType';
import {
    calculateCenterX
} from '../../lib/pdf/pdfHelpers';
import {
    removeDuplicates
} from '../../lib/helperFunctions';
import {
    createCanvas
} from 'canvas';
import {
    drawGrid,
    styleDefault
} from '../../lib/pdf/canvasHelpers';

class Crossword {
    constructor(wordArray) {
        this.cols = 50;
        this.rows = 50;
        this.activeWordList = []; //keeps array of words actually placed in board
        this.acrossCount = 0;
        this.downCount = 0;
        this.EMPTYCHAR = '';
        this.GRID_HEIGHT = this.rows;
        this.GRID_WIDTH = this.cols;
        this.FIT_ATTEMPTS = 5;
        this.coordList = []
        this.wordArray = wordArray;
        this.initBoard();
        this.generateBoard();
        this.shrink();
    }

    initBoard() {
        this.grid = new Array(this.GRID_WIDTH); //create 2 dimensional array for letter this.grid
        for (var i = 0; i < this.GRID_HEIGHT; i++) {
            this.grid[i] = new Array(this.GRID_HEIGHT);
        }

        for (var x = 0; x < this.GRID_WIDTH; x++) {
            for (var y = 0; y < this.GRID_HEIGHT; y++) {
                this.grid[x][y] = {};
                this.grid[x][y].targetChar = this.EMPTYCHAR; //target character, hidden
                this.grid[x][y].indexDisplay = ''; //used to display index number of word start
                this.grid[x][y].value = '-'; //actual current letter shown on board
            }
        }
    }

    get downWords() {
        return this.activeWordList.filter(word => word.vertical)
    }

    get acrossWords() {
        return this.activeWordList.filter(word => !word.vertical)
    }

    get board() {
        return this.grid.reduce((acc, cur, i) => {
            acc.push(cur.map(cell => cell.targetChar));
            return acc;
        }, [])
    }

    suggestCoords(word) { //search for potential cross placement locations
        var c = '';
        let coordCount = [];
        coordCount = 0;
        for (let i = 0; i < word.length; i++) { //cycle through each character of the word
            for (let x = 0; x < this.GRID_HEIGHT; x++) {
                for (let y = 0; y < this.GRID_WIDTH; y++) {
                    c = word[i];
                    if (this.grid[x][y].targetChar == c) { //check for letter match in cell
                        if (x - i + 1 > 0 && x - i + word.length - 1 < this.GRID_HEIGHT) { //would fit vertically?
                            this.coordList[coordCount] = {};
                            this.coordList[coordCount].x = x - i;
                            this.coordList[coordCount].y = y;
                            this.coordList[coordCount].score = 0;
                            this.coordList[coordCount].vertical = true;
                            coordCount++;
                        }

                        if (y - i + 1 > 0 && y - i + word.length - 1 < this.GRID_WIDTH) { //would fit horizontally?
                            this.coordList[coordCount] = {};
                            this.coordList[coordCount].x = x;
                            this.coordList[coordCount].y = y - i;
                            this.coordList[coordCount].score = 0;
                            this.coordList[coordCount].vertical = false;
                            coordCount++;
                        }
                    }
                }
            }
        }
    }

    checkFitScore(word, x, y, vertical) {
        var fitScore = 1; //default is 1, 2+ has crosses, 0 is invalid due to collision

        if (vertical) { //vertical checking
            for (let i = 0; i < word.length; i++) {
                if (i == 0 && x > 0) { //check for empty space preceeding first character of word if not on edge
                    if (this.grid[x - 1][y].targetChar != this.EMPTYCHAR) { //adjacent letter collision
                        fitScore = 0;
                        break;
                    }
                } else if (i == word.length && x < this.GRID_HEIGHT) { //check for empty space after last character of word if not on edge
                    if (this.grid[x + i + 1][y].targetChar != this.EMPTYCHAR) { //adjacent letter collision
                        fitScore = 0;
                        break;
                    }
                }
                if (x + i < this.GRID_HEIGHT) {
                    if (this.grid[x + i][y].targetChar == word[i]) { //letter match - aka cross point
                        fitScore += 1;
                    } else if (this.grid[x + i][y].targetChar != this.EMPTYCHAR) { //letter doesn't match and it isn't empty so there is a collision
                        fitScore = 0;
                        break;
                    } else { //verify that there aren't letters on either side of placement if it isn't a crosspoint
                        if (y < this.GRID_WIDTH - 1) { //check right side if it isn't on the edge
                            if (this.grid[x + i][y + 1].targetChar != this.EMPTYCHAR) { //adjacent letter collision
                                fitScore = 0;
                                break;
                            }
                        }
                        if (y > 0) { //check left side if it isn't on the edge
                            if (this.grid[x + i][y - 1].targetChar != this.EMPTYCHAR) { //adjacent letter collision
                                fitScore = 0;
                                break;
                            }
                        }
                    }
                }

            }

        } else { //horizontal checking
            for (let i = 0; i < word.length; i++) {
                if (i == 0 && y > 0) { //check for empty space preceeding first character of word if not on edge
                    if (this.grid[x][y - 1].targetChar != this.EMPTYCHAR) { //adjacent letter collision
                        fitScore = 0;
                        break;
                    }
                } else if (i == word.length - 1 && y + i < this.GRID_WIDTH - 1) { //check for empty space after last character of word if not on edge
                    if (this.grid[x][y + i + 1].targetChar != this.EMPTYCHAR) { //adjacent letter collision
                        fitScore = 0;
                        break;
                    }
                }
                if (y + i < this.GRID_WIDTH) {
                    if (this.grid[x][y + i].targetChar == word[i]) { //letter match - aka cross point
                        fitScore += 1;
                    } else if (this.grid[x][y + i].targetChar != this.EMPTYCHAR) { //letter doesn't match and it isn't empty so there is a collision
                        fitScore = 0;
                        break;
                    } else { //verify that there aren't letters on either side of placement if it isn't a crosspoint
                        if (x < this.GRID_HEIGHT) { //check top side if it isn't on the edge
                            if (this.grid[x + 1][y + i].targetChar != this.EMPTYCHAR) { //adjacent letter collision
                                fitScore = 0;
                                break;
                            }
                        }
                        if (x > 0) { //check bottom side if it isn't on the edge
                            if (this.grid[x - 1][y + i].targetChar != this.EMPTYCHAR) { //adjacent letter collision
                                fitScore = 0;
                                break;
                            }
                        }
                    }
                }

            }
        }

        return fitScore;
    }

    placeWord(word, clue, x, y, vertical) { //places a new active word on the board
        var wordPlaced = false;

        if (vertical) {
            if (word.length + x < this.GRID_HEIGHT) {
                for (let i = 0; i < word.length; i++) {
                    this.grid[x + i][y].targetChar = word[i];
                }
                wordPlaced = true;
            }
        } else {
            if (word.length + y < this.GRID_WIDTH) {
                for (let i = 0; i < word.length; i++) {
                    this.grid[x][y + i].targetChar = word[i];
                }
                wordPlaced = true;
            }
        }

        if (wordPlaced) {
            var currentIndex = this.activeWordList.length;
            this.activeWordList[currentIndex] = {};
            this.activeWordList[currentIndex].word = word;
            this.activeWordList[currentIndex].clue = clue;
            this.activeWordList[currentIndex].x = x;
            this.activeWordList[currentIndex].y = y;
            this.activeWordList[currentIndex].vertical = vertical;

            if (this.activeWordList[currentIndex].vertical) {
                this.downCount++;
                this.activeWordList[currentIndex].number = this.downCount;
            } else {
                this.acrossCount++;
                this.activeWordList[currentIndex].number = this.acrossCount;
            }
        }

    }

    isActiveWord(word) {
        if (this.activeWordList.length > 0) {
            for (var w = 0; w < this.activeWordList.length; w++) {
                if (word == this.activeWordList[w].word) {
                    return true;
                }
            }
        }
        return false;
    }

    displayGrid() {
        let result = "";
        var rowStr = "";
        for (var x = 0; x < this.GRID_HEIGHT; x++) {

            for (var y = 0; y < this.GRID_WIDTH; y++) {
                rowStr += "-" + this.grid[x][y].targetChar + "-";
            }
            result += ("|" + rowStr + "|") + "\n";
            rowStr = "";

        }
        console.log(result)
        console.log('across ' + this.acrossCount);
        console.log('down ' + this.downCount);
    }

    shuffleArray(array) {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }

        return array;
    }

    //for each word in the source array we test where it can fit on the board and then test those locations for validity against other already placed words
    generateBoard(seed = 0) {

        var bestScoreIndex = 0;
        var top = 0;
        var fitScore = 0;
        var startTime;

        //manually place the longest word horizontally at 0,0, try others if the generated board is too weak
        this.placeWord(this.wordArray[seed].word, this.wordArray[seed].clue, 0, 0, false);

        //attempt to fill the rest of the board 
        for (var iy = 0; iy < this.FIT_ATTEMPTS; iy++) { //usually 2 times is enough for max fill potential
            for (var ix = 1; ix < this.wordArray.length; ix++) {
                if (!this.isActiveWord(this.wordArray[ix].word)) { //only add if not already in the active word list
                    let topScore = 0;
                    bestScoreIndex = 0;

                    this.suggestCoords(this.wordArray[ix].word); //fills this.coordList and coordCount
                    this.coordList = this.shuffleArray(this.coordList.slice()); //adds some randomization

                    if (this.coordList[0]) {
                        for (let c = 0; c < this.coordList.length; c++) { //get the best fit score from the list of possible valid coordinates
                            fitScore = this.checkFitScore(this.wordArray[ix].word, this.coordList[c].x, this.coordList[c].y, this.coordList[c].vertical);
                            if (fitScore > topScore) {
                                topScore = fitScore;
                                bestScoreIndex = c;
                            }
                        }
                    }

                    if (topScore > 1) { //only place a word if it has a fitscore of 2 or higher

                        this.placeWord(this.wordArray[ix].word, this.wordArray[ix].clue, this.coordList[bestScoreIndex].x, this.coordList[bestScoreIndex].y, this.coordList[bestScoreIndex].vertical);
                    }
                }

            }
        }
        if (this.activeWordList.length < this.wordArray.length / 2) { //regenerate board if if less than half the words were placed
            seed++;
            generateBoard(seed);
        }
    }

    shrink() {
        let minRow = this.GRID_HEIGHT;
        let minCol = this.GRID_WIDTH;
        let maxRow = 0;
        let maxCol = 0;

        for (let i = 0; i < this.GRID_HEIGHT; i++) {
            for (let j = 0; j < this.GRID_WIDTH; j++) {
                if (this.grid[i][j].targetChar !== this.EMPTYCHAR) {
                    if (j < minCol) minCol = j;
                    if (j > maxCol) maxCol = j;
                    if (i < minRow) minRow = i;
                    if (i > maxRow) maxRow = i;
                }
            }
        }


        const newBoard = Array(maxRow - minRow + 1).fill([]);
        for (let i = 0; i < maxRow - minRow + 1; i++) {
            newBoard[i] = new Array(maxCol - minCol + 1).fill(undefined);
        }

        for (let i = 0, a = 0; i < this.grid.length; i++) {
            for (let j = 0, b = 0; j < this.grid[0].length; j++) {
                if (i >= minRow && i <= maxRow && j >= minCol && j <= maxCol) {
                    newBoard[a][b] = this.grid[i][j];
                    b++;
                }
            }
            if (i >= minRow && i <= maxRow) {
                a++;
            }
        }

        this.grid = newBoard;
        this.GRID_WIDTH = maxCol - minCol + 1;
        this.GRID_HEIGHT = maxRow - minRow + 1;
    }


    generateClueIns(wordList, withAnswer = false) {
        let pdfIns = [];
        for (let i = 0; i < wordList.length; i++) {
            let answer = wordList[i].word;
            let question = wordList[i].clue;
            let number = wordList[i].number;
            // pdfIns.push({
            //     "type": PdfObjectType.BR
            // })
            pdfIns.push({
                "type": PdfObjectType.TEXT,
                "text": `${number}. ${question}`
            })

            if (withAnswer) {
                pdfIns.push({
                    "type": PdfObjectType.BR
                })
                pdfIns.push({
                    "type": PdfObjectType.TEXT,
                    "text": `Answer: ${answer}`
                })
            }
        }
        return pdfIns;
    }

    generateGuideIns() {
        let pdfIns = [{
            type: PdfObjectType.TEXT,
            text: "Across"
        }];
        pdfIns = [...pdfIns, ...this.generateClueIns(this.acrossWords)]
        pdfIns.push({
            "type": PdfObjectType.BR
        })
        pdfIns = [...pdfIns, {
            type: PdfObjectType.TEXT,
            text: "Down"
        }, ...this.generateClueIns(this.downWords)]
        return pdfIns;
    }

    toInstructionPdf() {
        let pdfIns = [{
                type: PdfObjectType.IMAGE,
                imagePath: path.resolve("assets/", "crossword-banner.png"),
                options: {
                    fit: [250, 250],
                    isCentered: true
                }
            },
            {
                type: PdfObjectType.BR,
            },
            {
                type: PdfObjectType.VECTOR,
                callback: async (doc) => {
                    console.log("In cb")
                    // console.log(this.grid)
                    const imageData = drawGrid(this.board, true, true, true, this.activeWordList);
                    doc.image(imageData, calculateCenterX(doc, styleDefault.cellWidth * this.GRID_WIDTH));
                }
            },
            ...this.generateGuideIns()
        ];
        return pdfIns
    }

    toGamePdf() {
        let pdfIns = [{
                type: PdfObjectType.IMAGE,
                imagePath: path.resolve("assets/", "crossword-banner.png"),
                options: {
                    fit: [250, 250],
                    isCentered: true
                }
            },
            {
                type: PdfObjectType.BR,
            },
            {
                type: PdfObjectType.VECTOR,
                callback: async (doc) => {
                    console.log(this.grid)
                    const imageData = drawGrid(this.board, false, true, true, this.activeWordList);
                    doc.image(imageData, calculateCenterX(doc, styleDefault.cellWidth * this.GRID_WIDTH));
                }
            },
            ...this.generateGuideIns()
        ];
        return pdfIns
    }
}


export default Crossword;