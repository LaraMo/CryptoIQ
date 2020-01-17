import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import { backupDataFile } from './db/helpers';
import db_setup from './db/setup';
import gamegenRouter from './gamegen';
import storylineRouter from './storyline';

morgan('tiny');
dotenv.config({path: __dirname + '/.env'});
const app = express();

//Enables body parser for json payload
app.use(express.json())
app.use(cors())
app.options('*', cors())
//Enable CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use('/game-generate', gamegenRouter);
app.use('/storyline', storylineRouter); 

const PORT = process.env.PORT || 9000;

(async () => {
    try {
        await db_setup
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`)
        });
        backupDataFile("0 5 * * *")
    } catch (err) {
        console.error(err);
    }
})();

