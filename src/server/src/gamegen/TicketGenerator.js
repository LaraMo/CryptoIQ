import {
    createCanvas,
    loadImage
} from 'canvas';
import path from 'path'
import {
    styleDefault,
    wrapText
} from '../lib/pdf/canvasHelpers'
import PdfObjectType from '../lib/enums/PdfObjectType';

export default class TicketGenerator {
    constructor(message, generateNumber = true) {
        this.message = message;
        this.generateNumber = generateNumber;
        this.assetPath = path.resolve("assets/", "ticket_stub.png");
        this.preferedHeight = 142
        this.preferedWidth = 300
    }

    generateRandonNumber(length = 6) {
        return Math.ceil(Math.random() * Math.pow(10, length))
    }

    async generateTicket() {
        if (this.generateNumber) {
            var number = this.generateRandonNumber();
        }
        const width = this.preferedWidth;
        const height = this.preferedHeight;
        const {padding} = styleDefault
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        ctx.textAlign = 'center';
        ctx.fillStyle = "red";


        const img = await loadImage(this.assetPath);
        ctx.drawImage(img, styleDefault.padding / 2.0, styleDefault.padding / 2.0, width - padding / 2.0, height - padding / 2.0);
        if (number) {
            var top = height / 3.5;
            ctx.font = `20px "Courier New", Courier, monospace`
            ctx.fillText(number, width / 2, top)
        }
        top = top || 0;
        ctx.font = `12px "Courier New", Courier, monospace`
        wrapText(ctx, this.message, width / 2, height / 2.2, width / 1.4, height / 5)


        return canvas.toBuffer();
    }

    async toInstructionPdf() {
        const imageBuffer = await this.generateTicket();
        return [{
            type: PdfObjectType.VECTOR,
            callback: (doc) => {
                if(doc.y + this.preferedHeight > doc.page.maxY()) {
                    doc.addPage();
                    doc.y = doc.page.margins.top
                }
                doc.image(imageBuffer, doc.x, doc.y, {
                    align: 'center',
                    valign: 'center',
                    isCentered: true,
                  });
            }
        }]
    }
}