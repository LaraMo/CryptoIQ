class CipherWheel {
    alphabet = []
    startCode = [];
    innerWheel = [];
    encodedMessage = '';
    message = '';

    constructor(message) {
        this.alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
        this.startCode = this.getRandomEncoder();
        this.encodedMessage = this.encodeMessage(message, this.alphabet, this.innerWheel);
        this.message = message;
    }

    getRandomEncoder() {
        let min = 0;
        let max = 25;
        const pos1 = Math.floor(Number(Math.random()) * (max - min)) + min;
        var pos2 = Math.floor(Number(Math.random()) * (max - min)) + min;

        while (pos1 === pos2) {
            pos2 = Math.floor(Number(Math.random()) * (max - min)) + min;
        }

        this.innerWheel = this.createInnerWheel(pos2 - pos1);
        return [this.alphabet[pos1], this.alphabet[pos2]];
    }

    createInnerWheel(diff) {
        let result = [];
        if (diff > 0) {
            let i = diff,
                j = 0;
            while (i < this.alphabet.length || j < this.alphabet.length) {
                let offset = i >= this.alphabet.length ? Math.abs(i - 26) : i;
                result[j] = this.alphabet[offset];
                i++, j++;
            }
        } else {
            let i = diff + 26,
                j = 0;
            while (i < this.alphabet.length || j < this.alphabet.length) {
                let offset = i >= this.alphabet.length ? Math.abs(i - 26) : i
                result[j] = this.alphabet[offset];
                i++, j++

            }
        }
        return result;
    }

    encodeMessage(message, outerWheel, innerWheel) {
        let result = '';
        message.split('').forEach((val) => {
            if (val === ' ') {
                result += ' ';
            } else {
                let letterIndex = innerWheel.findIndex(el => el.toUpperCase() === val.toUpperCase());
                result += outerWheel[letterIndex];
            }
        })
        return result;
    }

    toString() {
        console.log('message: ', this.message)
        console.log('startCode: ', this.startCode);
        console.log('innerWheel: ', this.innerWheel);
        console.log('encodedMessage: ', this.encodedMessage)
    }
}

export default CipherWheel;