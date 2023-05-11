'use strict';

const ideaService = require('../services/IdeaService');
const reviewService = require('../services/ReviewService');

const ideaController = () => {
  const getAll = async (req, res, next) => {
    try {
      const reviews = await reviewService().getAll(req.userId, req.ideaId);
      return res.r(reviews);
    } catch (error) {
      return next(error);
    }
  };

  const create = async (req, res, next) => {
    let result;

    try {
      const reviewData = {
        userId: req.userId,
        ideaId: req.body.ideaId,
        score: req.body.score
      };

      await reviewService().isExistData(reviewData.userId, reviewData.ideaId);
      const review = await reviewService().create(reviewData);
      const reviews = await reviewService().getAll(null, reviewData.ideaId);
      let count = 0, sum = 0;
      sum = reviews.reduce(function (sum, item, index) {
        count++;
        return sum + item.score;
      }, 0);
      
      const idea = await ideaService().update(reviewData.ideaId, {
        reviewScore: Math.round(sum / count)
      });

      result = {
        id: review.id,
        userId: review.userId,
        ideaId: review.ideaId,
        score: review.score,
        ideaScore: idea.reviewScore
      }

    } catch (error) {
      return next(error);
    }

    return res.r(result);
  };

  return {
    getAll,
    create
  };
};

module.exports = ideaController;
