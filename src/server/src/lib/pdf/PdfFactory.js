import WritableBufferStream from "./WrittableBufferStream";
import {
    createDoc
} from "./pdfHelpers";
import PdfObjectType from "../enums/PdfObjectType";
import {
    sortObjectKeyByOrder,
    isObject
} from "../helperFunctions";
import {
    sendPdf
} from "../../gamegen/core";

class PdfFactory {
    writeStream = null;
    doc = null;
    propsOrder = ['font', 'fillColor', 'imagePath', 'vectorPath', 'callback', 'text'];
    propsMap = null;
    asyncQueue = []

    constructor(response) {
        this.writeStream = new WritableBufferStream();
        this.doc = createDoc(this.writeStream);
        this.propsMap = {
            'font': (fontPath) => {
                this.doc.font(fontPath)
            },
            'fillColor': (color) => {
                this.doc.fillColor(color)
            },
            'imagePath': (path, options) => {
                this.doc.image(path, options)
            },
            'text': (text, options) => {
                this.doc.text(text, options);
            },
            "vectorPath": (pathString) => {
                this.doc.path(pathString).stroke();
            },
            "callback": async (func) => {
                await func(this.doc);
            }
        }
        
        this.writeStream.on('finish', async () => {
            console.log("OLD")
            sendPdf(this.response, this.writeStream.toBuffer())
        })

        this.response = response

    }

    async buildStep(ins) {
        // Text always has to be last
        const keys = sortObjectKeyByOrder(ins, this.propsOrder);
        for (const key of keys) {
            if (key in this.propsMap && this.propsMap[key] instanceof Function) {
                const res = await this.propsMap[key](ins[key], ins.options)
            }
        }
        console.log("BYEE ", ins)
    }

    buildLineBreak(ins) {
        this.doc.moveDown(ins.space || undefined);
    }

    parseStep(step) {
        switch (step.type) {
            case PdfObjectType.BR:
                delete step['type'];
                this.buildLineBreak(step);
                break;
            case PdfObjectType.IMAGE:
            case PdfObjectType.TEXT:
            case PdfObjectType.VECTOR:
                delete step['type'];
                console.log("Parsing")
                this.buildStep(step);
                break;
        }
    }

    append(buildSteps) {
        if (Array.isArray(buildSteps)) {
            buildSteps.forEach((step) => this.parseStep(step))
        } else if (isObject(buildSteps)) {
            this.parseStep(buildSteps)
        }
    }

    async build() {
        console.log("End")
        this.doc.end();
    }
}

export default PdfFactory;