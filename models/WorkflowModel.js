'use strict';

module.exports = (sequelize, DataTypes) => {
  const Workflow = sequelize.define('workflow', {
    name: {
      type: DataTypes.STRING
    }
  });

  Workflow.associate = (models) => {
    models.workflow.belongsTo(models.user);
  };

  return Workflow;
};
