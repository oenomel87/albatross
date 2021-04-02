import express from 'express';

import { getRoutes as getUserRoutes } from './user/routes.js';

function getRoutes() {
  const router = express.Router();

  router.use('/user', getUserRoutes());

  return router;
}

export { getRoutes };
