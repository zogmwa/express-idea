'use strict';

const ideaService = require('../services/IdeaService');
const assigneesService = require('../services/AssigneesService');
const reviewService = require('../services/ReviewService');

const ideaController = () => {
  const getAll = async (req, res, next) => {
    try {
      const ideas = await ideaService().getAll(req.userId);
      const getReturnData = await ideaService().getReturnData(ideas, req.userId);
      return res.r(getReturnData);
    } catch (error) {
      return next(error);
    }
  };

  const getOne = async (req, res, next) => {
    try {
      const id = req.params.id;
      const idea = await ideaService().getOne(id, req.userId);
      const returnAssigneeData = await assigneesService().getAll(id);

      return res.r({
        id: idea[0].id,
        summary: idea[0].summary,
        reviewScore: idea[0].reviewScore,
        workflowId: idea[0].workflowId,
        image: idea[0].image,
        createdAt: idea[0].createdAt,
        ownerId: idea[0].userId,
        ownerName: idea[0].username,
        myScore: idea[0].score,
        assignees: returnAssigneeData
      });
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

      // await ideaService().isExistData(ideaData.summary);
      const idea = await ideaService().create(ideaData);
      const assignees = req.body.assignees;

      if (assignees && assignees.length > 0) {
        const assigneeData = [];
        assignees.map(aId => {
          assigneeData.push({
            userId: aId,
            ideaId: idea.id
          });
        })
        await assigneesService().assigne(assigneeData, idea.id);
      }
      const returnAssigneeData = await assigneesService().getAll(idea.id);


      result = {
        id: idea.id,
        summary: idea.summary,
        image: idea.image,
        reviewScore: idea.reviewScore,
        workflowId: idea.workflowId,
        createdAt: idea.createdAt,
        ownerId: idea.userId,
        assignees: returnAssigneeData
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
      const assignees = req.body.assignees;
      
      if (assignees && assignees.length > 0) {
        const assigneeData = [];
        assignees.map(aId => {
          assigneeData.push({
            userId: aId,
            ideaId: idea.id
          });
        })
        await assigneesService().assigne(assigneeData, id);
      }
      const returnAssigneeData = await assigneesService().getAll(idea.id);

      return res.r({
        summary: idea.summary,
        workflowId: idea.workflowId,
        image: idea.image,
        createdAt: idea.createdAt,
        ownerId: idea.userId,
        assignees: returnAssigneeData
      });
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
