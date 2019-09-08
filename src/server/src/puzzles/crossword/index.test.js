import Crossword from "./index";

test("Testing Crossword with no words given", () => {
    const crossWord = new Crossword();

    expect(crossWord.board).toBeUndefined();
});

test("Testing Crossword with only 1 word given", () => {
    const data = [
        {
            answer: "answer",
            question: "how do you spell answer?"
        },
    ]
    const crossWord = new Crossword(data);

    expect(crossWord.board).toBeUndefined();
    
});


test("Testing placing initial word with even number of letters", () => {
    const data = [
        {
            answer: "answer",
            question: "how do you spell answer?"
        },
        {
            answer: "zzz",
            question: "What does not fit on the board"
        }
    ]
    const crossWord = new Crossword(data);

    let board = initBoard();
    

    board[49][46] = "a";
    board[49][47] = "n";
    board[49][48] = "s";
    board[49][49] = "w";
    board[49][50] = "e";
    board[49][51] = "r";

    expect(crossWord.board).toStrictEqual(board);
    
});

test("Testing placing initial word with odd number of letters", () => {
    const data = [
        {
            answer: "answers",
            question: "how do you spell answers?"
        },
        {
            answer: "zzz",
            question: "What does not fit on the board"
        }
    ]
    const crossWord = new Crossword(data);

    let board = initBoard();
    

    board[46][49] = "a";
    board[47][49] = "n";
    board[48][49] = "s";
    board[49][49] = "w";
    board[50][49] = "e";
    board[51][49] = "r";
    board[52][49] = "s";
    
    expect(crossWord.board).toStrictEqual(board);
    
});

test("Testing-placing-two-words-longest-word-has-odd-number-of-letters", () => {
    const data = [
        {
            answer: "answer",
            question: "how do you spell answer?"
        },
        {
            answer: "answers",
            question: "how do you spell answers?"
        },
    ]
    const crossWord = new Crossword(data);

    let board = initBoard();

    board[46][49] = "a";
    board[47][49] = "n";
    board[48][49] = "s";
    board[49][49] = "w";
    board[50][49] = "e";
    board[51][49] = "r";
    board[52][49] = "s";
    

    board[46][49] = "a";
    board[46][50] = "n";
    board[46][51] = "s";
    board[46][52] = "w";
    board[46][53] = "e";
    board[46][54] = "r";
    
    expect(crossWord.board).toStrictEqual(board);
    
});

test("Testing-placing-two-words-longest-word-has-even-number-of-letters", () => {
    const data = [
        {
            answer: "answer",
            question: "how do you spell answer?"
        },
        {
            answer: "ans",
            question: "how do you spell ans?"
        },
    ]
    const crossWord = new Crossword(data);

    let board = initBoard();

    board[49][46] = "a";
    board[49][47] = "n";
    board[49][48] = "s";
    board[49][49] = "w";
    board[49][50] = "e";
    board[49][51] = "r";
    

    board[49][46] = "a";
    board[50][46] = "n";
    board[51][46] = "s";
    
    expect(crossWord.board).toStrictEqual(board);
    
});

test("Testing-placing-words-which-will-not-fit-together", () => {
    const data = [
        {
            answer: "answer",
            question: "how do you spell answer?"
        }, 
        {
            answer: "ans",
            question: "how do you spell ans?"
        },
        {
            answer: "nu",
            question: "how do you spell ans?"
        },
    ]
    const crossWord = new Crossword(data);

    let board = initBoard();

    board[49][46] = "a";
    board[49][47] = "n";
    board[49][48] = "s";
    board[49][49] = "w";
    board[49][50] = "e";
    board[49][51] = "r";
    

    board[49][46] = "a";
    board[50][46] = "n";
    board[51][46] = "s";
    
    expect(crossWord.board).toStrictEqual(board);
    
});

test("Testing-placing-multiple words-which-will-corss-at-multiple-points", () => {
    const data = [
        {
            answer: "answer",
            question: "how do you spell answer?"
        }, 
        {
            answer: "ans",
            question: "how do you spell ans?"
        },
        {
            answer: "nu",
            question: "how do you spell ans?"
        },
    ]
    const crossWord = new Crossword(data);

    let board = initBoard();

    board[49][46] = "a";
    board[49][47] = "n";
    board[49][48] = "s";
    board[49][49] = "w";
    board[49][50] = "e";
    board[49][51] = "r";
    

    board[49][46] = "a";
    board[50][46] = "n";
    board[51][46] = "s";
    
    expect(crossWord.board).toStrictEqual(board);
    
});

test("Testing-placing-words-with-overlap", () => {
    const data = [
        {
            answer: "answer",
            question: "how do you spell answer?"
        },
        {
            answer: "ans",
            question: "how do you spell ans?"
        },
        {
            answer: "az",
            question: "how do you spell azzz?"
        },
    ]
    const crossWord = new Crossword(data);

    let board = initBoard();

    board[49][46] = "a";
    board[49][47] = "n";
    board[49][48] = "s";
    board[49][49] = "w";
    board[49][50] = "e";
    board[49][51] = "r";
    

    board[49][46] = "a";
    board[50][46] = "n";
    board[51][46] = "s";
    
    expect(crossWord.board).toStrictEqual(board);
    
});


function initBoard() {
    let board = new Array(100);
        
    for(let i = 0; i < board.length; i ++) {
        board[i] = new Array(100);
    }
    
    return board;
}