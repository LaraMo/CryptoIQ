import express from 'express';
import {
    gameGenerate,
    sendPdf
} from './core';
import {
    createDoc,
    addText
} from './pdfHelpers';
import WritableBufferStream from './WrittableBufferStream';

const router = express.Router();

function validateRequest(req) {
    return true;
}

function test(res) {
    const writeStream = new WritableBufferStream();
    let doc = createDoc(writeStream);
    writeStream.on('finish', () => {
        sendPdf(res, writeStream.toBuffer())
    });
    addText(doc, "Hello, World!", 100, 100)
    doc.end();
}

router.post('/', (req, res, next) => {
    try {
        // validateRequest(req);
        // gameGenerate();
        test(res);
    } catch (e) {
        console.log(e)
        res.status(500).json({
            "result": "There was an error",
        })
    }
})

export default router;