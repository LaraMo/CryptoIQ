import PdfObjectType from '../../lib/enums/PdfObjectType';
import path from 'path';
import fs from 'fs';
import probe from 'probe-image-size';
import {
    drawImageWithRotation,
    calculateCenterX
} from '../../lib/pdf/pdfHelpers'
import {
    createCanvas,
    loadImage,
} from 'canvas';
import {
    drawImageRotated,
    degToRad,
    drawGrid,
    styleDefault
} from '../../lib/pdf/canvasHelpers'

const Difficulty = {
    "EASY": "EASY",
    "HARD": "HARD"
}

class CipherWheel {
    alphabet = []
    startCode = [];
    innerWheel = [];
    encodedMessage = '';
    message = '';
    difficulty = Difficulty.EASY;
    imageBuffer = "";
    gamePdf = []
    insPdf = []

    constructor(message, difficulty, showStartingCode = false, showBanner = true) {
        this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        this.startCode = this.getRandomEncoder();
        this.encodedMessage = this.encodeMessage(message, this.alphabet, this.innerWheel);
        this.message = message;

        this.difficulty = difficulty || this.difficulty;
        this._showStartingCode = showStartingCode;
        this._showBanner = showBanner;
    }

    async generate() {
        this.gamePdf = [
            ...this.getBanner(),
            {
                type: PdfObjectType.BR,
            }
        ];
        if (this._showStartingCode) {
            this.gamePdf.push(this.getWordGridIns([this.startCode]));
        }
        this.gamePdf = [...this.gamePdf, 
            {
                type: PdfObjectType.BR,
            },
            ...await this.getCipherWheelIns(),
            {
                type: PdfObjectType.BR,
            },
        ]

        this.gamePdf = [...this.gamePdf, {
                type: PdfObjectType.BR,
            },
            this.getWordGridIns([this.encodedMessage.split('')]),
            {
                type: PdfObjectType.BR,
            },
        ]
        // Generate instruction PDF
        this.insPdf = [
            ...this.getBanner(),
            ...(() => {
                if(this._showBanner) {
                    return [
                        {
                            type: PdfObjectType.BR
                        },
                        {
                            type: PdfObjectType.TEXT,
                            text: `To solve this puzzle, the student would have to:`,
                        },
                        {
                            type: PdfObjectType.TEXT,
                            text: `1. Track the starting code on the cipherwheel, first letter for the inner ring, the other for the outer ring`,
                        },
                        {
                            type: PdfObjectType.TEXT,
                            text: `2. Follow the clue on the inner ring and write down the outer letters`,
                        },
                        {
                            type: PdfObjectType.TEXT,
                            text: `3. Combine the letters to find the hidden word`,
                        },
                        {
                            type: PdfObjectType.BR
                        }
                    ]
                } else {
                    return []
                }
            })(),
            ...await this.getCipherWheelIns(),{
                type: PdfObjectType.BR,
            },
            this.getWordGridIns([this.encodedMessage.split('')])
        ];

        this.insPdf = [...this.insPdf, {
            type: PdfObjectType.BR,
        },
        {
            type: PdfObjectType.TEXT,
            text: `Word to solve for: ${this.message}`,
            options: {
                "align": "center",
            }
        },
        {
            type: PdfObjectType.TEXT,
            text: `Starting Code: ${this.startCode}`,
            options: {
                "align": "center",
            }
        },
        {
            type: PdfObjectType.BR,
        }]
    }

    getRandomEncoder() {
        let min = 0;
        let max = 25;
        const pos1 = Math.floor(Number(Math.random()) * (max - min)) + min;
        var pos2 = Math.floor(Number(Math.random()) * (max - min)) + min;

        while (pos1 === pos2) {
            pos2 = Math.floor(Number(Math.random()) * (max - min)) + min;
        }

        this.posDiff = pos2 - pos1;
        this.innerWheel = this.createInnerWheel(this.posDiff);
        return [this.alphabet[pos1], this.alphabet[pos2]];
    }

