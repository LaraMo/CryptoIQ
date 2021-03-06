import PdfFactory from '../lib/pdf/PdfFactory';
import StorylineEnum from '../lib/enums/Storyline';
import CipherWheel from '../puzzles/cipherwheel';
import Lock from '../puzzles/lock';
import TicketGenerator from './TicketGenerator';
import GameGenerator from './GameGenerator';
import Wordsearch from '../puzzles/wordsearch';
import Crossword from '../puzzles/crossword';
import {extractActions} from '../storyline/Storyline';
import _ from 'lodash';

export function validateVocabularyPayload(data) {
  const {maxNumberOfWords, words} = data;

  if (!_.isArray(words)) {
    throw `Invalid info: words is not an array`;
  } else if (maxNumberOfWords != words.length) {
    throw `Invalid info: words array does not match count`;
  } else {
    words.forEach(word => {
      if (!'wordsEntered' in word) {
        throw `Missing info: wordsEntered`;
      }

      if (!'pageNumberEntered' in word) {
        throw `Missing info: pageNumberEntered`;
      }

      if (!'definitionsEntered' in word) {
        throw `Missing info: definitionsEntered`;
      }
    });
  }
}

export function validateStorylinePayload(data) {
  const {title, opening, quest, ending, difficultyLevel} = data;
  if (!title) {
    throw `Missing info: title`;
  }
  if (!opening) {
    throw `Missing info: opening`;
  }
  if (!quest) {
    throw `Missing info: quest`;
  }
  if (!ending) {
    throw `Missing info: ending`;
  }

  if (!difficultyLevel) {
    throw `Missing info: difficultyLevel`;
  }
  let actionTypes = extractActions(data);
  let minActionCount = 2;
  if (actionTypes.length < minActionCount) {
    throw `Missing actions. Need at least ${minActionCount} actions`;
  }
}

export async function gameGenerate(archive, data) {
  const gameGenerator = new GameGenerator(data);
  try { 
    await gameGenerator.generate();
  } catch(e) {
    throw e
  }

  const gameBuilder = new PdfFactory();
  const insBuilder = new PdfFactory();

  const {generate} = data;
  if (!generate || generate === 'zip') {
    await gameBuilder.append(gameGenerator.toGamePdf());
    await insBuilder.append(gameGenerator.toInstructionPdf());

    return new Promise(async (resolve, reject) => {
      try {
        await gameBuilder.build(async pdf => {
          archive.append(pdf, {
            name: `game.pdf`,
          });
          await insBuilder.build(async pdf => {
            archive.append(pdf, {
              name: `instruction.pdf`,
            });
            resolve(archive);
          });
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  if (!!generate && generate === 'gamePdf') {
    await gameBuilder.append(gameGenerator.toGamePdf());
    return new Promise(async (resolve, reject) => {
      try {
        await gameBuilder.build(async pdf => {
          resolve(pdf);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
  if (!!generate && generate === 'insPdf') {
    await insBuilder.append(gameGenerator.toInstructionPdf());
    return new Promise(async (resolve, reject) => {
      try {
        await insBuilder.build(async pdf => {
          resolve(pdf);
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export function sendPdf(res, buffer) {
  res.append('Content-Length', buffer.length);
  res.append('Content-Type', 'application/pdf');
  res.status(200).send(buffer);
}
