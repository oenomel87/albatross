import logger from 'loglevel';

import UserService from '../user/service.js';

export default class HistoryService {
  async save(payload = {}) {
    const userSevice = new UserService();
    logger.info(JSON.stringify(payload));
  }
}
