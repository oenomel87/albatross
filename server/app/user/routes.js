import express from 'express';
import logger from 'loglevel';

function getRoutes() {
  const router = express.Router();

  router.get('/', (req, res) => res.send('It works'));

  return router;
}

export { getRoutes }
