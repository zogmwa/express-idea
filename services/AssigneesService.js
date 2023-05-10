const model = require('../models');

const assigneesService = () => {
  // Getting all ideas
  const getAll = async (ideaId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const result = model.sequelize.query(`
          SELECT users.id AS userId, username, ideaId
            FROM assignees
          LEFT JOIN users ON assignees.userId = users.id
          WHERE ideaId = ${ideaId};`,
          { type: model.sequelize.QueryTypes.SELECT }
        );

        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }

  // Creating new idea
  const assigne = async (assignees, ideaId) => {
    return new Promise((resolve, reject) => {
      model.assignees.destroy({
        where: {
          ideaId
        }
      })
        .then(r => {
          model.assignees.bulkCreate(assignees)
            .then(async (result) => {
              resolve(result);
            })
            .catch(error => reject(error));
        })
        .catch(error => reject(error));

    })
  };


  return {
    assigne,
    getAll
  };
};

module.exports = assigneesService;