    createInnerWheel(diff) {
        let result = [];
        if (diff > 0) {
            let i = diff,
                j = 0;
            while (i < this.alphabet.length || j < this.alphabet.length) {
                let offset = i >= this.alphabet.length ? Math.abs(i - 26) : i;
                result[j] = this.alphabet[offset];
                i++, j++;
            }
        } else {
            let i = diff + 26,
                j = 0;
            while (i < this.alphabet.length || j < this.alphabet.length) {
                let offset = i >= this.alphabet.length ? Math.abs(i - 26) : i
                result[j] = this.alphabet[offset];
                i++, j++

            }
        }
        return result;
    }

    calculateImageRotation() {
        let degreePerDiff = 360.000 / this.alphabet.length;
        return this.posDiff * degreePerDiff;
    }

    encodeMessage(message, outerWheel, innerWheel) {
        let result = '';
        message.split('').forEach((val) => {
            if (val === ' ') {
                result += ' ';
            } else {
                let letterIndex = innerWheel.findIndex(el => el.toUpperCase() === val.toUpperCase());
                result += outerWheel[letterIndex];
            }
        })
        return result;
    }

    async renderRotatedWheelImage() {
        this.outerWheelImage = await loadImage(path.resolve("assets/", "cipher_outer_wheel.png"));
        this.innerWheelImage = await loadImage(path.resolve("assets/", "cipher_inner_wheel.png"));

        const canvas = createCanvas(this.outerWheelImage.naturalWidth, this.outerWheelImage.naturalHeight);
        const ctx = canvas.getContext('2d');


        ctx.drawImage(this.outerWheelImage, 0, 0);
        drawImageRotated(this.innerWheelImage, ctx,
            this.outerWheelImage.width / 2.0,
            this.outerWheelImage.height / 2.0,
            this.outerWheelImage.width / 2.0,
            this.outerWheelImage.height / 2.0,
            degToRad(this.calculateImageRotation())
        )
        return canvas.toBuffer();
    }

    getWordGridIns(words) {
        return {
            type: PdfObjectType.VECTOR,
            callback: (doc) => {
                // const wordGrid = [this.encodedMessage.split('')]
                let imageBuffer = drawGrid(words, true, true, true);
                doc.image(imageBuffer,
                    calculateCenterX(doc, styleDefault.cellWidth * words[0].length), doc.y, {
                        align: 'left'
                    }
                )
                console.log("WORD GRID", doc.x, doc.y, calculateCenterX(doc, styleDefault.cellWidth * words[0].length), this.preferedHeight, this.preferedHeight)
            }
        }
    }

    async getCipherWheelIns() {
        let pdfIns = [];
        this.preferedWidth = 200;
        this.preferedHeight = 200;
        this.imageBuffer = null;
        if (this.difficulty === Difficulty.EASY) {
            this.imageBuffer = await this.renderRotatedWheelImage();
            pdfIns = [...pdfIns, 
                {
                type: PdfObjectType.VECTOR,
                callback: async (doc) => {
                    if(doc.y + this.preferedHeight > doc.page.maxY()) {
                        doc.addPage()
                    // } 
                    }
                        doc.image(this.imageBuffer,
                            calculateCenterX(doc, this.preferedWidth), doc.y, {
                                fit: [this.preferedWidth, this.preferedHeight]
                            }
                        )
                    // }

                    console.log("CIPHER WHEEL IMAGE", doc.x, doc.y, calculateCenterX(doc, this.preferedWidth), this.preferedHeight, this.preferedHeight)
                }
            }]
        } else {
            pdfIns = [...pdfIns, {
                type: PdfObjectType.IMAGE,
                imagePath: path.resolve("assets/", "cipherwheel.jpg"),
                options: {
                    align: 'center',
                    valign: 'center',
                    fit: [500, 250]
                }
            }, ]
        }
        return pdfIns;
    }

    getBanner() {
        if (this._showBanner) {
            return [{
                type: PdfObjectType.IMAGE,
                imagePath: path.resolve("assets/", "cipherwheel-banner.png"),
                options: {
                    fit: [250, 250],
                    isCentered: true
                }
            }]
        } else {
            return [];
        }
    }

    toGamePdf() {
        return this.gamePdf;
    }

    toInstructionPdf() {
        return this.insPdf;
    }

    toString() {
        str = '';
        str.concat('message: ', this.message)
        str.concat('startCode: ', this.startCode);
        str.concat('innerWheel: ', this.innerWheel);
        str.concat('encodedMessage: ', this.encodedMessage);
        return str;
    }
}

export default CipherWheel;