import Game from './Game';

const mockDataInput = {
    general: {
        "numberOfStudents": '26',
        "duration": 15,
        "locks": true,
        "textbook": true
    },
    "vocalbulary": {
        "maxNumberOfWords": 5,
        "words": [
            {
                "wordsEntered": "placebo",
                "pageNumberEntered": "125",
                "definitionsEntered": "Definition of placebo",
            },
            {
                "wordsEntered": "cathatic",
                "pageNumberEntered": "38",
                "definitionsEntered": "Definition of carthatic",
            },
            {
                "wordsEntered": "psychology",
                "pageNumberEntered": "72",
                "definitionsEntered": "Definition of psychology",
            },
            {
                "wordsEntered": "freudian",
                "pageNumberEntered": "64",
                "definitionsEntered": "Definition of freudian",
            },
            {
                "wordsEntered": "conscious",
                "pageNumberEntered": "347",
                "definitionsEntered": "Definition of conscious",
            },
        ],
    },
    "storyline": {
        "difficultyLevel": '2',
        "title": `The king's ringsss`,
        "opening": `Once upon a time there was a kingdom situated far far away. It was ruled by the glorious king Marcus and his beautiful wife Bianca. Their 20 years old daugther, Fiona was devine and very loved by everyone.`,
        "quest": `"One day she disapeared... Thats when the king proposed to give the famous 'king'\s ring' to marry his daughter to the person who finds her`,
        "action1": `The brave prince Brandon was very happy to go and find the missing princess. After climing mountains and looking over seas for months, he finally found a castle with the sign 'I got the missing princess'. To enter the castle he had to pass the obsticle in front of him`,
        "action2": `After passing the obsticle, he entered the casle. There he has to solve a riddle to unlock the door the princesses bedroom`,
        "ending": `Fiona and Brandon married after 3 days. They lived happily ever after`
    }
}

describe('Test game generation class', () => {
    test('caluateTeamSize to give correct number of Team and Size', () => {
        let data = {
            generalInfo: {
                numberOfStudents: 25
            }
        }
        let game = new Game(data);
        let teams = game.calculateTeamSize();
        console.log(teams)
        expect(teams[0]["teamSize"]).toBe(5);
        expect(teams[0]["teamNumber"]).toBe(5);

        data = {
            generalInfo: {
                numberOfStudents: 24
            }
        }
        game = new Game(data);
        teams = game.calculateTeamSize();
        console.log(teams)
        expect(teams[0]["teamSize"]).toBe(4);
        expect(teams[0]["teamNumber"]).toBe(6);

        data = {
            generalInfo: {
                numberOfStudents: 22
            }
        }
        game = new Game(data);
        teams = game.calculateTeamSize();
        console.log(teams)
        // expect(teams[0]["teamSize"]).toBe(4);
        // expect(teams[0]["teamNumber"]).toBe(6);
    })

    test("Game generate test", () => {
        const game = new Game(mockDataInput);
        game.generate();
        console.log(game);
    })
})
