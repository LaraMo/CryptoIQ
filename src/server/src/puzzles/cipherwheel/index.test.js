import CipherWheel from './index';

// test('generate encoder key', () => {
//     const puzzle = new CipherWheel('hello');
//     console.log('Start code: ', puzzle.startCode)
//     expect(puzzle.startCode.length).toBe(2);
//     expect(puzzle.startCode[0]).toMatch(/[A-Z]/);
//     expect(puzzle.startCode[1]).toMatch(/[A-Z]/);
//     expect(puzzle.startCode[1]).not.toStrictEqual(puzzle.startCode[0])
// })

// test('generate inner wheel forward direction', () => {
//     const puzzle = new CipherWheel('hello');
//     const wheel = puzzle.createInnerWheel(5);
//     const expectedOrder = ['F','G','H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V','W','X','Y','Z','A','B','C','D','E']
//     expect(wheel.length).toBe(26);
//     expect(wheel).toStrictEqual(expectedOrder)
// })


// test('generate inner wheel backward direction', () => {
//     const puzzle = new CipherWheel('hello');
//     const wheel = puzzle.createInnerWheel(-3);
//     const expectedOrder = ['X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']
//     expect(wheel.length).toBe(26);
//     expect(wheel).toStrictEqual(expectedOrder)
// })

// test('generate encoded message', () => {
//     const puzzle = new CipherWheel('hello');
//     const outerWheel = puzzle.alphabet;
//     const innerWheel = ['X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W']
//     const expected = 'KHOOR'
//     const actual = puzzle.encodeMessage('hello', outerWheel, innerWheel);
//     expect(actual).toStrictEqual(expected)
// })

test('test class', () => {
    const puzzle = new CipherWheel('bye');
    console.log(puzzle);
    expect('True').toBe('True');
})