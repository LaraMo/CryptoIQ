import PdfObjectType from '../../lib/enums/PdfObjectType'; //TODO

class Lock {
    words = []; // this array is in the following foramt (fetched from the clinet) 
    //0: {index: 0, wordsEntered: "kjh", defintionsEntered: "oih", pageNumberEntered: "1"}

    constructor(words) {
        this.words = words;
    }

    //Helper method: Will chose a random word from the array
    getARandomWord() {
        //From the wo
        let min = 0; //smallest index
        let max = this.words.length - 1; // max amount of words by index
        const position = Math.floor(Number(Math.random()) * (max - min)) + min;
        return this.words[position];
    }


    //Process lock
    processLock(chosenWordsPageNumber) {
        let modifiedChosenWordsPageNumber = [];
        for (let i = 0; i < chosenWordsPageNumber.length; i++) {
            //if page number is length is 1
            let pageNumber = chosenWordsPageNumber[i];
            if (pageNumber.length === 1) {
                //just append 0
                modifiedChosenWordsPageNumber.push("0" + pageNumber);
            } else if (pageNumber.length === 3) {
                modifiedChosenWordsPageNumber.push(pageNumber.substring(0, 2));
            } else {
                modifiedChosenWordsPageNumber.push(pageNumber);
            }
        }
        return modifiedChosenWordsPageNumber;
    }

    //Generates the lock combination from 3 random words chosen from the provided words by the client
    //The lock generation process: 1 digit page# --apends 0 | 2 digits page# --unchanged | 3 digit page# -- last 2 |
    generateLockCombo() {
        //chose 3 random words
        let chosenWords = [];
        let chosenWordsPageNumber = [];
        while (chosenWords.length != 3) {
            //get a random word from the list
            let word = this.getARandomWord();
            //make sure that this word is unique
            if (!chosenWords.includes(word.wordsEntered)) {
                chosenWords.push(word.wordsEntered);
                chosenWordsPageNumber.push(word.pageNumberEntered);
            }
        }
        //Process lock
        return this.processLock(chosenWordsPageNumber);;
    }

}

export default Lock;