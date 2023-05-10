'use strict';

// const imageUtils = require('../utils/ImageUtil');

const authMdwr = require('../middlewares/AuthMiddleware');
const userController = require('../controllers/UserController');
const workflowController = require('../controllers/WorkflowController');

module.exports = (router) => {
  router.route('/workflows')
    .post(authMdwr().auth, workflowController().create)
    .get(authMdwr().auth, workflowController().getAll);

  router.route('/workflows/:id')
    .get(authMdwr().auth, workflowController().getOne)
    .put(authMdwr().auth, workflowController().update)
    .delete(authMdwr().auth, workflowController().remove);

  return router;
};
