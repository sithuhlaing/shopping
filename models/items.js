'use strict';

module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define('Item', {
    id                 : {
                            type: DataTypes.BIGINT(20), 
                            primaryKey: true, 
                            autoIncrement: true
                         },
    name               : DataTypes.STRING(30),
    description        : DataTypes.TEXT,
    category_id        : DataTypes.BIGINT(20),
    price              : DataTypes.DECIMAL(11),
    img_url            : DataTypes.STRING(20)
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return Item;
};