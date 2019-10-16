import express from 'express';
import {
    gameGenerate,
    sendPdf
} from './core';
import {
    createDoc,
    addText
} from '../lib/pdf/pdfHelpers';
import WritableBufferStream from '../lib/pdf/WrittableBufferStream';

const router = express.Router();

router.post('/', (req, res, next) => {
    try {
        // validateRequest(req);
        // console.log(req.body)
        gameGenerate(res, req.body);
    } catch (e) {
        console.log(e)
        res.status(500).json({
            "result": "There was an error",
        })
    }
})

export default router;