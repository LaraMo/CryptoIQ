import PdfObjectType from '../../lib/enums/PdfObjectType'; //TODO
import path from 'path';
import {
    calculateCenterX
} from '../../lib/pdf/pdfHelpers';
import { drawGrid, styleDefault } from '../../lib/pdf/canvasHelpers';

class Lock {

    words = []; // format: {index: 0, wordsEntered: "test1", defintionsEntered: "test1", pageNumberEntered: "100"}
    constructor(words, displayWords = false, randomOrder = false, usePhysicalLock = false) {
        this.words = words;
        this.randomWords = [];
        this.lockCombo = [];
        this.isValidPageNumbers = false;
        this.isEnoughWords = false;
        this._displayWords = displayWords
        this._randomOrder = randomOrder
        this._usePhysicalLock = usePhysicalLock;
    }

    /*
     * Helper method: Choses a random word from a given array of words
     */
    getARandomWord() {
        let min = 0;
        let max = this.words.length;
        const position = Math.floor(Number(Math.random()) * (max - min)) + min;
        return this.words[position];
    }

    /**
     * Helper method: Process the lock by the following rules:
     * If page number is 1 digit --> append a 0
     * If page number is 2 digits --> stays the same
     * If page number is 3 digits --> keep the last 2 digits
     * 
     * @param {*} pageNumbers
     */
    processLock(pageNumbers) {
        let modifiedPageNumbers = [];
        for (let i = 0; i < pageNumbers.length; i++) {
            let pageNumber = pageNumbers[i];
            if (pageNumber.length === 1) {
                modifiedPageNumbers.push("0" + pageNumber);
            } else if (pageNumber.length === 3) {
                modifiedPageNumbers.push(pageNumber.substring(1, 3));
            } else {
                modifiedPageNumbers.push(pageNumber);
            }
        }
        return modifiedPageNumbers;
    }

    /**
     * Generates a lock combo (calls helper methods)
     */
    generateLockCombo() {
        if(this.lockCombo.length === 0) {
            let randomWords_PageNumber = [];

            let counter = 0;
    
            while (this.randomWords.length != 3) {
                //get a random word from the list
                let word;
                if (this._randomOrder) {
                    word = this.getARandomWord();
                } else {
                    word = this.words[counter];
                    counter++;
                }
                //make sure that this word is unique
                if (!this.randomWords.includes(word.wordsEntered)) {
                    this.randomWords.push(word.wordsEntered);
                    randomWords_PageNumber.push(word.pageNumberEntered);
                }
            }
            //Process lock
            this.lockCombo = this.processLock(randomWords_PageNumber);;
        } else {
            return this.lockCombo;
        }
        
    }

    //checks if all page numbers are unique 
    validatePageNumbers() {
        let pageNumbers = [];
        for (let i = 0; i < this.words.length; i++) {
            let wordData = this.words[i];
            if (pageNumbers.includes(wordData.pageNumberEntered)) {
                return false;
            } else {
                pageNumbers.push(this.words[i].pageNumberEntered);
            }
        }
        return true;
    }

