import PdfObjectType from '../../lib/enums/PdfObjectType'; //TODO
import path from 'path';
import {calculateCenterX} from '../../lib/pdf/pdfHelpers';
import {drawGrid, styleDefault} from '../../lib/pdf/canvasHelpers';

class Lock {
  words = []; // format: {index: 0, wordsEntered: "test1", defintionsEntered: "test1", pageNumberEntered: "100"}
  constructor(
    words,
    displayWords = false,
    randomOrder = false,
    usePhysicalLock = false,
  ) {
    this.words = words;
    this.randomWords = [];
    this.lockCombo = [];
    this.isValidPageNumbers = false;
    this.isEnoughWords = false;
    this._displayWords = displayWords;
    this._randomOrder = randomOrder;
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
        modifiedPageNumbers.push('0' + pageNumber);
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
    if (this.lockCombo.length === 0) {
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
      this.lockCombo = this.processLock(randomWords_PageNumber);
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
      return [
        {
          type: PdfObjectType.TEXT,
          text: "Couldn't generate the lock game, not enough words entered!",
        },
        {
          type: PdfObjectType.IMAGE,
          imagePath: path.resolve('assets/', 'lockIcon.png'),
          options: {
            fit: [50, 50],
            align: 'center',
            valign: 'center',
          },
        },
        {
          type: PdfObjectType.BR,
        },
      ];
    } else if (!this.validatePageNumbers()) {
      return [
        {
          type: PdfObjectType.TEXT,
          text:
            "Counldn't not able to generate the lock game, please enter unique page numbers!",
        },
        {
          type: PdfObjectType.IMAGE,
          imagePath: path.resolve('assets/', 'lockIcon.png'),
          options: {
            fit: [50, 50],
            align: 'center',
            valign: 'center',
          },
        },
        {
          type: PdfObjectType.BR,
        },
      ];
    } else {
      this.generateLockCombo();
      return [
        {
          type: PdfObjectType.IMAGE,
          imagePath: path.resolve('assets/', 'lock-banner.png'),
          options: {
            fit: [250, 250],
            isCentered: true,
          },
        },
        ...(() => {
          if (this._displayWords) {
            return [
              {
                type: PdfObjectType.TEXT,
                text: 'Here are your chosen words:',
              },
              {
                type: PdfObjectType.TEXT,
                text: ` -  ${this.randomWords[0]}`,
              },
              {
                type: PdfObjectType.TEXT,
                text: ` -  ${this.randomWords[1]}`,
              },
              {
                type: PdfObjectType.TEXT,
                text: ` -  ${this.randomWords[2]}`,
              },
            ];
          }
          return [];
        })(),
        {
          type: PdfObjectType.BR,
          space: 1,
        },
        {
          type: PdfObjectType.TEXT,
          text: `1. Find the proper defintion for the chosen words using the textbook/slides.`,
        },
        {
          type: PdfObjectType.TEXT,
          text: `2. Write down the page number that you found the definitions at.`,
        },
        {
          type: PdfObjectType.TEXT,
          text: `3. The words are in that order for a reason.`,
        },
        {
          type: PdfObjectType.TEXT,
          text: `4. Pay attention to the page numbers, digit by digit.`,
        },
        this._usePhysicalLock
          ? {
              type: PdfObjectType.TEXT,
              text: `Finally, enter your lock combination using the lock provided by your professor:`,
            }
          : {
              type: PdfObjectType.TEXT,
              text: `Finally, enter your lock combination here:`,
            },
        ...(() => {
          if (!this._usePhysicalLock) {
            return [
              {
                type: PdfObjectType.BR,
              },
              {
                type: PdfObjectType.IMAGE,
                imagePath: path.resolve('assets/', 'lock-vector.png'),
                options: {
                  fit: [220, 220],
                  align: 'center',
                  valign: 'center',
                  isCentered: true,
                },
              },
              {
                type: PdfObjectType.BR,
              },
            ];
          }
          return [
            {
              type: PdfObjectType.BR,
            },
          ];
        })(),
        {
          type: PdfObjectType.TEXT,
          text: 'o',
          options: {
            align: 'center',
          },
        },
        {
          type: PdfObjectType.BR,
          space: 1,
        },
      ];
    }
  }

