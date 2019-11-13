import express from 'express';
import StorylineComponents from '../lib/enums/StorylineComponents';
import Storyline from './Storyline';
import { validateStorylinePayload } from '../gamegen/core';

const router = express.Router();

router.route('/')
    .get(async (req, res, next) => {
        //Get a random storyline
        try {
            let storyline = await Storyline.getRandom()
            res.status(200).json({
                "status": "SUCCESS",
                "result": storyline
            })
        } catch(err) {
            res.status(500).json({
                "status": "Failure",
                "result": err
            })
        }
        
    })
    .post(async (req, res, next) => {
        try {
            validateStorylinePayload(req.body);
            let storyline = await Storyline.addToDb(req.body)
            res.status(200).json({
                "status": "SUCCESS",
            })
        } catch(err) {
            res.status(500).json({
                "status": "Failure",
                "result": err
            })
        }
        
    })

router.route('/:title')
    .get(async (req, res, next) => {
        try {
            let storyline = await Storyline.get(decodeURIComponent(req.params.title))
            res.status(200).json({
                "status": "SUCCESS",
                "result": storyline
            })
        } catch(err) {
            console.error(err)
            res.status(500).json({
                "status": "Failure",
                "result": err
            })
        }
        
    })
    // .put((req, res, next) => {
    //     try {

    //     } catch(err) {
    //         res.status(500).json({
    //             "status": "Failure",
    //             "result": err
    //         })
    //     }
    //     res.status(200).json({
    //         "result": true,
    //     })
    // })
    .delete(async (req, res, next) => {
        try {
            let statement = await Storyline.delete(decodeURIComponent(req.params.title))
            res.status(200).json({
                "status": "SUCCESS",
                "result": statement.changes
            })
        } catch(err) {
            res.status(500).json({
                "status": "Failure",
                "result": err
            })
        }
    })

export default router;