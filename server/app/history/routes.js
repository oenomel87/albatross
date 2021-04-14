import express from 'express';
import logger from 'loglevel';

import HistoryService from './service.js';

function getRoutes() {
  const router = express.Router();
  const historyService = new HistoryService();

  router.get('/', (req, res, next) => {
    logger.info(`jwt decoded ${req.decoded._id}`);
    res.send('OK!');
  });

  return router;
}

export { getRoutes }
