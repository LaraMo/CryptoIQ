import PdfFactory from '../lib/pdf/PdfFactory';
import CipherWheel from '../puzzles/cipherwheel';
import CrossWord from '../puzzles/crossword';

export async function gameGenerate(res, data) {
    const pdfFactory = new PdfFactory(res);    
    // const cipherWheel = new CipherWheel('TEST', "HARD");
    const clues = [
        {
            answer: "answer",
            question: "How do you spell answer?"
        },
        {
            answer: "ans",
            question: "How do you spell ans?"
        },
        {
            answer: "ready",
            question: "What do you want to be?"
        },
        {
            answer: "yeah",
            question: "What sound?"
        }
    ]
    const crossword = new CrossWord(clues);
    pdfFactory.append(crossword.toGamePdf())
    pdfFactory.build()
}

export function sendPdf(res, buffer) {
    res.append('Content-Length', buffer.length);
    res.append('Content-Type', 'application/pdf')
    res.status(200).send(buffer);
}