'use strict';

module.exports = function(sequelize, DataTypes) {
  var Inventory = sequelize.define('Inventory', {
    id              : {
                        type: DataTypes.BIGINT(20), 
                        primaryKey: true, 
                        autoIncrement: true
                      },
    item_id         : DataTypes.BIGINT(20),
    actual_quantity : DataTypes.INTEGER(11),
    min_quantity    : DataTypes.INTEGER(11)
  }, {
    timestamps: false,
    classMethods: {
      associate: function(models) {
        
      }
    }
  });
  return Inventory;
};