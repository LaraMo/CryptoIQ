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
    loadImage
} from 'canvas';
import {
    drawImageRotated,
    degToRad
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
    difficulty = Difficulty.HARD;
    imageBuffer = "";

    constructor(message, difficulty) {
        this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        this.startCode = this.getRandomEncoder();
        this.encodedMessage = this.encodeMessage(message, this.alphabet, this.innerWheel);
        this.message = message;

        this.difficulty = difficulty || this.difficulty;
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
        const canvas = createCanvas(300, 300);
        const ctx = canvas.getContext('2d');

        const outerWheelImage = await loadImage(path.resolve("assets/", "cipher_outer_wheel.png"));
        const innerWheelImage = await loadImage(path.resolve("assets/", "cipher_inner_wheel.png"));

        ctx.drawImage(outerWheelImage, 0, 0);
        drawImageRotated(innerWheelImage, ctx,
            outerWheelImage.width / 2.0,
            outerWheelImage.height / 2.0,
            outerWheelImage.width / 2.0,
            outerWheelImage.height / 2.0,
            degToRad(this.calculateImageRotation())
        )
        return canvas.toBuffer();
    }

    async toGamePdf() {
        let height = 20;
        let width = 20;
        let pdfIns = [
            {
                type: PdfObjectType.BR,
            },
        ];

        this.imageBuffer = null;
        if (this.difficulty === Difficulty.HARD) {
            this.imageBuffer = await this.renderRotatedWheelImage();
            pdfIns = [...pdfIns, {
                type: PdfObjectType.VECTOR,
                callback: async (doc) => {
                    // console.log(calculateCenterX(doc, 500));
                    doc.image(this.imageBuffer,
                        calculateCenterX(doc, 130),
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

        pdfIns = [...pdfIns, {
                type: PdfObjectType.BR,
            },
            {
                type: PdfObjectType.VECTOR,
                callback: (doc) => {
                    let fontSize = 8;
                    let xOffset = calculateCenterX(doc, width * this.encodeMessage.length);
                    let xRect = doc.x + xOffset;
                    // for (let i = 0; i < this.encodedMessage.length; i++) {
                    //     let yRect = doc.y;
                    //     doc.fontSize(12).text(this.encodedMessage[i], xRect + width / 2 - fontSize / 2, yRect, {
                    //         continue: true,
                    //         lineBreak: false
                    //     });
                    //     doc.rect(xRect, doc.y - height / 2 + fontSize / 2, width, height).stroke();
                    //     xRect += width;
                    // }
                    // doc.text("\n wtf", {
                    //     continue: false,
                    //     lineBreak: true
                    // })
                    // doc.moveDown(5);
                }
            },
            {
                type: PdfObjectType.BR,
            },
        ]

        return pdfIns;
    }

    toInstructionPdf() {
        return [{
            type: PdfObjectType.TEXT,
            text: "For the teacher:",
        },
        {
            type: PdfObjectType.TEXT,
            text: `Word: ${this.message}`,
        },
        {
            type: PdfObjectType.TEXT,
            text: `Starting Code: ${this.startCode}`
        },
       ];
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