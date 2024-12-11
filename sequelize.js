const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("todos", "postgres", "postgres", {
      host: "localhost",
      port: 5432,
      dialect: "postgres", // Specifies PostgreSQL as the dialect
      logging: false, // Disable logging for cleaner output (optional)
    });

    
const BD = sequelize.define(
          "todos",
          {
            title: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            completed: {
              type: DataTypes.BOOLEAN,
              allowNull: false,
            },
          },
        );

module.exports.sequelize = BD;