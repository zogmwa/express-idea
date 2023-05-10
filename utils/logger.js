const winston = require('winston');
const moment = require('moment');

const logger = new winston.Logger({
  transports : [
    new (winston.transports.Console)({
      level: 'info',
      colorize: true
    })
  ]
});

module.exports = logger;
