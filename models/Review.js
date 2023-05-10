'use strict';

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('review', {
    score: {
      type: DataTypes.FLOAT
    }
  });

  Review.associate = (models) => {
    models.review.belongsTo(models.idea);
  };

  return Review;
};
