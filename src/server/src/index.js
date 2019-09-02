import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import gamegenRouter from './gamegen';
import storylineRouter from './storyline'

dotenv.config();
morgan('tiny');

const app = express();
app.get('/test', (req, res) => {
    res.json({result: 'Hello, World!'})
});

app.use('/game-generate', gamegenRouter);
app.use('/storyline', storylineRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});