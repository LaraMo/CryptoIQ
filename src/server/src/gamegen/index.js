import express from 'express';
import {
    validateVocabularyPayload,
    gameGenerate,
    sendPdf
} from './core';
import {
    createDoc,
    addText
} from '../lib/pdf/pdfHelpers';
import WritableBufferStream from '../lib/pdf/WrittableBufferStream';
import * as archiver from "archiver";  
import { insertErrorLog } from '../db/helpers';


const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        const {vocalbulary} = req.body;
        validateVocabularyPayload(vocalbulary)
        const archive = archiver.create("zip");
        archive.on("error", (e) => {
            throw new Error(e.message);
        });
        res.setHeader('Content-Type', 'application/zip');
        res.attachment(`cryptiq-${Date.now()}.zip`);    
        archive.pipe(res);        
        const archiveMaterials = await gameGenerate(archive, req.body);
        archiveMaterials.finalize();
    } catch (e) {
        console.log(e);
        insertErrorLog({
            createdAt: Date.now(),
            message: e,
            traceback: e.stack,  
        })
        res.status(500).json({
            "result": "There was an error",
        })
    }
})

export default router