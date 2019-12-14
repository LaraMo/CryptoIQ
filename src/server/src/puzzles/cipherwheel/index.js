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

    constructor(message, difficulty, showStartingCode = false, showBanner = true) {
        this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        this.startCode = this.getRandomEncoder();
        this.encodedMessage = this.encodeMessage(message, this.alphabet, this.innerWheel);
        this.message = message;

        this.difficulty = difficulty || this.difficulty;
        this._showStartingCode = showStartingCode;
        this._showBanner = showBanner;
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

    getWordGridIns() {
        return {
            type: PdfObjectType.VECTOR,
            callback: (doc) => {
                const wordGrid = [this.encodedMessage.split('')]
                let imageBuffer = drawGrid(wordGrid, true, true, true);
                doc.image(imageBuffer,
                    calculateCenterX(doc, styleDefault.cellWidth * wordGrid[0].length), doc.y, {
                        align: 'left'
                    }
                )
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
            pdfIns = [...pdfIns, {
                type: PdfObjectType.VECTOR,
                callback: async (doc) => {
                    if(doc.y + this.preferedHeight > doc.page.height - doc.page.margins.bottom) {
                        doc.addPage()
                    }

                    doc.image(this.imageBuffer,
                        calculateCenterX(doc, this.preferedWidth), doc.y, {
                            fit: [this.preferedWidth, this.preferedHeight]
                        }
                    )

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
            return {
                type: PdfObjectType.IMAGE,
                imagePath: path.resolve("assets/", "cipherwheel-banner.png"),
                options: {
                    fit: [250, 250],
                    isCentered: true
                }
            }
        }
    }
    async toGamePdf() {
        let pdfIns = [
            this.getBanner(),
            {
                type: PdfObjectType.BR,
            }
        ];
        if (this._showStartingCode) {
            pdfIns.push({
                type: PdfObjectType.VECTOR,
                callback: async (doc) => {
                    let buffer = drawGrid([this.startCode], true, true, true, false)
                    doc.image(buffer,
                        calculateCenterX(doc, styleDefault.cellWidth * this.startCode.length), doc.y, {
                            align: 'left'
                        },
                        
                    )
                }
            });
        }
        pdfIns = [...pdfIns, {
                type: PdfObjectType.BR,
            },
            ...await this.getCipherWheelIns()
        ]

        pdfIns = [...pdfIns, {
                type: PdfObjectType.BR,
            },
            this.getWordGridIns(),
            {
                type: PdfObjectType.BR,
            },
        ]

        return pdfIns;
    }

    async toInstructionPdf() {
        let pdfIns = [
            this.getBanner(),
            {
                type: PdfObjectType.BR,
            },
            {
                type: PdfObjectType.TEXT,
                text: `Word to solve for: ${this.message}`,
            },
            {
                type: PdfObjectType.TEXT,
                text: `Starting Code: ${this.startCode}`
            }
        ];

        pdfIns = [...pdfIns, ...await this.getCipherWheelIns()]
        pdfIns.push(this.getWordGridIns())
        return pdfIns;
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