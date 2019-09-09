import StorylineComponents from '../lib/enums/StorylineComponents';
const uuidv1 = require('uuid/v1');
const yaml = require('write-yaml');
const _ = require('lodash');

class Storyline {

    constructor() {}

    //Creates a .yml file
    generateYamlFile() {
        yaml('./src/storyline/storyline.yml', this.getDataFromEnumns(), function(err) {
            console.log(err);
        });
    }

    //Loops through the enum array and returns the right story
    getDataFromEnumns() {
        const storyline = [{ id: uuidv1() }];
        _.map(StorylineComponents, (text) => {
            console.log(text);
            storyline.push(text)
        })
        return storyline;
    }

}

export default Storyline;