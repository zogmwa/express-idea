'use strict';

module.exports = (sequelize, DataTypes) => {
  const Assignees = sequelize.define('assignees');

  Assignees.associate = (models) => {
    models.assignees.belongsTo(models.user);
    models.assignees.belongsTo(models.idea);
  };

  return Assignees;
};
