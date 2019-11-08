const uuidv1 = require('uuid/v1');
const writeYaml = require('write-yaml');
const _ = require('lodash');

class Storyline {

    constructor(data) {
        this.storylineData = data.storyline
    }

    //Creates a .yml file
    generateYamlFile() {
        const storyId = uuidv1();
        writeYaml(`./src/storyline/data/storyline-${storyId}.yml`, this.getDataFromClient(storyId), function(err) {
            console.log(err);
        });
    }

    //Loops through the enum array and returns the right story
    getDataFromClient(storyId) {
        let storyline = [{ id: storyId }];
        _.map(this.storylineData, (text, index) => {
            let field = new Object();
            field[index] = text;
            storyline.push(field)
        });

        return storyline;
    }
}

export default Storyline;