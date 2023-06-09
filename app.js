const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();

env = process.env.NODE_ENV;
if (env === undefined) {
  console.log(`NODE_ENV is ${env}`);
  console.log('SET NODE_EV!!! development or test or production');
  process.exit(1);
}

const model = require('./models');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', (req, res, next) => {
  res.r = (result) => {
    res.json({
      isSuccess: true,
      status: 200,
      description: '',
      message: 'success',
      result,
    });
  };
  next();
});

// CORS ALL ACCESS
app.use(cors());

require('./routes')(app);  
// error handler
require('./ErrorHandler')(app);

const PORT = 3001;

app.listen(PORT, () => {
  model.sequelize.sync();
  console.info(`[ApiServer] Listening on Port ${PORT} / at ${env} Env`);
});

module.exports = app;