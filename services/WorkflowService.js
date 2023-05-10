const model = require('../models');
const Op = require('sequelize').Op;
const util = require('../utils/Crypto');


const workflowService = () => {
  // Checking the already exsit workflow
  const isExistData = (name) => {
    return new Promise((resolve, reject) => {
      model.workflow.findOne({
        where: {
          name
        },
        attributes: ['id']
      }).then((result) => {
        // if data exsit - reject
        // else - resolve
        result ? reject(1403) : resolve(true);
      })
    })
  };

  // Getting all workflows
  const getAll = async () => {
    return new Promise((resolve, reject) => {
      model.workflow.findAll({ attributes: ['id', 'name'] })
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  // Getting one workflow
  const getOne = async (id) => {
    return new Promise((resolve, reject) => {
      model.workflow.findOne({
        where: {
          id
        },
        attributes: ['id', 'name']
      })
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  // Creating new workflow
  const create = async (data) => {
    return new Promise((resolve, reject) => {
      model.workflow.create(data)
        .then(result => resolve(result))
        .catch(error => reject(error));
    })
  };

  // Updating new workflow
  const update = async (id, data) => {
    return new Promise((resolve, reject) => {
      model.workflow.update(data, { 
        where: { id }
       })
        .then(async (result) => {
          const returnWorkFlow = await model.workflow.findOne({
            where: {
              id
            },
            attributes: ['id', 'name']
          })

          resolve(returnWorkFlow);
        }
        )
        .catch(error => reject(error));
    })
  };

  // Deleting new workflow
  const remove = async (id) => {
    return new Promise((resolve, reject) => {
      model.workflow.destroy({
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

module.exports = workflowService;
