'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    salt: {
      type: DataTypes.STRING
    },
    fcmToken: {
      type: DataTypes.STRING
    }
  });

  User.associate = (models) => {
    // models.User.hasMany(models.Post);
  };

  return User;
};
