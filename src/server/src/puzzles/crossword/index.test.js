import Crossword from "./index";

test("Testing finding words with similar first letters", () => {
     const data = [
        {
            answer: "answer",
            question: "how do you spell answer?"
        },
        {
            answer: "axe",
            question: "what do you use to cut wood?"
        },
        {
            answer: "axium",
            question: "what do you use to cut wood?"
        }
    ]

    const crossWord = new Crossword(data);

    expect(crossWord.findWordsWithSimilarFirstLetters()).toStrictEqual([["answer","axe"],["answer", "axium"], ["axe", "axium"]]);
})