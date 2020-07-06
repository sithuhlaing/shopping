'use strict';

module.exports = function(sequelize, DataTypes) {
  var Category = sequelize.define('Category', {
    id            : {
                      type: DataTypes.BIGINT(20), 
                      primaryKey: true, 
                      autoIncrement: true
                    },
    name          : DataTypes.STRING(30),
    description   : DataTypes.TEXT,
    root_id       : DataTypes.BIGINT(20)
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Category;
};