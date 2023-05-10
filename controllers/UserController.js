'use strict';

const util = require('../utils/Crypto');
const model = require('../models');
const axios = require('axios');

const authService = require('../services/AuthService');
const userServcie = require('../services/UserService');

const UserController = () => {

  const signup = async (req, res, next) => {
    let result;

    try {
      console.log(req.body)
      const { pw, salt } = util.doCipher(req.body.password);

      const userData = {
        username: req.body.username,
        password: pw,
        salt: salt,
        fcmToken: req.body.fcmtoken
      };

      await userServcie().isExistUser(userData.username);
      const user = await userServcie().signUp(userData);
      console.log(user)
      const token = authService().issue({
        id: user.id, 
        username: user.username
      });

      result = {
        profile: {
          id: user.id,
          username: user.username
        }, token
      }

    } catch (error) {
      return next(error);
    }

    return res.r(result);
  };

  const signin = async (req, res, next) => {
    let result;

    try {
      const salt = await userServcie().getSalt(req.body.username);

      const userData = {
        pw: util.doCipher(req.body.password, salt).pw,
        fcmToken: req.body.fcmtoken
      };

      // If valid user, then return the jwt
      const user = await userServcie().signIn(userData);
      await userServcie().updateFcmToken(userData);

      const token = authService().issue({id: user.id, username: user.username});

      result = {
        profile: {
          id: user.id,
          username: user.username
        }, token
      }
    } catch (error) {
      return next(error);
    }

    return res.r(result);
  };

  return {
    signup,
    signin
  };
};

module.exports = UserController;
