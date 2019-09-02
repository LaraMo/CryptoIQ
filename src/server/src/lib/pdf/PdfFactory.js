import WritableBufferStream from "./WrittableBufferStream";
import {
    createDoc
} from "./pdfHelpers";
import PdfObjectType from "../enums/PdfObjectType";
import {
    sortObjectKeyByOrder
} from "../helperFunctions";
import {
    sendPdf
} from "../../gamegen/core";

class PdfFactory {
    writeStream = null;
    doc = null;
    propsOrder = ['font', 'fillColor', 'imagePath', 'vectorPath', 'callback', 'text'];
    propsMap = null;

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
            "callback": (func) => {
                func(this.doc);
            }
        }
        this.writeStream.on('finish', () => {
            sendPdf(response, this.writeStream.toBuffer())
        })

    }

    buildText(ins) {
        // Text always has to be last
        const keys = sortObjectKeyByOrder(ins, this.propsOrder);
        keys.forEach(key => {
            if (key in this.propsMap && this.propsMap[key] instanceof Function) {
                this.propsMap[key](ins[key], ins.options)
            }
        })
    }

    buildImage(ins) {
        const keys = sortObjectKeyByOrder(ins, this.propsOrder);
        keys.forEach(key => {
            if (key in this.propsMap && this.propsMap[key] instanceof Function) {
                this.propsMap[key](ins[key], ins.options)
            }
        })
    }

    buildLineBreak(ins) {
        this.doc.moveDown(ins.space || undefined);
    }

    buildVector(ins) {
        const keys = sortObjectKeyByOrder(ins, this.propsOrder);
        keys.forEach(key => {
            if (key in this.propsMap && this.propsMap[key] instanceof Function) {
                this.propsMap[key](ins[key])
            }
        })
    }

    parseStep(step) {
        switch (step.type) {
            case PdfObjectType.BR:
                delete step['type'];
                this.buildLineBreak(step);
                break;
            case PdfObjectType.IMAGE:
                delete step['type'];
                this.buildImage(step);
                break;
            case PdfObjectType.TEXT:
                delete step['type'];
                this.buildText(step);
                break;
            case PdfObjectType.VECTOR:
                delete step['type'];
                this.buildVector(step);
                break;
        }
    }

    append(buildSteps) {
        if (Array.isArray(buildSteps)) {
            buildSteps.forEach((step) => this.parseStep(step))
        } else if (Object.isObject(buildSteps)) {
            this.parseStep(buildSteps)
        }
    }

    build() {
        this.doc.end();
    }
}

export default PdfFactory;