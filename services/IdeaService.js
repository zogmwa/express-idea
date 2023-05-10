const model = require('../models');

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
              id: result
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

  return {
    create,
    getAll,
    getOne,
    update,
    remove,
    isExistData
  };
};

module.exports = ideaService;
