const wordsearch = require('wordsearch');

class Wordsearch {

    constructor(words, isEasy) {
        this._words = words.sort((a, b) => b.length - a.length);
        if (isEasy)
            this._wordsearch = wordsearch(words, this._words[0].length + 2, this._words[0].length + 2);
        else
            this._wordsearch = wordsearch(words,this._words[0].length + 5, this._words[0].length + 5);
    }

    /**
     * Call this method.grid for client board
     * Call this method.solved for teacher board
     */
    get Wordsearch() {
        return this._wordsearch;
    }
}

export default Wordsearch;