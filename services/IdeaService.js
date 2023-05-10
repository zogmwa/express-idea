const model = require('../models');

const assigneesService = require('./AssigneesService');

const ideaService = () => {
  // Checking the already exsit idea
  const isExistData = (summary) => {
    return new Promise((resolve, reject) => {
      model.idea.findOne({
        where: {
          summary
        },
        attributes: ['id']
      }).then((result) => {
        // if data exsit - reject
        // else - resolve
        result ? reject(1403) : resolve(true);
      })
    })
  };

  // Getting all ideas
  const getAll = async () => {
    return new Promise((resolve, reject) => {
      model.idea.findAll({ attributes: ['id', 'summary', 'reviewScore', 'workflowId', 'image'] })
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  // Getting one idea
  const getOne = async (id) => {
    return new Promise((resolve, reject) => {
      model.idea.findOne({
        where: {
          id
        },
        attributes: ['id', 'summary', 'reviewScore', 'workflowId', 'image']
      })
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  // Creating new idea
  const create = async (data) => {
    return new Promise((resolve, reject) => {
      model.idea.create(data)
        .then(result => resolve(result))
        .catch(error => reject(error));
    })
  };

  // Updating new idea
  const update = async (id, data) => {
    return new Promise((resolve, reject) => {
      model.idea.update(data, { 
        where: { id }
       })
        .then(async (result) => {
          const returnIdea = await model.idea.findOne({
            where: {
              id
            },
            attributes: ['id', 'summary', 'reviewScore', 'workflowId', 'image']
          })

          resolve(returnIdea);
        }
        )
        .catch(error => reject(error));
    })
  };

  // Deleting new idea
  const remove = async (id) => {
    return new Promise((resolve, reject) => {
      model.idea.destroy({
        where: {
          id
        }
      })
        .then(result => resolve(result))
        .catch(error => reject(error));
    })
  };

  const getReturnData = async (ideas) => {
    const returnData = [];

    for (var idea of ideas) {
      const returnAssigneeData = await assigneesService().getAll(idea.id);

      returnData.push({
        id: idea.id,
        summary: idea.summary,
        reviewScore: idea.reviewScore,
        workflowId: idea.workflowId,
        image: idea.image,
        assignees: returnAssigneeData
      });
    }

    return returnData;
  };

  return {
    create,
    getAll,
    getOne,
    update,
    remove,
    isExistData,
    getReturnData
  };
};

module.exports = ideaService;
