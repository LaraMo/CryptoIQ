import fs from 'fs';
import { schedule } from 'node-cron';
import path from "path";
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

export function updateStoryline(data = {
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
        let stmnt = db.prepare("UPDATE storyline SET opening = ?, quest = ?, ending = ? WHERE title = ?");
        stmnt.run([opening, quest, ending, title], function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(this);
            }
        });
    })
}

export function updateAction(data = {
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
            let stmnt = db.prepare("UPDATE action SET action = ? WHERE storyline_id = ? AND type = ?;");
            stmnt.run([action, storyline_id, type], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve(this);
                }
            });
        } else {
            reject(`Can't update Action ${action} of type ${type} inside DB`)
        }
    })
}

export function storylineExist(title) {
    return new Promise((resolve, reject) => {
        let stmnt = db.prepare("SELECT DISTINCT title FROM storyline WHERE title = ?")
        stmnt.get([title], function (err, row) {
            if (err) {
                reject(err);
            } else {
                resolve(Boolean(row))
            }
        })
    })
}

export async function backupDataFile(frequencies) {
    schedule(frequencies, async () => {
        let backucLoc = process.env.BACKUP_PATH || '/var/tmp'
        let sourcePath = path.resolve(process.cwd(), process.env.DB_PATH)
        backucLoc = path.resolve(process.cwd(), backucLoc, `cryptiq-${Date.now()}.sqlite`);
        try {
            await fs.copyFile(sourcePath, backucLoc, (err) => {
                console.log("Backup from ", sourcePath, ' to ', backucLoc)
                if (err) {
                    insertErrorLog({
                        createdAt: Date.now(),
                        message: err,
                        traceback: err.stack,
                    });
                    console.error("Error backing up data", err)
                }
            });
        } catch (err) {
            insertErrorLog({
                createdAt: Date.now(),
                message: err,
                traceback: err.stack,
            });
            console.error("Error backing up data", err)
        }
       
    })
}