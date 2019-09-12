import StorylineComponents from '../lib/enums/StorylineComponents';
const uuidv1 = require('uuid/v1');
const yaml = require('write-yaml');
const _ = require('lodash');

class Storyline {

    constructor(data) {
        this.storylineData = data.storyline
    }

    //Creates a .yml file
    generateYamlFile() {
        yaml('./src/storyline/storyline.yml', this.getDataFromEnumns(), function(err) {
            console.log(err);
        });
    }

    //Loops through the enum array and returns the right story
    getDataFromEnumns() {
        let storyline = [{ id: uuidv1() }];
        _.map(this.storylineData, (text, index) => {
            let field = new Object();
            field[index] = text;
            storyline.push(field)
        });

        return storyline;
    }
}

export default Storyline;