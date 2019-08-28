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
});

test("Testing Sorting the Answers by length, biggest to smallest", () => {
    const data = [
        {
            answer: "a",
        },
        {
            answer: "ab",
        },
        {
            answer: "abc",
        },
        {
            answer: "abcdef",
        },
        {
            answer: "abcd",
        },
        {
            answer: "abcdefg",
        },
        {
            answer: "abcde",
        },
        {
            answer: "aaa",
        }
    ]

    const expected = [
        {
            answer: "abcdefg",
        },
        {
            answer: "abcdef",
        },
        {
            answer: "abcde",
        },
        {
            answer: "abcd",
        },
        {
            answer: "abc",
        },
        {
            answer: "aaa",
        },
        {
            answer: "ab",
        },
        {
            answer: "a",
        }
    ]

    

    const crossWord = new Crossword(data);

    crossWord.sortAnswersByLength();

    expect(crossWord.clues).toStrictEqual(expected);
});