'use strict';

const workflowService = require('../services/WorkflowService');

const workflowController = () => {
  const getAll = async (req, res, next) => {
    try {
      const workflow = await workflowService().getAll();
      return res.r(workflow);
    } catch (error) {
      return next(error);
    }
  };

  const getOne = async (req, res, next) => {
    try {
      const id = req.params.id;
      const workflow = await workflowService().getOne(id);
      return res.r(workflow);
    } catch (error) {
      return next(error);
    }
  };

  const create = async (req, res, next) => {
    let result;

    try {
      const workflowData = {
        name: req.body.name,
        userId: req.userId
      };

      await workflowService().isExistData(workflowData.name);
      const workflow = await workflowService().create(workflowData);

      result = {
        id: workflow.id,
        name: workflow.name
      }

    } catch (error) {
      return next(error);
    }

    return res.r(result);
  };

  const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const workflowData = {
        name: req.body.name
      }
      const workflow = await workflowService().update(id, workflowData);
      return res.r(workflow);
    } catch (error) {
      return next(error);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const id = req.params.id;
      const workflow = await workflowService().remove(id);
      return res.r({
        message: "Successfully Deleted."
      });
    } catch (error) {
      return next(error);
    }
  };

  return {
    getAll,
    getOne,
    create,
    update,
    remove
  };
};

module.exports = workflowController;
