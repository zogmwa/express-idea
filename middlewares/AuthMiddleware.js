'use strict';

const authService = require('../services/AuthService');

/*******************
 *  Authenticate
 ********************/
const AuthMiddleware = () => {
  const auth = (req, res, next) => {
    console.log('req.headers', req.headers.authorization)

    if (!req.headers.authorization) {
      return next(401);
    }

    const token = req.headers.authorization.split(' ')[1];
    authService().verify(token, (err, userId) => {
      if (err) {
        return next(err);
      } else {
        req.userId = userId;
        return next();
      }
    })

  };
  return { auth };
};

module.exports = AuthMiddleware;
