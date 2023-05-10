'use strict';

const ideaService = require('../services/IdeaService');

const ideaController = () => {
  const getAll = async (req, res, next) => {
    try {
      const ideas = await ideaService().getAll();
      return res.r(ideas);
    } catch (error) {
      return next(error);
    }
  };

  const getOne = async (req, res, next) => {
    try {
      const id = req.params.id;
      const idea = await ideaService().getOne(id);
      return res.r(idea);
    } catch (error) {
      return next(error);
    }
  };

  const create = async (req, res, next) => {
    let result;

    try {
      const ideaData = {
        summary: req.body.summary,
        image: req.body.image,
        workflowId: req.body.workflowId,
        reviewScore: 0,
        userId: req.userId
      };

      await ideaService().isExistData(ideaData.summary);
      const idea = await ideaService().create(ideaData);

      result = {
        id: idea.id,
        summary: idea.summary,
        image: idea.image,
        reviewScore: idea.reviewScore,
        workflowId: idea.workflowId,
      }

    } catch (error) {
      return next(error);
    }

    return res.r(result);
  };

  const update = async (req, res, next) => {
    try {
      const id = req.params.id;
      const ideaData = {
        summary: req.body.summary,
        workflowId: req.body.workflowId,
        image: req.body.image
      }
      const idea = await ideaService().update(id, ideaData);
      return res.r(idea);
    } catch (error) {
      return next(error);
    }
  };

  const remove = async (req, res, next) => {
    try {
      const id = req.params.id;
      await ideaService().remove(id);
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

module.exports = ideaController;