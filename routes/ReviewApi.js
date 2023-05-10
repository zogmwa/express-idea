'use strict';

// const imageUtils = require('../utils/ImageUtil');

const authMdwr = require('../middlewares/AuthMiddleware');
const reviewController = require('../controllers/ReviewController');

module.exports = (router) => {
  router.route('/reviews')
    .post(authMdwr().auth, reviewController().create)
    .get(authMdwr().auth, reviewController().getAll);

  return router;
};
