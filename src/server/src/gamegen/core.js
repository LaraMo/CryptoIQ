import PdfFactory from '../lib/pdf/PdfFactory';
import CipherWheel from '../puzzles/cipherwheel';
import Storyline from '../storyline/Storyline'; //temp
import Lock from '../puzzles/lock';
import GameGenerator from './GameGenerator';
export function validateInputData() {

}

export async function gameGenerate(res, data) {
    const gameGenerator = new GameGenerator(data); 
    await gameGenerator.generate();
    const pdfFactory = new PdfFactory(res);
    await pdfFactory.append(gameGenerator.toGamePdf());
    const gamePdf = await pdfFactory.build();
}

export function sendPdf(res, buffer) {
    res.append('Content-Length', buffer.length);
    res.append('Content-Type', 'application/pdf')
    res.status(200).send(buffer);
}