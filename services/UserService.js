const model = require('../models');
const Op = require('sequelize').Op;
const util = require('../utils/Crypto');


const userService = () => {

  const getSalt = (username) => {
    return new Promise((resolve, reject) => {
      model.user.findOne({
        where: {
          username
        },
        attributes: ['salt']
      })
        .then((result) => {
          result ? resolve(result.salt) : reject(1402);
        })
    })
  };

  // Checking the already exsit user
  const isExistUser = (username) => {
    return new Promise((resolve, reject) => {
      model.user.findOne({
        where: {
          username
        },
        attributes: ['id']
      }).then((result) => {
        // if user exsit - reject
        // else - resolve
        result ? reject(1401) : resolve(true);
      })
    })
  };
  
  const signUp = async (userData) => {
    return new Promise((resolve, reject) => {
      model.user.create(userData)
        .then(result => resolve(result))
        .catch(error => reject(error));
    })
  };

  const signIn = (userData) => {
    return new Promise((resolve, reject) => {
      model.user.findOne({
        where: {
          [Op.and]: [{username: userData.username}, {password: userData.pw}]
        },
        attributes: ['id', 'username']
      })
        .then((result) => {
          result ? resolve(result) : reject(400);
        })
    })
  };

  const updateFcmToken = (userData) => {
    return new Promise((resolve, reject) => {
      model.user.update(
        {fcmToken: userData.fcmToken},
        {where: {[Op.and]: [{username: userData.username}, {password: userData.pw}]}})
        .then(result => resolve(result))
        .catch(err => reject(err));
    })
  };

  return {
    getSalt,
    signUp,
    signIn,
    updateFcmToken,
    isExistUser
  };
};

module.exports = userService;
