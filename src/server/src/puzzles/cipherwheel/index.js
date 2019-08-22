class CipherWheel {
    startCode = [];
    alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    innerWheel = [];
    encodedMessage = ''
    message = ''

    constructor(message) {
        this.startCode = this.getRandomEncoder();
        this.encodeMessage = this.encodeMessage(message);
        this.message = message;

    }

    getRandomEncoder() {
        let min = 0;
        let max = 25;
        const pos1 = Math.floor(Number(Math.random()) * (max - min))  + min;
        var pos2 = Math.floor(Number(Math.random()) * (max - min))  + min;

        while (pos1 === pos2) {
            pos2 = Math.floor(Number(Math.random()) * (max - min))  + min;
        }

        this.innerWheel = this.createInnerWheel(pos2 - pos1);
        return [this.alphabet[pos1], this.alphabet[pos2]];
    }

    createInnerWheel(diff) {
        let result = [];
        if (diff > 0) {
            let i = diff, j = 0;
            while(i < this.alphabet.length || j < this.alphabet.length) {
                let offset = i > this.alphabet.length  ? Math.abs(i - 25): i;
                result[j] = this.alphabet[i];
                i++, j++;
            }
        }
    }

    encodeMessage() {
        if (this.startCode.length !== 2) {
            throw Error('Invalid start code!', this.startCode)
        } else {
            let result = '';
            // this.message.forEach((val) => {
            //     if (val === ' ') {
            //         result += ' '
            //     } else {

            //     }
            // })
        }
    }
}

export default CipherWheel;