    toGamePdf() {
        //validate if enough words
        if (!this.words || this.words.length < 3) {
            return [{
                    type: PdfObjectType.TEXT,
                    text: "Couldn't generate the lock game, not enough words entered!"
                },
                {
                    type: PdfObjectType.IMAGE,
                    imagePath: path.resolve("assets/", "lockIcon.png"),
                    options: {
                        fit: [50, 50],
                        align: 'center',
                        valign: 'center'
                    }
                },
            ]
        } else if (!this.validatePageNumbers()) {
            return [{
                    type: PdfObjectType.TEXT,
                    text: "Counldn't not able to generate the lock game, please enter unique page numbers!"
                },
                {
                    type: PdfObjectType.IMAGE,
                    imagePath: path.resolve("assets/", "lockIcon.png"),
                    options: {
                        fit: [50, 50],
                        align: 'center',
                        valign: 'center'
                    }
                },
                {
                    type: PdfObjectType.TEXT,
                    text: "____________________________________________________________________",
                },
            ]
        } else {
            this.generateLockCombo();
            return [{
                    type: PdfObjectType.IMAGE,
                    imagePath: path.resolve("assets/", "lock-banner.png"),
                    options: {
                        fit: [250, 250],
                        isCentered: true
                    }
                },
                {
                    type: PdfObjectType.BR,
                },
                ...(() => {
                    if (this._displayWords) {
                        return [{
                            type: PdfObjectType.TEXT,
                            text: 'Here are your chosen words:',
                        }, {
                            type: PdfObjectType.TEXT,
                            text: `
                            •  ${ this.randomWords[0] }
                            •  ${ this.randomWords[1] }
                            •  ${ this.randomWords[2] }`,
                        }]
                    }
                    return [];
                })(),
                {
                    type: PdfObjectType.BR,
                    space: 3
                },
                {
                    type: PdfObjectType.TEXT,
                    text: `
  ➤ Find the proper defintion for the chosen words using the textbook.
  ➤ Write down the page number that you found the defintions at. 
  ➤ The words are in that order for a reason.
  ➤ Pay attention to the page numbers, digit by digit.
  ➤ Enter your lock combination here: `,
                },
                ...(() => {
                    if (this._usePhysicalLock) {
                        return [ {
                            type: PdfObjectType.BR,
                        },
                        {
                            type: PdfObjectType.IMAGE,
                            imagePath: path.resolve("assets/", "lock-vector.png"),
                            options: {
                                fit: [220, 220],
                                align: 'center',
                                valign: 'center',
                                isCentered: true
                            }
                        },
                        {
                            type: PdfObjectType.BR,
                            space: 3
                        }]
                    }
                    return [];
                })(),
            ]
        }
    }


    toInstructionPdf() {
        if (!this.words || this.words.length < 3) {
            return [{
                    type: PdfObjectType.TEXT,
                    text: "Couldn't generate the lock game, not enough words entered!"
                },
                {
                    type: PdfObjectType.IMAGE,
                    imagePath: path.resolve("assets/", "lockIcon.png"),
                    options: {
                        fit: [50, 50],
                        align: 'center',
                        valign: 'center'
                    }
                },
            ]
        } else if (!this.validatePageNumbers()) {
            return [{
                    type: PdfObjectType.TEXT,
                    text: "Counldn't not able to generate the lock game, please enter unique page numbers!"
                },
                {
                    type: PdfObjectType.IMAGE,
                    imagePath: path.resolve("assets/", "lockIcon.png"),
                    options: {
                        fit: [50, 50],
                        align: 'center',
                        valign: 'center'
                    }
                },
                {
                    type: PdfObjectType.TEXT,
                    text: "____________________________________________________________________",
                },
            ]
        } else {
            this.generateLockCombo();
            return [{
                    type: PdfObjectType.IMAGE,
                    imagePath: path.resolve("assets/", "lock-banner.png"),
                    options: {
                        fit: [250, 250],
                        isCentered: true
                    }
                },
                {
                    type: PdfObjectType.BR,
                },
                    {
                        type: PdfObjectType.TEXT,
                        text: 'Here are the chosen words:',
                    }, {
                        type: PdfObjectType.TEXT,
                        text: `
                            •  ${ this.randomWords[0] }
                            •  ${ this.randomWords[1] }
                            •  ${ this.randomWords[2] }`,
                    },
                {
                    type: PdfObjectType.BR,
                    space: 3
                },
                {
                    type: PdfObjectType.TEXT,
                    text: `
  ➤ Find the proper defintion for the chosen words using the textbook.
  ➤ Write down the page number that you found the defintions at. 
  ➤ The words are in that order for a reason.
  ➤ Pay attention to the page numbers, digit by digit. `
                },
                {
                    type: PdfObjectType.BR,
                },
                {
                    type: PdfObjectType.IMAGE,
                    imagePath: path.resolve("assets/", "lock-vector.png"),
                    options: {
                        fit: [220, 220],
                        align: 'center',
                        valign: 'center',
                        isCentered: true
                    }
                },
                {
                    type: PdfObjectType.TEXT,
                    text: 'The Lock combination from left to right is:'
                },
                {
                    type: PdfObjectType.BR,
                },
                {
                    type: PdfObjectType.VECTOR,
                    callback: async (doc) => {
                        let buffer = await drawGrid([this.lockCombo], true, true, true)
                        doc.image(buffer, calculateCenterX(doc, styleDefault.cellWidth * 3))
                    }
                },
                {
                    type: PdfObjectType.BR,
                    space: 3
                },
            ]
        }
    }
}

export default Lock;