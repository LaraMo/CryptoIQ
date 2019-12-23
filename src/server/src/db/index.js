import dotenv from 'dotenv';
dotenv.config();
import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
sqlite3.verbose();

const location = process.env.PERSIST_DB === 'true' ?
    (path.isAbsolute(process.env.DB_PATH) ?
        process.env.DB_PATH :
        path.join(__dirname, process.env.DB_PATH)) :
    ":memory:";
let mode = sqlite3.OPEN_URI;
if (location !== ":memory:" && fs.existsSync(location)) {
    mode = sqlite3.OPEN_READWRITE
}

const db = new sqlite3.Database(location,  (err) => {
    if (!err) {
        console.log("Sqlite DB initialized!", location);
    } else {
        console.error("Error initializing db", err)
    }
});
export default db;
