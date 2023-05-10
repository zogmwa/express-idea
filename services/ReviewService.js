const model = require('../models');

const reviewService = () => {
  // Checking the already exsit review
  const isExistData = (userId, ideaId) => {
    return new Promise((resolve, reject) => {
      model.review.findOne({
        where: {
          userId,
          ideaId
        },
        attributes: ['id']
      }).then((result) => {
        // if data exsit - reject
        // else - resolve
        result ? reject(1403) : resolve(true);
      })
    })
  };

  // Getting all review
  const getAll = async (userId, ideaId) => {
    return new Promise((resolve, reject) => {
      const whereQuery = (userId && ideaId) ? {
        userId, ideaId
      } : (userId ? { userId } : (ideaId ? { ideaId } : {}))
      model.review.findAll({ 
        where: whereQuery,
        attributes: ['id', 'userId', 'ideaId', 'score'] 
      })
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  // Creating new review
  const create = async (data) => {
    return new Promise((resolve, reject) => {
      model.review.create(data)
        .then(result => resolve(result))
        .catch(error => reject(error));
    })
  };

  return {
    create,
    getAll,
    isExistData
  };
};

module.exports = reviewService;
