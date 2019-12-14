import db from './';
import defaultStoryline from '../lib/enums/DefaultStoryline';
import Storyline from '../lib/enums/Storyline';
import {
    reject,
    resolve
} from 'any-promise';
const setupScript = [
    `PRAGMA foreign_keys = ON;`,
    `CREATE TABLE IF NOT EXISTS storyline(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        opening TEXT,
        quest TEXT,
        ending TEXT
        );`,
    `CREATE TABLE IF NOT EXISTS action(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        storyline_id INTEGER REFERENCES storyline(id) ON DELETE CASCADE,
        action TEXT,
        type TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS error_log(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        message TEXT,
        traceback TEXT,
        createdAt INTEGER
    )`
];

export default new Promise((resolve, reject) => {
    db.addListener('open', function () {
        db.serialize(function () {
            setupScript.forEach(stmnt => db.run(stmnt));
            defaultStoryline.forEach(storyline => {
                let stmnt = db.prepare("INSERT INTO storyline(title, opening, quest, ending) VALUES (?,?,?,?);");
                stmnt.run([storyline[Storyline.TITLE],
                    storyline[Storyline.OPENING],
                    storyline[Storyline.QUEST],
                    storyline[Storyline.ENDING]
                ], function (err) {
                    if (err) {
                        console.error("Error seeding the DB: ", err);
                        reject(err);
                    } else {
                        var stmnt = db.prepare("INSERT INTO action(storyline_id, action, type) VALUES (?,?,?);");
                        [Storyline.ACTION1, Storyline.ACTION2, Storyline.ACTION3, Storyline.ACTION4].forEach(type => {
                            if (storyline[type]) {
                                stmnt.run([this.lastID, storyline[type], type]);
                            }
                        })
                        resolve(db);
                    }
                });
            })
          
        });
    })
})
