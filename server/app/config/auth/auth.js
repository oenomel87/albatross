import bcrypt from 'bcrypt';
import logger from 'loglevel';
import jwt from 'jsonwebtoken';

import UserModel from '../../user/model.js';

const forbiddenError = res => {
  return res.status(403).json({
    result: false,
    message: 'Unauthenticated request'
  });
}

const authenticationError = res => {
  return res.status(403).json({
    result: false,
    message: '잘못된 아이디/비밀번호입니다.'
  });
}

const serverError = res => {
  return res.status(500).json({
    result: false,
    message: 'Fatal server error'
  });
}

const jwtAuthentication = async (req, res, next) => {
  const token = req.headers['x-access-token'] || req.query.token;

  if(!token) {
    return forbiddenError(res);
  }

  const asyncVerify = new Promise((resolve, reject) => jwt.verify(token, req.app.get('jwt-secret'), (err, decoded) => {
    if(err) {
      reject(err);
    }
    resolve(decoded);
  }));

  try {
    req.decoded = await asyncVerify;
    next();
  } catch(err) {
    forbiddenError(res);
  }
}

const login = async (req, res) => {
  const { accountId, password } = req.body;
  const secret = req.app.get('jwt-secret');

  const user = await UserModel.findOneByAccountId(accountId);
  if(!user) {
    return authenticationError(res);
  }

  const result = await bcrypt.compare(password, user.password);
  if(!result.valueOf()) {
    return authenticationError(res);
  }

  try {
    const token = await jwt.sign(
      {
        _id: user._id,
        accountId: user.account_id,
        name: user.name
      },
      secret,
      {
        expiresIn: '7d',
        issuer: 'albatross',
        subject: 'user'
      }
    );

    res.send({
      message: 'logged in successfully',
      token
    });
  } catch(err) {
    return serverError(res);
  }
}

export { jwtAuthentication, login };
