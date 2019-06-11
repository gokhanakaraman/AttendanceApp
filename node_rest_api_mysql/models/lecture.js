'use strict';
module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define('Lectures', {
    name: DataTypes.STRING,
    start: DataTypes.STRING,
    end: DataTypes.STRING,
    code: DataTypes.STRING
  });

  Model.associate = function(models){
      this.Users = this.belongsToMany(models.User, {through: 'UserLecture'});
  };

  Model.prototype.toWeb = function (pw) {
      let json = this.toJSON();
      return json;
  };

  return Model;
};