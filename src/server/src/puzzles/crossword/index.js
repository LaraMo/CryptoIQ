class Crossword {
    board = [];
    clues = [];
    wordsWithSimilarFirstLetters = []

    constructor(clues) {
        this.clues = clues;
    }
    
    /**
     * finds words which start with the same first letter and adds them to an array
     * from this array you can know which words can be used together (vertical + horizontal)
     * because of their first letter match
     */
    findWordsWithSimilarFirstLetters() {
        this.clues.forEach(clue => {
            this.clues.forEach(cluematch => {
                if(clue !== cluematch && !this.checkDuplicateArrayEntries(this.wordsWithSimilarFirstLetters, [clue.answer, cluematch.answer]) && clue.answer.charAt(0) == cluematch.answer.charAt(0)) {
                    this.wordsWithSimilarFirstLetters.push([clue.answer, cluematch.answer]);
                }
            })
        })
        return this.wordsWithSimilarFirstLetters;
    }


    get Crossword() {
        return board;
    }

    checkDuplicateArrayEntries(array, item) {
        for (let i = 0; i < array.length; i++) {
            if (array[i][0] == item[0] && array[i][1] == item[1] || 
                array[i][0] == item[1] && array[i][1] == item[0] ) {
                    return true; 
            }
        }
        return false;
    }


}


export default Crossword;