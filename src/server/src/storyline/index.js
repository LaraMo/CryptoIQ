import express from 'express';
import StorylineComponents from '../lib/enums/StorylineComponents';

const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        //TODO: Nick
        //Get a random storyline
        res.status(200).json({
            "result": true,
        })
    })
    .post((req, res, next) => {
        //TODO: Nick
        //Create new story line -> store in data folder
        res.status(200).json({
            "result": true,
        })
    })

router.route('/:id')
    .get((req, res, next) => {
        //TODO: Nick
        //Return a storyline file content
        res.status(200).json({
            "result": true,
        })
    })
    .put((req, res, next) => {
        //TODO: Nick
        //Update a storyline file content
        res.status(200).json({
            "result": true,
        })
    })
    .delete((req, res, next) => {
        //TODO: Nick
        //Delete a storyline
        res.status(200).json({
            "result": true,
        })
    })

export default router;