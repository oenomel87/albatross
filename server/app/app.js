import express from 'express';
import helmet from 'helmet';
import logger from 'loglevel';


import { login, jwtAuthentication } from './config/auth/auth.js';
import { connectToMongo } from './config/mongo.js';
import { getRoutes } from './routes.js';

const jwtSecret = 'albatross';

function startServer(port) {
  const app = express();

  app.use(express.json())
  app.use(errorMiddleware);
  app.use(helmet());

  app.post('/login', (req, res) => login(req, res));
  app.use('/api', jwtAuthentication);
  app.use('/api', getRoutes());

  app.set('jwt-secret', jwtSecret);

  connectToMongo();

  return new Promise(resolve => {
    const server = app.listen(port = 9999, () => {
      logger.info(`A server is listening at ${port}`);

      const originalClose = server.close.bind(server)
      server.close = () => {
        return new Promise(resolveClose => {
          originalClose(resolveClose)
        })
      }

      setupCloseOnExit(server)

      resolve(server);
    });
  });
}

function errorMiddleware(error, req, res, next) {
  if (res.headersSent) {
    next(error)
  } else {
    logger.error(error)
    res.status(500)
    res.json({
      message: error.message,
      ...(process.env.NODE_ENV === 'production' ? null : {stack: error.stack}),
    })
  }
}

function setupCloseOnExit(server) {
  async function exitHandler(options = {}) {
    await server
      .close()
      .then(() => {
        logger.info('Server successfully closed')
      })
      .catch(e => {
        logger.warn('Something went wrong closing the server', e.stack)
      })
    if (options.exit) process.exit()
  }
  // do something when app is closing
  process.on('exit', exitHandler)
  // catches ctrl+c event
  process.on('SIGINT', exitHandler.bind(null, {exit: true}))
  // catches "kill pid" (for example: nodemon restart)
  process.on('SIGUSR1', exitHandler.bind(null, {exit: true}))
  process.on('SIGUSR2', exitHandler.bind(null, {exit: true}))
  // catches uncaught exceptions
  process.on('uncaughtException', exitHandler.bind(null, {exit: true}))
}

export { startServer };
