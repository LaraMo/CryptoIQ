import dotenv from 'dotenv';
dotenv.config();
// console.log(process.env)
import sqlite3 from 'sqlite3';
import path from 'path';

sqlite3.verbose();
const location = process.env.PERSIST_DB === 'true' ?
    (path.isAbsolute(process.env.DB_PATH) ?
        process.env.DB_PATH :
        path.join(__dirname, process.env.DB_PATH)) :
    ":memory:";

// console.log(process.env.PERSIST_DB)
// console.log(location)
const db = new sqlite3.Database(location, (err) => {
    if (!err) {
        console.log("Sqlite DB initialized!");
    } else {
        console.error("Error initializing db", err)
    }
});

export default db;
