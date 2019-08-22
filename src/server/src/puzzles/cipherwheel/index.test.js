import CipherWheel from './index';

test('generate encoder key', () => {
    const puzzle = new CipherWheel('hello');
    console.log(puzzle.startCode)
    expect(puzzle.startCode.length).toBe(2);
    expect(puzzle.startCode[0]).toMatch(/[A-Z]/);
    expect(puzzle.startCode[1]).toMatch(/[A-Z]/);
})