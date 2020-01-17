import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import sqlite3 from 'sqlite3';
dotenv.config();
sqlite3.verbose();

const location = process.env.PERSIST_DB === 'true' ?
    (path.isAbsolute(process.env.DB_PATH) ?
        process.env.DB_PATH :
        path.join(process.cwd(), process.env.DB_PATH)) :
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
