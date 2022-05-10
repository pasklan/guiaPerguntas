const Sequelize = require("sequelize");

const connection = new Sequelize("guiaperguntas", "root", "teste", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
