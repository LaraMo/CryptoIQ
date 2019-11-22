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
import * as archiver from "archiver";  


const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        // validateRequest(req);
        // console.log(req.body)
        const archive = archiver.create("zip");
        archive.on("error", (e) => {
            throw new Error(e.message);
        });

        // res.attachment(`cryptiq-${Date.now()}.zip`);    
        res.attachment(`cryptiq.zip`);    
        archive.pipe(res);        
        const archiveMaterials = await gameGenerate(archive, req.body);
        archiveMaterials.finalize();
    } catch (e) {
        console.log(e)
        res.status(500).json({
            "result": "There was an error",
        })
    }
})

export default router