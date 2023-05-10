'use strict';

module.exports = (sequelize, DataTypes) => {
  const Idea = sequelize.define('idea', {
    summary: {
      type: DataTypes.TEXT
    },
    image: {
      type: DataTypes.STRING
    },
    reviewScore: {
      type: DataTypes.FLOAT
    }
  });

  Idea.associate = (models) => {
    models.idea.belongsTo(models.user);
    models.idea.hasMany(models.review);
    models.user.hasMany(models.assignees);
  };

  return Idea;
};
