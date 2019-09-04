import Crossword from "./index";

test("Testing placing initial word", () => {
    const data = [
        {
            answer: "answer",
            question: "how do you spell answer?"
        }
    ]
    const crossWord = new Crossword(data);

    let board = new Array(100);
        
    for(let i = 0; i < board.length; i ++) {
        board[i] = new Array(100);
    }
    

    board[49][49] = "a";
    board[49][50] = "n";
    board[49][51] = "s";
    board[49][52] = "w";
    board[49][53] = "e";
    board[49][54] = "r";

    
    console.log(crossWord.clues.length);


    debugger

    expect(crossWord.board.length).toBe(board.length);
    
});

function initBoard() {
    let board = new Array(100);
        
    for(let i = 0; i < 100; i ++) {
        board[i] = new Array(100);
    }
    
    return board;
}