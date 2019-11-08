import Wordsearch from "./index";

test("Testing Crossword with no words given", () => {
    const wordsearch = new Wordsearch(["hello","quan", "this", "works"], true);

    console.log(wordsearch.Wordsearch);
    //expect(crossWord.board).toBeUndefined();
});