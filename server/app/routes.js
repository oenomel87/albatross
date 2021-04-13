import express from 'express';

import { getRoutes as getUserRoutes } from './user/routes.js';
import { getRoutes as getHistoryRoutes } from './history/routes.js';

function getRoutes() {
  const router = express.Router();

  router.use('/user', getUserRoutes());
  router.use('/history', getHistoryRoutes());

  router.get('/', (req, res) => {
    res.sendStatus(200);
  });

  return router;
}

export { getRoutes };
