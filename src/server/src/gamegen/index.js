import express from 'express';
import core from './core';

const router = express.Router();

function validateRequest(req) {
    return true;
}

router.post('/', (req, res, next) => {
    try {
        console.log('wtf')
        validateRequest(req);
        core.gameGenerate()
        res.status(200).json({
            "result": true,
        })
    } catch(e) {
        console.log(e)
        res.status(500).json({
            "result": false,
        })
    }
})

export default router;