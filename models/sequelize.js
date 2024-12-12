const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("todos", "postgres", "postgres", {
  host: "localhost",
  port: 5432,
  dialect: "postgres", // Specifies PostgreSQL as the dialect
  logging: false, // Disable logging for cleaner output (optional)
});

module.exports.sequelize = sequelize;
