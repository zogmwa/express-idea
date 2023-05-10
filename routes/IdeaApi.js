'use strict';

const multer = require('multer');
const path = require('path');
const authMdwr = require('../middlewares/AuthMiddleware');
const ideaController = require('../controllers/IdeaController');

const imageUpload = multer({
  storage: multer.diskStorage(
    {
      destination: function (req, file, cb) {
        cb(null, 'uploads/');
      },
      filename: function (req, file, cb) {
        cb(
          null,
          new Date().valueOf() + 
          '_' +
          file.originalname
        );
      }
    }
  ), 
});

module.exports = (router) => {
  router.post('/image', imageUpload.single('file'), (req, res) => {
    const { filename } = req.file;

    res.json({ filename }); 
  });

  // Image Get Routes
  router.get('/image/:filename', (req, res) => {
    const { filename } = req.params;
    const dirname = path.resolve();
    const fullfilepath = path.join(dirname, 'uploads/' + filename);
    return res.sendFile(fullfilepath);
  });

  router.route('/ideas')
    .post(authMdwr().auth, ideaController().create)
    .get(authMdwr().auth, ideaController().getAll);

  router.route('/ideas/:id')
    .get(authMdwr().auth, ideaController().getOne)
    .put(authMdwr().auth, ideaController().update)
    .delete(authMdwr().auth, ideaController().remove);

  return router;
};
