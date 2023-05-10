const expressValidation = require('express-validation');
const log = require('./utils/logger');
const errors = require('./errors');
const env = process.env.NODE_ENV;


// TODO: ErrorHandler
module.exports = (app) => {
  const error_code = {
    INVALID_PARAMETER: 9401,
    SERVER_ERROR: 500
  };

  app.use((err, req, res, next) => {
    // Error log
    if (env !== 'test') {
      log.error(`\n\x1b[31m[ERROR Handler] \u001b[0m \n\x1b[34m[Request PATH - ${req.path}] \u001b[0m \n`, err);
    }


    let miss_param = false;
    if (err instanceof expressValidation.ValidationError) {  // Checking the parameter validation
      miss_param = err.errors.map(error => error.messages.join('. ')).join('\n');
      if (env !== 'test') {
        console.log(`\n\x1b[36m[Miss Params] \u001b[0m \n${miss_param}`);
      }
      err = error_code.INVALID_PARAMETER;
    } else if (isNaN(err)) {  // Server error
      err = error_code.SERVER_ERROR;
    }

    const response_error = errors[err];
    response_error.miss_param = miss_param ? miss_param : undefined;

    return res.status(response_error.status).json(
      response_error
    );
  });
};