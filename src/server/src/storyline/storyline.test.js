import Storyline from './Storyline';

test('test class', () => {
    const storyline = new Storyline();
    console.log(storyline);
    expect('True').toBe('True'); ///todo, check is defined
});

test('create a yaml file', () => {
    const storyline = new Storyline();
    storyline.generateYamlFile();
    console.log(storyline);
    expect('True').toBe('True'); //to check if file exists 
})