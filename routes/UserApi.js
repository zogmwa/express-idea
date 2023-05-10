'use strict';

// const imageUtils = require('../utils/ImageUtil');

const authMdwr = require('../middlewares/AuthMiddleware');
const userController = require('../controllers/UserController');

module.exports = (router) => {
  router.route('/users/signup')
    .post(userController().signup);

  router.route('/users/signin')
    .post(userController().signin);

  return router;
};