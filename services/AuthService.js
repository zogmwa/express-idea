const jwt = require('jsonwebtoken');


// Todo: change security key
const JWT_SECRET_KEY = process.env.JWT_SECRET || 'secret';
const secret = process.env.NODE_ENV === 'production' ? JWT_SECRET_KEY : 'secret';

const model = require('../models');

const authService = () => {
  const issue = (payload) => jwt.sign(payload, secret, { expiresIn: "100h" });

  const verify = (token, done) => {
    jwt.verify(token, secret, {}, async (err, decoded) => {
      if (err) {
        switch (err.message) {
          case 'jwt expired':
            return done(10401);
          case 'invalid token':
            return done(10403);
          default:
            return done(err.message);
        }
      } else {
        const user = await model.user.findOne({
          where: {
            username: decoded.username
          }
        });
        return user ? done(null, user.id) : done(401);
      }
    })
  };

  return {
    issue,
    verify,
  };
};

module.exports = authService;
