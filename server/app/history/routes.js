import express from 'express';
import logger from 'loglevel';

function getRoutes() {
  const router = express.Router();

  router.get('/', (req, res, next) => {
    logger.info(`jwt decoded ${req.decoded}`);
    res.send('OK!');
  });

  return router;
}

export { getRoutes }
