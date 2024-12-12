const { DataTypes } = require("sequelize");
const { usersModel } = require("./users.model");
const { sequelize } = require("./sequelize");

const todosModel = sequelize.define("todos", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "user_id",
  },
});

// Add the association (foreign key)
todosModel.belongsTo(usersModel, {
  foreignKey: "user_id",
  targetKey: "id",
  as: "user",
});

usersModel.hasMany(todosModel, {
  foreignKey: "user_id",
});

module.exports.todosModel = todosModel;
