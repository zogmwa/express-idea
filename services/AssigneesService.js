const model = require('../models');

const userService = require('./UserService')

const assigneesService = () => {
  // Getting all ideas
  const getAll = async () => {
    return new Promise((resolve, reject) => {
      model.assignees.findAll({ attributes: ['id', 'userId', 'ideaId'] })
        .then(result => resolve(result))
        .catch(error => reject(error));
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
              resolve(new Promise((resolve, reject) => {
                const returnAssigneeData = [];
                assignees.map(async (ass) => {
                  console.log('===================', ass.userId)
                  const userData = await userService().getOne(ass.userId);
                  returnAssigneeData.push(userData);  
                });
                resolve(returnAssigneeData);
              }));

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
