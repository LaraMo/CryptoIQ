import db from "./";

export function insertStoryline(data = {
    title,
    opening,
    quest,
    ending
}) {
    return new Promise((resolve, reject) => {
        const {
            title,
            opening,
            quest,
            ending
        } = data;
        let stmnt = db.prepare("INSERT INTO storyline(title, opening, quest, ending) VALUES (?,?,?,?);");
        stmnt.run([title, opening, quest, ending], function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(this);
            }
        });
    })

}

export function insertAction(data = {
    storyline_id,
    action,
    type
}) {
    return new Promise((resolve, reject) => {
        const {
            storyline_id,
            action,
            type
        } = data;
        if (action) {
            let stmnt = db.prepare("INSERT INTO action(storyline_id, action, type) VALUES (?,?,?);");
            stmnt.run([storyline_id, action, type], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        } else {
            reject(`Can't insert Action ${action} to the DB`)
        }
    })
}

export function insertErrorLog(data = {
    message,
    traceback,
    createdAt
}) {
    return new Promise((resolve, reject) => {
        const {
            message,
            traceback,
            createdAt
        } = data;

        let stmnt = db.prepare("INSERT INTO error_log(message, traceback, createdAt) VALUES (?, ?, ?);");
        stmnt.run([message, traceback, createdAt], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(this);
            }
        })
    })
}