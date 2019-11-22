import PdfFactory from '../lib/pdf/PdfFactory';
import StorylineEnum from '../lib/enums/Storyline';
import CipherWheel from '../puzzles/cipherwheel';
import Lock from '../puzzles/lock';
import TicketGenerator from './TicketGenerator';
import GameGenerator from './GameGenerator';
import Wordsearch from '../puzzles/wordsearch';
import Crossword from '../puzzles/crossword';
import {
    extractActions
} from '../storyline/Storyline';

export function validateInputData() {

}

export function validateStorylinePayload(data) {
    const {
        title,
        opening,
        quest,
        ending,
        difficultyLevel
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

    if (!difficultyLevel) {
        throw `Missing info: difficultyLevel`
    }
    let actionTypes = extractActions(data);
    console.log("Received: ", data)
    console.log("Actions: ", actionTypes)
    let minActionCount = 2
    if (actionTypes.length < minActionCount) {
        throw `Missing actions. Need at least ${minActionCount} actions`
    }
}

export async function gameGenerate(archive, data) {
    const pdfFactory = new PdfFactory();

    try {
        const gameGenerator = new GameGenerator(data);
        await gameGenerator.generate();
        const gameBuilder = new PdfFactory();
        const insBuilder = new PdfFactory();
        await gameBuilder.append(gameGenerator.toGamePdf());
        // await gameBuilder.append(await new Wordsearch(["hello", "quan", "this", "works"], false).toGamePdf());
        // await gameBuilder.append(await new Crossword(data1).toGamePdf())

        // await pdfFactory.append(gameGenerator.toInstructionPdf());
        return new Promise(async (resolve, reject) => {
            try {
                //     pdfFactory.append(await new TicketGenerator("Congrats! You won 1% bonus point for the next quiz").toGamePdf());
                await gameBuilder.build(async (pdf) => {
                    archive.append(pdf, {
                        name: `game.pdf`
                    });
                    await insBuilder.append(gameGenerator.toInstructionPdf());
                    await insBuilder.build((pdf) => {
                        archive.append(pdf, {
                            name: `instruction.pdf`
                        });
                        resolve(archive);
                    });
                });
            } catch (err) {
                reject(err)
            }

        });

    } catch (e) {
        throw new Error(e.message);
    }
    // return ;


}

export function sendPdf(res, buffer) {
    res.append('Content-Length', buffer.length);
    res.append('Content-Type', 'application/pdf')
    res.status(200).send(buffer);
}