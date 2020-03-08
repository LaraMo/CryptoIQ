import express from 'express';
import {validateVocabularyPayload, gameGenerate, sendPdf} from './core';
import {createDoc, addText} from '../lib/pdf/pdfHelpers';
import WritableBufferStream from '../lib/pdf/WrittableBufferStream';
import * as archiver from 'archiver';
import {insertErrorLog} from '../db/helpers';

const router = express.Router();

const gameGenerateRes = async (req, res) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.attachment(`cryptiq-game-${Date.now()}.pdf`);
  const pdf = await gameGenerate(null, req.body);
  res.status(200).send(pdf);
};

const zipGenerate = async (req, res) => {
  const archive = archiver.create('zip');
  archive.on('error', e => {
    throw new Error(e.message);
  });

  res.setHeader('Content-Type', 'application/zip');
  res.attachment(`cryptiq-${Date.now()}.zip`);
  archive.pipe(res);
  const archiveMaterials = await gameGenerate(archive, req.body);
  archiveMaterials.finalize();
};

const insGenerate = async (req, res) => {
  res.setHeader('Content-Type', 'application/pdf');
  res.attachment(`cryptiq-ins-${Date.now()}.pdf`);
  const pdf = await gameGenerate(null, req.body);
  res.status(200).send(pdf);
};

router.post('/', async (req, res, next) => {
  try {
    const {vocalbulary} = req.body;
    validateVocabularyPayload(vocalbulary);
    const {generate} = req.body;

    if (!generate && generate === 'zip') {
      await zipGenerate(req, res);
    } else if (!!generate && generate === 'gamePdf') {
      await gameGenerateRes(req, res);
    } else if (!!generate && generate === 'insPdf') {
      await insGenerate(req, res);
    }
  } catch (e) {
    console.log(e);
    insertErrorLog({
      createdAt: Date.now(),
      message: e,
      traceback: e.stack,
    });
    res.status(500).json({
      result: 'There was an error',
    });
  }
});

export default router;
