import logger from 'loglevel';

import UserService from '../user/service.js';

const userSevice = new UserService();

export default class HistoryService {
  async save(userAccountId, payload = {}) {
    
    logger.info(JSON.stringify(payload));
  }
}
