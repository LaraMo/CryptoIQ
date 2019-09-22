import PdfObjectType from '../../lib/enums/PdfObjectType';
import path from 'path';

class CipherWheel {
    alphabet = []
    startCode = [];
    innerWheel = [];
    encodedMessage = '';
    message = '';

    constructor(message) {
        this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        this.startCode = this.getRandomEncoder();
        this.encodedMessage = this.encodeMessage(message, this.alphabet, this.innerWheel);
        this.message = message;
    }

    getRandomEncoder() {
        let min = 0;
        let max = 25;
        const pos1 = Math.floor(Number(Math.random()) * (max - min)) + min;
        var pos2 = Math.floor(Number(Math.random()) * (max - min)) + min;

        while (pos1 === pos2) {
            pos2 = Math.floor(Number(Math.random()) * (max - min)) + min;
        }

        this.innerWheel = this.createInnerWheel(pos2 - pos1);
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

    toPdf() {
        let width = 20;
        let height = 20;

        return [{
                type: PdfObjectType.TEXT,
                text: "For the teacher:",
                fillColor: "red"
            },
            {
                type: PdfObjectType.TEXT,
                text: `Word: ${this.message}`,
                fillColor: "green"
            },
            {
                type: PdfObjectType.TEXT,
                text: `Starting Code: ${this.startCode}`
            },
            {
                type: PdfObjectType.TEXT,
                text: "---------------------------------------------------------"
            },
            {
                type: PdfObjectType.BR,
            },
            {
                type: PdfObjectType.BR,
            },
            {
                type: PdfObjectType.IMAGE,
                imagePath: path.resolve("assets/", "cipherwheel.jpg"),
                options: {
                    fit: [400, 212],
                    align: 'center',
                    valign: 'center'
                }
            },
            {
                type: PdfObjectType.BR,
            },
            {
                type: PdfObjectType.VECTOR,
                callback: (doc) => {
                    let fontSize = 12;
                    let xOffset = fontSize / 2;
                    let xRect = doc.x;
                    for (let i = 0; i < this.encodedMessage.length; i++) {
                        let yRect = doc.y;
                        doc.fontSize(12).text(this.encodedMessage[i], xRect + width / 2 - fontSize / 2, yRect, {
                            continue: true,
                            lineBreak: false
                        });
                        doc.rect(xRect, doc.y - height / 2 + fontSize / 2, width, height).stroke();
                        xRect += width;
                    }
                }
            },
            {
                type: PdfObjectType.BR,
            },
            {
                type: PdfObjectType.BR,
            },
            {
                type: PdfObjectType.TEXT,
                text: "---------------------------------------------------------"
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