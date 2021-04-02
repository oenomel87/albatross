import logger from 'loglevel';

import { FormError } from '../error/error.js';
import UserModel from './model.js';

export default class UserValidation {

  async isValidUser(payload) {
    try {
      return this.isValidUserData(payload) && await this.isUniqueAccountId(payload);
    } catch(err) {
      logger.error(err.message);
      return err.message;
    }
  }

  isValidUserData(payload) {
    const accountId = payload?.accountId;
    const password = payload?.password;
    const name = payload?.name;
    if(accountId == null || accountId.trim() === ''
        || password == null || password.trim() === ''
        || name == null || name.trim() === '') {
      throw new FormError('입력한 정보를 확인해주세요.');
    }

    return true;
  }

  async isUniqueAccountId(accountId) {
    const checkDuplicate = await UserModel.where({ account_id: accountId }).count();
    if(checkDuplicate > 0) {
      throw new FormError('이미 등록된 아이디입니다.');
    }

    return true;
  }
}
