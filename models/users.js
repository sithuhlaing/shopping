'use strict';

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    id        : {
      autoIncrement : true,
      primaryKey    : true,
      type          : DataTypes.INTEGER
    },
    firstname : {
      type          : DataTypes.STRING,
      notEmpty      : true
    },
    lastname  : {
      type          : DataTypes.STRING,
    },
    // username  : {
    //   type          : DataTypes.TEXT,
    //   // unique: true,
    //   // notNull: true
    // },
    // about     : {
    //   type          : DataTypes.TEXT
    // },
    email     : {
      type          : DataTypes.STRING,
      unique        : true,
      notNull       : true,
      isEmail       : true
    },
    password  : {
      type          : DataTypes.STRING,
      allowNull     : false
    },
    // last_login: {
    //   type          : DataTypes.DATE
    // },
    status    : {
      type          : DataTypes.ENUM('active', 'inactive'),
      defaultValue  : 'active'
    }
  });

  return User;
};