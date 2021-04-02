import express from 'express';
import logger from 'loglevel';

import UserService from './service.js';

function getRoutes() {
  const userService = new UserService();
  const router = express.Router();

  router.get('/', (req, res, next) => {
    res.send('it works!');
    next();
  });

  router.post('/signup', async (req, res, next) => {
    const payload = req.body;
    const result = await userService.signUp(payload);

    if(typeof result === 'string') {
      return res.status(500).send({ result: 'FAIL', message: result });
    }
    return res.sendStatus(200);
  });

  return router;
}

export { getRoutes }
