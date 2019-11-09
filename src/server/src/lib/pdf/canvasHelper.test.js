import {drawGrid} from './canvasHelpers';

test("Testing DrawGrid", () => {
    const wordsearch = new Wordsearch(["hello","quan", "this", "works"], true);

    console.log(wordsearch.Wordsearch);
    drawGrid(wordsearch.Wordsearch.grid);
});