import Crossword from '.';

test.only('board_generation', () => {
    const data = [
        // {
        //   wordsEntered: 'cathatic',
        //   pageNumberEntered: '38',
        //   definitionsEntered: 'Definition of carthatic',
        //   word: 'cathatic',
        //   clue: 'Definition of carthatic'
        // },
        // {
        //   wordsEntered: 'freudian',
        //   pageNumberEntered: '64',
        //   definitionsEntered: 'Definition of freudian',
        //   word: 'freudian',
        //   clue: 'Definition of freudian'
        // },
        // {
        //   wordsEntered: 'judgment',
        //   pageNumberEntered: '65',
        //   definitionsEntered: 'Definition of judgment',
        //   word: 'judgment',
        //   clue: 'Definition of judgment'
        // },
        // {
        //   wordsEntered: 'placebo',
        //   pageNumberEntered: '125',
        //   definitionsEntered: 'Definition of placebo',
        //   word: 'placebo',
        //   clue: 'Definition of placebo'
        // }
       
            {
              wordsEntered: 'abnormality',
              pageNumberEntered: '47',
              definitionsEntered: 'It is a behavioral attribute that reflects the deviation of mind from its normal state or typical behavior.',
              word: 'abnormality',
              clue: 'It is a behavioral attribute that reflects the deviation of mind from its normal state or typical behavior.'
            },
            {
              wordsEntered: 'freudian',
              pageNumberEntered: '64',
              definitionsEntered: 'Definition of freudian',
              word: 'freudian',
              clue: 'Definition of freudian'
            },
            {
              wordsEntered: 'cathatic',
              pageNumberEntered: '38',
              definitionsEntered: 'Definition of carthatic',
              word: 'cathatic',
              clue: 'Definition of carthatic'
            },
            {
              wordsEntered: 'placebo',
              pageNumberEntered: '125',
              definitionsEntered: 'Definition of placebo',
              word: 'placebo',
              clue: 'Definition of placebo'
            }
      ]
    const crossWord = new Crossword(data);
    console.log(crossWord.grid);
    // expect(crossWord.wordArray.length).toBe()
});

test('shrink', () => {
  const data = [
    {
      answer: 'answer',
      question: 'How do you spell answer?',
    },
    {
      answer: 'ans',
      question: 'How do you spell ans?',
    },
    {
      answer: 'ready',
      question: 'What do you want to be?',
    },
    {
      answer: 'yeah',
      question: 'What sound?',
    },
  ];
  const crossWord = new Crossword(data);
  // crossWord.shrink();
  // console.log(crossWord.board);

  let str = '';
  for (let i = 0, a = 0; i < crossWord._board.length; i++) {
    for (let j = 0, b = 0; j < crossWord._board[0].length; j++) {
      console.log('Value: ', crossWord.board[i][j]);
      if (crossWord.board[i][j]) {
        str += crossWord.board[i][j] + ' ';
      } else {
        str += '_ ';
      }
    }
    str += '\n';
  }
  console.log(str);
  let board = initBoard(3, 6);

  board[0][0] = 'a';
  board[0][1] = 'n';
  board[0][2] = 's';
  board[0][3] = 'w';
  board[0][4] = 'e';
  board[0][5] = 'r';

  board[0][0] = 'a';
  board[1][0] = 'n';
  board[2][0] = 's';

  expect(crossWord.board).toStrictEqual(board);
});

function initBoard(row, col) {
  let board = new Array(row);

  for (let i = 0; i < board.length; i++) {
    board[i] = new Array(col);
  }

  return board;
}
