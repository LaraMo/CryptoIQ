import Game from './Game';

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