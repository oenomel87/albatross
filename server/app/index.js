import logger from 'loglevel';

import { startServer } from './app.js';

logger.setLevel('info');

startServer();
