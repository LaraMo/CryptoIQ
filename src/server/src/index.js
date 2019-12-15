import dotenv from 'dotenv';

import cors from 'cors';
// console.log(process.env)
import express from 'express';
import morgan from 'morgan';


morgan('tiny');
dotenv.config({path: __dirname + '/.env'});

import gamegenRouter from './gamegen';
import storylineRouter from './storyline';

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

app.get('/test', (req, res) => {
    res.json({
        result: 'Hello, World!'
    })
});

app.use('/game-generate', gamegenRouter);
app.use('/storyline', storylineRouter); //todo

const PORT = process.env.PORT;

import db_setup from './db/setup';
(async () => {
    try {
        await db_setup
        app.listen(PORT, () => {
            console.log(`server running on port ${PORT}`)
        });
    } catch (err) {
        console.error(err);
    }
})();
