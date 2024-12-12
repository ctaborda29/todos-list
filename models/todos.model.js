const { DataTypes } = require("sequelize");

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
});

module.exports.todosModel = todosModel;
