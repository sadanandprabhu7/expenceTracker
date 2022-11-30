const Sequelize = require("sequelize");

const sequelize = new Sequelize("expence", "root", "sada123@", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
