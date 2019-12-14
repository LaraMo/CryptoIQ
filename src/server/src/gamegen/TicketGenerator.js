import {
    createCanvas,
    loadImage
} from 'canvas';
import {
    styleDefault,
    wrapText
} from '../lib/pdf/canvasHelpers'
import PdfObjectType from '../lib/enums/PdfObjectType';
import path from 'path'

export default class TicketGenerator {
    constructor(message, generateNumber = true) {
        this.message = message;
        this.generateNumber = generateNumber;
        this.assetPath = path.resolve("assets/", "ticket_stub.png");
    }

    generateRandonNumber(length = 6) {
        return Math.ceil(Math.random() * Math.pow(10, length))
    }

    async generateTicket() {
        if (this.generateNumber) {
            var number = this.generateRandonNumber();
        }
        let width = 300;
        let height = 142;
        let padding = styleDefault.padding
        const canvas = createCanvas(width, height);
        const ctx = canvas.getContext('2d');
        ctx.textAlign = 'center';
        ctx.fillStyle = "red";


        let img = await loadImage(this.assetPath);
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
        let imageBuffer = await this.generateTicket();
        return [{
            type: PdfObjectType.VECTOR,
            callback: (doc) => {
                doc.image(imageBuffer);
            }
        }]
    }
}