import Storyline from './Storyline';
import db_setup from "../db/setup"
// test('test class', () => {
//     const storyline = new Storyline();
//     console.log(storyline);
//     expect(storyline).toBeDefined(); ///todo, check is defined
// });

// test('create a yaml file', () => {
//     const storyline = new Storyline();
//     storyline.generateYamlFile();
//     console.log(storyline);
//     expect('True').toBe('True'); //to check if file exists 
// })


test("Get a storyline", async () => {
    const resultSetup = await db_setup;
    const storyline = await Storyline.get("The king's rings");
    console.log(storyline);
})


test("Add to storyline", async () => {
    jest.setTimeout(30000);
        const resultSetup = await db_setup;
    const storyline = await Storyline.addToDb({
        title: "Testing storyline",
        opening: "In 2019, there was a guy",
        quest: "He had to finish this project before Wednesday",
        ending: "In the end, he finished it just in time",
        action1: "First he has to fix the puzzles",
        action2: "Then he has to rework the storyline",
        action3: "Then he has to add feature to the front end",
        action4: "Finally, he has to test the whole thing"
    });
    // console.log(storyline);
})

test("Get a random storyline", async () => {
    const storyline = await Storyline.getRandom();
    console.log(storyline);
})


test("Delete a storyline", async () => {
    jest.setTimeout(30000);
    const storyline = await Storyline.delete("Testing storyline");
    console.log(storyline);
})
