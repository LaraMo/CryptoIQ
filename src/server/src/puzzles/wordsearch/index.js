import wordsearch from 'wordsearch';
import {drawGrid, styleDefault} from '../../lib/pdf/canvasHelpers';
import path from 'path';
import PdfObjectType from '../../lib/enums/PdfObjectType';
import {calculateCenterX} from '../../lib/pdf/pdfHelpers';
class Wordsearch {
  constructor(words, isEasy, isFirstPuzzle) {
    this._words = words.sort((a, b) => b.length - a.length);
    if (isEasy)
      this._wordsearch = wordsearch(
        words,
        this._words[0].length + 2,
        this._words[0].length + 2,
      );
    else
      this._wordsearch = wordsearch(
        words,
        this._words[0].length + 5,
        this._words[0].length + 5,
      );

    this._solved = this._wordsearch.solved;
    this._grid = this._wordsearch.grid;
    this._unplaced = this._wordsearch.unplaced;
    this.isFirstPuzzle = isFirstPuzzle || false;
    for (let y = 0; y < this._solved.length; y++) {
      for (let x = 0; x < this._solved[0].length; x++) {
        if (this._solved[y][x] === ' ' || !this._solved[y][x]) {
          this._solved[y][x] = '*';
        }
      }
    }
  }

  /**
   * Call this method.grid for client board
   * Call this method.solved for teacher board
   */
  get Wordsearch() {
    return this._wordsearch;
  }

  async generateImage(showAnswer) {
    return await drawGrid(
      showAnswer ? this._wordsearch.solved : this._wordsearch.grid,
    );
  }

  async toGamePdf() {
    let imageBuffer;
    let pdfIns = [
      {
        type: PdfObjectType.IMAGE,
        imagePath: path.resolve('assets/', 'wordsearch-banner.png'),
        options: {
          fit: [250, 250],
          isCentered: true,
        },
      },
      {
        type: PdfObjectType.BR,
      },
      ...(() => {
        if (!this.isFirstPuzzle) {
          const toReturn = [
            {
              type: PdfObjectType.TEXT,
              text: `From the previous puzzle, find the hidden word(s)!`,
              options: {
                indent: 16,
              },
            },
          ];
          this._words.forEach(word =>
            toReturn.push({
              type: PdfObjectType.TEXT,
              text: ` - ${word}`,
              options: {
                indent: 30,
              },
            }),
          );
          return toReturn;
        }
        const toReturn = [
          {
            type: PdfObjectType.TEXT,
            text: `The student would have to find the  hidden word(s)!`,
            options: {
              indent: 16,
            },
          },
        ];
        this._words.forEach(word =>
          toReturn.push({
            type: PdfObjectType.TEXT,
            text: ` - ${word}`,
            options: {
              indent: 30,
            },
          }),
        );
        return toReturn;
      })(),
    ];
    imageBuffer = await this.generateImage(false);
    pdfIns = [
      ...pdfIns,
      {
        type: PdfObjectType.BR,
      },
      {
        type: PdfObjectType.VECTOR,
        callback: async doc => {
          doc.image(
            imageBuffer,
            calculateCenterX(doc, styleDefault.cellWidth * this._grid.length),
          );
        },
      },
      {
        type: PdfObjectType.BR,
      },
    ];
    return pdfIns;
  }

  async toInstructionPdf() {
    let imageBuffer;

    let pdfIns = [
      {
        type: PdfObjectType.IMAGE,
        imagePath: path.resolve('assets/', 'wordsearch-banner.png'),
        options: {
          fit: [250, 250],
          isCentered: true,
        },
      },
      {
        type: PdfObjectType.BR,
      },
      (() => {
        const toReturn = []
        if (!this.isFirstPuzzle) {
          toReturn.push({
            type: PdfObjectType.TEXT,
            text: `From the previous puzzle, the students have to find the hidden word(s)!`,
            options: {
              indent: 16,
            },
          });
        } else {
            toReturn.push([
                {
                  type: PdfObjectType.TEXT,
                  text: `Find the hidden word(s)!`,
                  options: {
                    indent: 16,
                  },
                },
              ]);
        }
       
        this._words.forEach(word =>
          toReturn.push({
            type: PdfObjectType.TEXT,
            text: ` - ${word}`,
            options: {
              indent: 30,
            },
          }),
        );
        return toReturn;
      })(),
      {
        type: PdfObjectType.BR,
      },
    ];
    imageBuffer = await this.generateImage(true);
    pdfIns = [
      ...pdfIns,
      {
        type: PdfObjectType.VECTOR,
        callback: async doc => {
          doc.image(
            imageBuffer,
            calculateCenterX(doc, styleDefault.cellWidth * this._grid.length),
          );
        },
      },
      {
        type: PdfObjectType.BR,
      },
    ];
    return pdfIns;
  }
}

export default Wordsearch;
