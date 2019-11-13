// import enum from '../lib/enums/DefaultStoryline';
import StorylineEnum from '../lib/enums/Storyline';
import db from "../db/";
import {
    insertAction,
    insertStoryline
} from "../db/helpers";
import {
    reflect
} from '../lib/helperFunctions';

export function extractActions(data) {
    let re = /^action.*$/;
    const actionKeys = Object.keys(StorylineEnum).map(val => val.toLowerCase());
    const actionTypes = Object.keys(data)
        .map(key => key.toLowerCase())
        .filter(key => re.test(key) && actionKeys.indexOf(key) !== -1);
    return actionTypes;
}
class Storyline {
    // constructor(data) {
    //     this.storylineData = data.storyline
    // }

    static withActions(resolve, reject, err, rows, withActions = true) {
        try {
            let result = {};
            if (err) {
                reject(err);
            } else {
                result = rows[0];
                console.log(result)
                if(!result) {
                    resolve(result);
                }
                if (!withActions) {
                    resolve(result);
                } else {
                    let query = `SELECT * FROM action WHERE storyline_id = '${rows[0].id}'`;
                    db.all(query, function (err, rows) {
                        if (err) {
                            reject(err)
                        } else {
                            rows.forEach(row => result[String(row.type).toLowerCase()] = row.action)
                            resolve(result);
                        }
                    })
                }
            }
        } catch(err) {
            reject(err)
        }
       
    }

    static get(title = "", withActions = true) {
        if (title.indexOf("'") !== -1) {
            title = title.replace(/'/g, "''");
        }
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM storyline WHERE title = '${title}'`;
            db.all(query, function (err, rows) {
                console.log(title, rows)
                Storyline.withActions(resolve, reject, err, rows, withActions);
            });
        })
    }

    static getRandom(withActions = true) {
        return new Promise((resolve, reject) => {
            let query = `SELECT * FROM storyline ORDER BY RANDOM() LIMIT 1;`;
            db.all(query, function (err, rows) {
                Storyline.withActions(resolve, reject, err, rows, withActions);
            });
        })
    }

    static addToDb(data = {
        title,
        opening,
        quest,
        ending,
        action1,
        action2,
        action3,
        action4
    }) {
        return new Promise((resolve, reject) => {
            try {
                const {
                    title,
                    opening,
                    quest,
                    ending
                } = data;
                let actionTypes = extractActions(data);
                console.log(actionTypes)
                // console.log(actionKeys)
                db.serialize(async function () {
                    const {
                        lastID
                    } = await insertStoryline({
                        title,
                        opening,
                        quest,
                        ending
                    });
                    let result = actionTypes.map(async (type) => {
                        return await insertAction({
                            storyline_id: lastID,
                            action: data[type],
                            type
                        })
                    })
                    resolve(await Promise.all(result.map(reflect)))
                })
            } catch (err) {
                reject(err)
            }
        })
    }

    // update(title, data) {
    //     var sql = `UPDATE storyline SET WHERE title = '${title}'`;
    // }

    static delete(title = "") {
        return new Promise((resolve, reject) => {
            let statement = db.prepare("DELETE FROM storyline WHERE title = ?");
            statement.run([title], function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this)
                }
            })
        })
    }
}

export default Storyline;