import bcrypt from 'bcrypt';
import logger from 'loglevel';
import jwt from 'jsonwebtoken';

import UserModel from './model.js';
import UserValidation from './validation.js';

import { AuthenticationError } from '../error/error.js';

const saltRounds = 10;
const userValidation = new UserValidation();

export default class UserService {
  async signUp(payload = {}) {
    const isValidData = userValidation.isValidUser(payload);
    if(typeof isValidData === 'string') {
      return isValidData;
    }
  
    try {
      const accountId = payload?.accountId;
      const password = payload?.password;
      const name = payload?.name;
      const encryptedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = await UserModel.create({
        account_id: accountId,
        name,
        password: encryptedPassword
      });
      return newUser;
    } catch(err) {
      logger.error(err.message);
      return err.message;
    }
  }
}
