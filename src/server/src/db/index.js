import dotenv from 'dotenv';
dotenv.config();
// console.log(process.env)
import sqlite3 from 'sqlite3';
import path from 'path';

sqlite3.verbose();
console.log(process.env.DB_PATH)
const db = new sqlite3.Database(path.join(__dirname, process.env.DB_PATH), (err) => {
    if (!err ) {
        console.log("Sqlite DB initialized!");
    } else {
        console.error("Error initializing db", err)
    }
});

export default db;
