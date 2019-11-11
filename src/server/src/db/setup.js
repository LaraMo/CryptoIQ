import db from './';
import defaultStoryline from '../lib/enums/DefaultStoryline';
import Storyline from '../lib/enums/Storyline';
import {
    reject,
    resolve
} from 'any-promise';
const setupScript = [
    `PRAGMA foreign_keys = ON;`,
    `CREATE TABLE storyline(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        opening TEXT,
        quest TEXT,
        ending TEXT
        );`,
    `CREATE TABLE action(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        storyline_id INTEGER REFERENCES storyline(id) ON DELETE CASCADE,
        action TEXT,
        type TEXT
    )`
];

export default new Promise((resolve, reject) => {
    db.addListener('open', function () {
        db.serialize(function () {
            setupScript.forEach(stmnt => db.run(stmnt));
            let stmnt = db.prepare("INSERT INTO storyline(title, opening, quest, ending) VALUES (?,?,?,?);");
            stmnt.run([defaultStoryline[Storyline.TITLE],
                defaultStoryline[Storyline.OPENING],
                defaultStoryline[Storyline.QUEST],
                defaultStoryline[Storyline.ENDING]
            ], function (err) {
                if (err) {
                    console.error("Error seeding the DB: ", err);
                    reject(err);
                } else {
                    var stmnt = db.prepare("INSERT INTO action(storyline_id, action, type) VALUES (?,?,?);");
                    [Storyline.ACTION1, Storyline.ACTION2, Storyline.ACTION3, Storyline.ACTION4].forEach(type => {
                        if (defaultStoryline[type]) {
                            stmnt.run([this.lastID, defaultStoryline[type], type]);
                        }
                    })
                    console.log(db)
                    resolve(db);
                }
            });
        });
    })
})
