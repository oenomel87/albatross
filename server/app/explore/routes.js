import express from 'express';
import logger from 'loglevel';

import ExploreService from './service.js';

function getRoutes() {
  const router = express.Router();
  const exploreService = new ExploreService();

  router.post('/', async (req, res, next) => {
    try {
      const { header, method, uri, params } = req.body;
      logger.info(`request data - ${JSON.stringify(req.body)}`);
      const response = await exploreService.explore(header, method, uri, params);
      res.send(response);
    } catch(err) {
      res.status(500).send(err.message);
    }
  });

  return router;
}

export { getRoutes }
