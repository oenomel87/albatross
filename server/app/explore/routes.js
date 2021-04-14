import express from 'express';
import logger from 'loglevel';

import ExploreService from './service.js';

function getRoutes() {
  const router = express.Router();
  const exploreService = new ExploreService();

  router.post('/', async (req, res, next) => {
    try {
      const { method, uri } = req.body;
      logger.info(`request data - ${JSON.stringify(req.body)}`);
      const response = await exploreService.explore(method, uri);
      res.send(response);
    } catch(err) {
      res.status(500).send(err.message);
    }
  });

  return router;
}

export { getRoutes }
