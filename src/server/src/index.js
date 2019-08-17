import express from 'express';
import dotenv from 'dotenv';

dotenv.config()
const app = express();
// get all todos
app.get('/test', (req, res) => {
    res.json({result: 'Hello, World!'})
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});