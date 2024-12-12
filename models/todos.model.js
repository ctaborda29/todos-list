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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Add the association (foreign key)
todosModel.belongsTo(usersModel, {
  foreignKey: {
    name: "user_id", // This is the foreign key column in the todos table
    allowNull: false, // Ensures a todo must be associated with a user
  },
  onDelete: "CASCADE", // Delete todos if the associated user is deleted
});

usersModel.hasMany(todosModel, {
  foreignKey: "user_id",
});

module.exports.todosModel = todosModel;
