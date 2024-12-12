const { DataTypes } = require("sequelize");

const { sequelize } = require("./sequelize");

const usersModel = sequelize.define("users", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});



module.exports.usersModel = usersModel;
