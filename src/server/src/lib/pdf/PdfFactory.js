import WritableBufferStream from './WrittableBufferStream';
import {createDoc, calculateCenterX} from './pdfHelpers';
import PdfObjectType from '../enums/PdfObjectType';
import {sortObjectKeyByOrder, isObject} from '../helperFunctions';
import probe from 'probe-image-size';
import fs from 'fs';

class PdfFactory {
  writeStream = null;
  doc = null;
  propsOrder = [
    'fontSize',
    'fillColor',
    'imagePath',
    'vectorPath',
    'callback',
    'text',
  ];
  propsMap = null;

  constructor() {
    this.writeStream = new WritableBufferStream();
    this.doc = createDoc(this.writeStream);
    this.cbQueue = [];
    this.propsMap = {
      fontSize: size => {
        this.previousSize = this.doc._fontSize;
        return this.doc.fontSize(size);
      },
      font: fontPath => {
        return this.doc.font(fontPath);
      },
      fillColor: color => {
        return this.doc.fillColor(color);
      },
      imagePath: (path, options) => {
        const data = fs.readFileSync(path)
        const metadata = probe.sync(data);
        let imgHeight = metadata.height;
        let {x, y, isCentered, fit} = options;
        if (isCentered && fit) {
          x = calculateCenterX(this.doc, fit[0]);
        } else {
          x = x || this.doc.x;
        }
        y = y || this.doc.y;
        if (
          imgHeight +
            this.doc.y >
            this.doc.page.maxY()
        ) {
            this.doc.addPage();
            y = this.doc.page.margins.top
        }

        return this.doc.image(path, x, y, options);
      },
      text: (text, options) => {
        return this.doc.text(text, options);
      },
      vectorPath: pathString => {
        this.doc.path(pathString).stroke();
      },
      callback: async func => {
        if (this.doc.y > this.doc.page.maxY()) {
          this.doc.addPage();
          this.doc.y = this.doc.page.margins.top
        }
        await func(this.doc);
      },
    };

    this.writeStream.on('finish', async () => {
      this.pdfBuffer = this.writeStream.toBuffer();
      for (let i = 0; i < this.cbQueue.length; i++) {
        await this.cbQueue[i](this.pdfBuffer);
      }
    });

    this.applyDefaultSettings();
  }

  applyDefaultSettings() {
    this.doc.font('Helvetica');
    this.doc.fontSize(12);
  }

  async buildStep(ins) {
    // Text always has to be last
    const keys = sortObjectKeyByOrder(ins, this.propsOrder);
    for (const key of keys) {
      if (key in this.propsMap && this.propsMap[key] instanceof Function) {
        await this.propsMap[key](ins[key], ins.options);
      }
    }
  }

  buildLineBreak(ins) {
    this.doc.moveDown(ins.space || undefined);
  }

  async parseStep(step) {
    if (step) {
      switch (step.type) {
        case PdfObjectType.BR:
          delete step['type'];
          this.buildLineBreak(step);
          break;
        case PdfObjectType.IMAGE:
        case PdfObjectType.TEXT:
        case PdfObjectType.VECTOR:
          delete step['type'];
          await this.buildStep(step);
          break;
      }
    }
  }

  async append(buildSteps) {
    if (Array.isArray(buildSteps)) {
      buildSteps.forEach(async step => await this.parseStep(step));
    } else if (isObject(buildSteps)) {
      this.parseStep(buildSteps);
    }
  }

  async build(cb) {
    this.cbQueue.push(cb);
    this.doc.end();
    return this.pdfBuffer;
  }
}

export default PdfFactory;