  async toInstructionPdf() {
    if (!this.words || this.words.length < 3) {
      return [
        {
          type: PdfObjectType.TEXT,
          text: "Couldn't generate the lock game, not enough words entered!",
        },
        {
          type: PdfObjectType.IMAGE,
          imagePath: path.resolve('assets/', 'lockIcon.png'),
          options: {
            fit: [50, 50],
            align: 'center',
            valign: 'center',
          },
        },
        {
          type: PdfObjectType.BR,
        },
      ];
    } else if (!this.validatePageNumbers()) {
      return [
        {
          type: PdfObjectType.TEXT,
          text:
            "Counldn't not able to generate the lock game, please enter unique page numbers!",
        },
        {
          type: PdfObjectType.IMAGE,
          imagePath: path.resolve('assets/', 'lockIcon.png'),
          options: {
            fit: [50, 50],
            align: 'center',
            valign: 'center',
          },
        },
        {
          type: PdfObjectType.BR,
        },
      ];
    } else {
      let buffer = await drawGrid([this.lockCombo], true, true, true);
      this.generateLockCombo();
      return [
        {
          type: PdfObjectType.IMAGE,
          imagePath: path.resolve('assets/', 'lock-banner.png'),
          options: {
            fit: [250, 250],
            isCentered: true,
          },
        },
        {
          type: PdfObjectType.BR,
        },
        {
          type: PdfObjectType.TEXT,
          text: 'Here are the chosen words that are used to generate the lock combination:',
        },
        {
          type: PdfObjectType.TEXT,
          text: ` -  ${this.randomWords[0]}`,
        },
        {
          type: PdfObjectType.TEXT,
          text: ` -  ${this.randomWords[1]}`,
        },
        {
          type: PdfObjectType.TEXT,
          text: ` -  ${this.randomWords[2]}`,
        },
        {
          type: PdfObjectType.BR,
        },
        (() => {
          if(this._usePhysicalLock) {
            return {
              type: PdfObjectType.TEXT,
              text: `0. Prepare the physical lock by setting the combination to: ${this.lockCombo}`
            }
          }
        })(),
        {
          type: PdfObjectType.TEXT,
          text: `1. To crack this puzzle, the student needs to the find the associated page/slide numbers with each of the above word.`
        },
        ...(() => {
          if(this._usePhysicalLock) {
            return [{
              type: PdfObjectType.TEXT,
              text: `2. If the students are able to open the lock with the correct combination, the puzzle is solved!`
            }]
          } else {
            return [{
              type: PdfObjectType.TEXT,
              text: `2. The students have to fill in the lock combination in the lock drawing`,
            },{
              type: PdfObjectType.TEXT,
              text: `3. The teacher have to verify if its the correct combination. If it's not, the students will have to restart their search!`,
            }]
          }
        })(),
        {
          type: PdfObjectType.BR,
        },
        (() => {
          if(!this._usePhysicalLock) {
            return {
              type: PdfObjectType.IMAGE,
              imagePath: path.resolve('assets/', 'lock-vector.png'),
              options: {
                fit: [220, 220],
                align: 'center',
                valign: 'center',
                isCentered: true,
                preferedHeight: 220
              }
            }
          }   
        })(),
        {
          type: PdfObjectType.BR,
        },
        {
          type: PdfObjectType.TEXT,
          text: 'The lock combination from left to right is:',
          options: {
            align: 'center'
          }
        },
        {
          type: PdfObjectType.BR,
        },
        {
          type: PdfObjectType.VECTOR,
          callback: async doc => {
            await doc.image(
              buffer,
              calculateCenterX(doc, styleDefault.cellWidth * 3),
            );
          },
        },
        {
          type: PdfObjectType.BR,
          space: 1,
        },
        {
          type: PdfObjectType.TEXT,
          text: 'o',
          options: {
            align: 'center',
          },
        },
        {
          type: PdfObjectType.BR,
          space: 1,
        },
      ];
    }
  }
}

export default Lock;
