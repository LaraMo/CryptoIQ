import PdfFactory from '../lib/pdf/PdfFactory';
import StorylineEnum from '../lib/enums/Storyline';
import CipherWheel from '../puzzles/cipherwheel';
import Lock from '../puzzles/lock';
import GameGenerator from './GameGenerator';
import Wordsearch from '../puzzles/wordsearch';
import Crossword from '../puzzles/crossword';
import { extractActions } from '../storyline/Storyline';
export function validateInputData() {

}

export function validateStorylinePayload(data) {
    const {
        title,
        opening,
        quest,
        ending
    } = data;
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
    let actionTypes = extractActions(data);
    console.log(data)
    console.log(actionTypes)
    let minActionCount = 2
    if (actionTypes.length < minActionCount) {
        throw `Missing actions. Need at least ${minActionCount} actions`
    }
}

export async function gameGenerate(res, data) {
    // const gameGenerator = new GameGenerator(data); 
    // await gameGenerator.generate();
    let data1 = [{
            word: "placebo",
            clue: "How do you spell answer?"
        },
        {
            word: "cathatic",
            clue: "How do you spell ans?"
        },
        {
            word: "psychology",
            clue: "What do you want to be?"
        },
        {
            word: "freudian",
            clue: "What sound?"
        },
        {
            word: "conscious",
            clue: "Definition of conscious"
        }
    ]
    const pdfFactory = new PdfFactory(res);
    await pdfFactory.append(await new Wordsearch(["hello", "quan", "this", "works"], false).toInstructionPdf())
    await pdfFactory.append(await new Crossword(data1).toInstructionPdf())
    // await pdfFactory.append(gameGenerator.toGamePdf());
    const gamePdf = await pdfFactory.build();
}

export function sendPdf(res, buffer) {
    res.append('Content-Length', buffer.length);
    res.append('Content-Type', 'application/pdf')
    res.status(200).send(buffer);
}