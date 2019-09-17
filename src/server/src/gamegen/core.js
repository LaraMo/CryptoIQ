import PdfFactory from '../lib/pdf/PdfFactory';
import CipherWheel from '../puzzles/cipherwheel';
import Storyline from '../storyline/Storyline'; //temp
export function gameGenerate(res, data) {
    const pdfFactory = new PdfFactory(res);
    const storyline = new Storyline(data); //temp
    storyline.generateYamlFile(); //tmemp
    const cipherWheel = new CipherWheel('JUST TESTING');

    pdfFactory.append(cipherWheel.toPdf())
    pdfFactory.build()
}

export function sendPdf(res, buffer) {
    res.append('Content-Length', buffer.length);
    res.append('Content-Type', 'application/pdf')
    res.status(200).send(buffer);
}