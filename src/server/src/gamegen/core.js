import PdfFactory from '../lib/pdf/PdfFactory';
import CipherWheel from '../puzzles/cipherwheel';
import Storyline from '../storyline/Storyline'; //temp
import Lock from '../puzzles/lock';
export function gameGenerate(res, data) {
    const pdfFactory = new PdfFactory(res);
    const cipherWheel = new CipherWheel('JUST TESTING');
    const lock = new Lock(data);
    pdfFactory.append(lock.toGamePdf());
    pdfFactory.append(cipherWheel.toPdf());
    pdfFactory.append(lock.toGamePdf());

    pdfFactory.build()


    const storyline = new Storyline(data); //temp
    storyline.generateYamlFile(); //tmemp
}

export function sendPdf(res, buffer) {
    res.append('Content-Length', buffer.length);
    res.append('Content-Type', 'application/pdf')
    res.status(200).send(buffer);
}