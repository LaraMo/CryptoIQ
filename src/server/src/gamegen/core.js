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
    console.log("Received: ", data)
    console.log("Actions: ", actionTypes)
    let minActionCount = 2
    if (actionTypes.length < minActionCount) {
        throw `Missing actions. Need at least ${minActionCount} actions`
    }
}

export async function gameGenerate(res, data) {
    // let data1 = [{
    //         word: "placebo",
    //         clue: "How do you spell answer?"
    //     },
    //     {
    //         word: "cathatic",
    //         clue: "How do you spell ans?"
    //     },
    //     {
    //         word: "psychology",
    //         clue: "What do you want to be?"
    //     },
    //     {
    //         word: "freudian",
    //         clue: "What sound?"
    //     },
    //     {
    //         word: "conscious",
    //         clue: "Definition of conscious"
    //     }
    // ]
    // const pdfFactory = new PdfFactory(res);
    // await pdfFactory.append(await new CipherWheel("TEST").toGamePdf())
    // await pdfFactory.append(await new Wordsearch(["hello", "quan", "this", "works"], false).toGamePdf())
    // await pdfFactory.append(await new Crossword(data1).toGamePdf())
    // await pdfFactory.append(await new Lock( [
    //     {
    //         "wordsEntered": "placebo",
    //         "pageNumberEntered": "125",
    //         "definitionsEntered": "Definition of placebo"
    //     },
    //     {
    //         "wordsEntered": "cathatic",
    //         "pageNumberEntered": "38",
    //         "definitionsEntered": "Definition of carthatic"
    //     },
    //     {
    //         "wordsEntered": "psychology",
    //         "pageNumberEntered": "72",
    //         "definitionsEntered": "Definition of psychology"
    //     },
    //     {
    //         "wordsEntered": "freudian",
    //         "pageNumberEntered": "64",
    //         "definitionsEntered": "Definition of freudian"
    //     },
    //     {
    //         "wordsEntered": "conscious",
    //         "pageNumberEntered": "347",
    //         "definitionsEntered": "Definition of conscious"
    //     }
    // ]).toGamePdf())

    data = {
        "general": {
            "numberOfStudents": "26",
            "duration": 15,
            "locks": true,
            "textbook": true
        },
        "vocalbulary": {
            "maxNumberOfWords": 5,
            "words": [
                {
                    "wordsEntered": "placebo",
                    "pageNumberEntered": "125",
                    "definitionsEntered": "Definition of placebo"
                },
                {
                    "wordsEntered": "cathatic",
                    "pageNumberEntered": "38",
                    "definitionsEntered": "Definition of carthatic"
                },
                {
                    "wordsEntered": "psychology",
                    "pageNumberEntered": "72",
                    "definitionsEntered": "Definition of psychology"
                },
                {
                    "wordsEntered": "freudian",
                    "pageNumberEntered": "64",
                    "definitionsEntered": "Definition of freudian"
                },
                {
                    "wordsEntered": "conscious",
                    "pageNumberEntered": "347",
                    "definitionsEntered": "Definition of conscious"
                }
            ]
        },
        "storyline": {
            "difficultyLevel": "2",
            "title": "The king's rings",
            "opening": "Once upon a time there was a kingdom situated far far away. It was ruled by the glorious king Marcus and his beautiful wife Bianca. Their 20 years old daugther, Fiona was devine and very loved by everyone.",
            "quest": "One day she disapeared... Thats when the king proposed to give the famous king's ring' to marry his daughter to the person who finds her",
            "action1": "The brave prince Brandon was very happy to go and find the missing princess. After climing mountains and looking over seas for months, he finally found a castle with the sign 'I got the missing princess'. To enter the castle he had to pass the obsticle in front of him",
            "action2": "After passing the obsticle, he entered the casle. There he has to solve a riddle to unlock the door the princesses bedroom",
            "ending": "Fiona and Brandon married after 3 days. They lived happily ever after"
        }
    }

    const gameGenerator = new GameGenerator(data); 
    await gameGenerator.generate();
    const pdfFactory = new PdfFactory(res);
    await pdfFactory.append(gameGenerator.toGamePdf());
    // await pdfFactory.append(gameGenerator.toInstructionPdf());
    const gamePdf = await pdfFactory.build();
    
}

export function sendPdf(res, buffer) {
    res.append('Content-Length', buffer.length);
    res.append('Content-Type', 'application/pdf')
    res.status(200).send(buffer);
}