import Lock from './index';

test('Find random words, and generate a lock combination', () => {
    //    //0: {index: 0, wordsEntered: "kjh", defintionsEntered: "oih", pageNumberEntered: "1"}
    //data
    const words = [{ index: 0, wordsEntered: "Issue", defintionsEntered: "Problem", pageNumberEntered: "90" },
        { index: 1, wordsEntered: "Minute", defintionsEntered: "Infinitely or immeasurably small", pageNumberEntered: "271" },
        { index: 2, wordsEntered: "Consider", defintionsEntered: "Deem to be", pageNumberEntered: "45" },
        { index: 3, wordsEntered: "Intend", defintionsEntered: "Have a mind as a purpose", pageNumberEntered: "111" },
        { index: 4, wordsEntered: "Engage", defintionsEntered: "Consume all of one's attention or time", pageNumberEntered: "35" },
        { index: 5, wordsEntered: "Straight", defintionsEntered: "Without a break", pageNumberEntered: "46" },
        { index: 6, wordsEntered: "Coast", defintionsEntered: "The shoar side of the ocean or the sea", pageNumberEntered: "74" },
        { index: 7, wordsEntered: "Affect", defintionsEntered: "Have an influence upon", pageNumberEntered: "9" },
        { index: 8, wordsEntered: "Appeal", defintionsEntered: "Be attractive too", pageNumberEntered: "45" },
        { index: 9, wordsEntered: "Grant", defintionsEntered: "Allow to have", pageNumberEntered: "20" },
        { index: 10, wordsEntered: "Dwell", defintionsEntered: "Think moodily or anxiously about something", pageNumberEntered: "2" },
        { index: 11, wordsEntered: "Yield", defintionsEntered: "Give or supply", pageNumberEntered: "12" },

    ];

    const lock = new Lock(words);
    console.log(lock.generateLockCombo());
    expect(2).toBe(2);
})




test('Test one unit page numbers', () => {
    //    //0: {index: 0, wordsEntered: "kjh", defintionsEntered: "oih", pageNumberEntered: "1"}
    //data
    const words = [{ index: 0, wordsEntered: "Issue", defintionsEntered: "Problem", pageNumberEntered: "9" },
        { index: 1, wordsEntered: "Minute", defintionsEntered: "Infinitely or immeasurably small", pageNumberEntered: "2" },
        { index: 2, wordsEntered: "Consider", defintionsEntered: "Deem to be", pageNumberEntered: "4" },
        { index: 3, wordsEntered: "Intend", defintionsEntered: "Have a mind as a purpose", pageNumberEntered: "2" },
        { index: 4, wordsEntered: "Engage", defintionsEntered: "Consume all of one's attention or time", pageNumberEntered: "4" },
        { index: 5, wordsEntered: "Straight", defintionsEntered: "Without a break", pageNumberEntered: "8" },
        { index: 6, wordsEntered: "Coast", defintionsEntered: "The shoar side of the ocean or the sea", pageNumberEntered: "9" },
        { index: 7, wordsEntered: "Affect", defintionsEntered: "Have an influence upon", pageNumberEntered: "7" },
        { index: 8, wordsEntered: "Appeal", defintionsEntered: "Be attractive too", pageNumberEntered: "8" },
        { index: 9, wordsEntered: "Grant", defintionsEntered: "Allow to have", pageNumberEntered: "5" }
    ];

    const lock = new Lock(words);
    console.log(lock.generateLockCombo());
    expect(2).toBe(2);
})






test('Test two unit page numbers', () => {
    //    //0: {index: 0, wordsEntered: "kjh", defintionsEntered: "oih", pageNumberEntered: "1"}
    //data
    const words = [{ index: 0, wordsEntered: "Issue", defintionsEntered: "Problem", pageNumberEntered: "91" },
        { index: 1, wordsEntered: "Minute", defintionsEntered: "Infinitely or immeasurably small", pageNumberEntered: "23" },
        { index: 2, wordsEntered: "Consider", defintionsEntered: "Deem to be", pageNumberEntered: "47" },
        { index: 3, wordsEntered: "Intend", defintionsEntered: "Have a mind as a purpose", pageNumberEntered: "28" },
        { index: 4, wordsEntered: "Engage", defintionsEntered: "Consume all of one's attention or time", pageNumberEntered: "48" },
        { index: 5, wordsEntered: "Straight", defintionsEntered: "Without a break", pageNumberEntered: "58" },
        { index: 6, wordsEntered: "Coast", defintionsEntered: "The shoar side of the ocean or the sea", pageNumberEntered: "19" },
        { index: 7, wordsEntered: "Affect", defintionsEntered: "Have an influence upon", pageNumberEntered: "17" },
        { index: 8, wordsEntered: "Appeal", defintionsEntered: "Be attractive too", pageNumberEntered: "89" },
        { index: 9, wordsEntered: "Grant", defintionsEntered: "Allow to have", pageNumberEntered: "50" }
    ];

    const lock = new Lock(words);
    console.log(lock.generateLockCombo());
    expect(2).toBe(2);
})