import PdfObjectType from '../../lib/enums/PdfObjectType'; //TODO

class Lock {

    words = []; // format: {index: 0, wordsEntered: "test1", defintionsEntered: "test1", pageNumberEntered: "100"}
    constructor(words) {
        this.words = words;
    }

    /*
     * Helper method: Choses a random word from a given array of words
     */
    getARandomWord() {
        let min = 0;
        let max = this.words.length - 1;
        const position = Math.floor(Number(Math.random()) * (max - min)) + min;
        return this.words[position];
    }

    /**
     * Helper method: Process the lock by the following rules:
     * If page number is 1 digit --> append a 0
     * If page number is 2 digits --> stays the same
     * If page number is 3 digits --> keep the last 2 digits
     * 
     * @param {*} pageNumbers
     */
    processLock(pageNumbers) {
        let modifiedPageNumbers = [];
        for (let i = 0; i < pageNumbers.length; i++) {
            let pageNumber = pageNumbers[i];
            if (pageNumber.length === 1) {
                modifiedPageNumbers.push("0" + pageNumber);
            } else if (pageNumber.length === 3) {
                modifiedPageNumbers.push(pageNumber.substring(1, 3));
            } else {
                modifiedPageNumbers.push(pageNumber);
            }
        }
        return modifiedPageNumbers;
    }

    /**
     * Generates a lock combo (calls helper methods)
     */
    generateLockCombo() {
        //chose 3 random words
        let randomWords = [];
        let randomWords_PageNumber = [];
        while (randomWords.length != 3) {
            //get a random word from the list
            let word = this.getARandomWord();
            //make sure that this word is unique
            if (!randomWords.includes(word.wordsEntered)) {
                randomWords.push(word.wordsEntered);
                randomWords_PageNumber.push(word.pageNumberEntered);
            }
        }
        //Process lock
        return this.processLock(randomWords_PageNumber);;
    }


    ////temp
    toPdf() {

    }

}

export default Lock;