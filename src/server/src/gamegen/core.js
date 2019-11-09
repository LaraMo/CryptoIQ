import PdfFactory from '../lib/pdf/PdfFactory';
import CipherWheel from '../puzzles/cipherwheel';
import Storyline from '../storyline/Storyline'; //temp
import Lock from '../puzzles/lock';
import GameGenerator from './GameGenerator';
import Wordsearch from '../puzzles/wordsearch';
import Crossword from '../puzzles/crossword';
export function validateInputData() {

}

export async function gameGenerate(res, data) {
    // const gameGenerator = new GameGenerator(data); 
    // await gameGenerator.generate();
    let data1 =[
        {
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
    await pdfFactory.append(await new Wordsearch(["hello","quan", "this", "works"], false).toInstructionPdf())
    await pdfFactory.append(await new Crossword(data1).toInstructionPdf())
    // await pdfFactory.append(gameGenerator.toGamePdf());
    const gamePdf = await pdfFactory.build();
}

export function sendPdf(res, buffer) {
    res.append('Content-Length', buffer.length);
    res.append('Content-Type', 'application/pdf')
    res.status(200).send(buffer);
}