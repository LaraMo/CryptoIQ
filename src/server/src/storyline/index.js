import express from 'express';
import { insertErrorLog, storylineExist } from '../db/helpers';
import { validateStorylinePayload } from '../gamegen/core';
import Storyline from './Storyline';

const router = express.Router();

router
  .route('/')
  .get(async (req, res, next) => {
    //Get a random storyline
    try {
      let storyline = await Storyline.getRandom();
      res.status(200).json({
        status: 'SUCCESS',
        result: storyline,
      });
    } catch (err) {
      insertErrorLog({
        createdAt: Date.now(),
        message: err,
        traceback: err.stack,
      });

      res.status(500).json({
        status: 'FAILURE',
        result: err,
      });
    }
  })
  .post(async (req, res, next) => {
    try {
      validateStorylinePayload(req.body);
      console.log(await storylineExist(req.body.title))
      if(await storylineExist(req.body.title)) {
        console.log(req.body)
        Storyline.update(req.body)
      } else {
        await Storyline.addToDb(req.body);
      }
      res.status(200).json({
        status: 'SUCCESS',
      });
    } catch (err) {
      console.error(err)
      insertErrorLog({
        createdAt: Date.now(),
        message: err,
        traceback: err.stack,
      });

      res.status(500).json({
        status: 'FAILURE',
        result: err,
      });
    }
  });

router.route('/search').get(async (req, res, next) => {
  try {
    if ("searchString" in req.query) {
      let titles = await Storyline.getTitles(
        decodeURIComponent(req.query.searchString),
      );
      res.status(200).json({
        status: 'SUCCESS',
        result: titles,
      });
    } else {
      throw 'Invalid request! No searchingString query string was provided';
    }
  } catch (err) {
    insertErrorLog({
      createdAt: Date.now(),
      message: err,
      traceback: err.stack,
    });
    console.error(err)
    res.status(500).json({
      status: 'FAILURE',
      result: err,
    });
  }
});

router
  .route('/:title')
  .get(async (req, res, next) => {
    try {
      let storyline = await Storyline.get(decodeURIComponent(req.params.title));
      res.status(200).json({
        status: 'SUCCESS',
        result: storyline,
      });
    } catch (err) {
      insertErrorLog({
        createdAt: Date.now(),
        message: err,
        traceback: err.stack,
      });

      console.error(err);
      res.status(500).json({
        status: 'FAILURE',
        result: err,
      });
    }
  })
  .delete(async (req, res, next) => {
    try {
      let statement = await Storyline.delete(
        decodeURIComponent(req.params.title),
      );
      res.status(200).json({
        status: 'SUCCESS',
        result: statement.changes,
      });
    } catch (err) {
      insertErrorLog({
        createdAt: Date.now(),
        message: err,
        traceback: err.stack,
      });

      res.status(500).json({
        status: 'FAILURE',
        result: err,
      });
    }
  });

export default router;
