const {Sequelize, sequelize} = require('./db');

const Team = sequelize.define('team', {
  name: Sequelize.STRING,
  logo: Sequelize.STRING,
  wins: Sequelize.INTEGER,
  loses: Sequelize.INTEGER,
  stadium: Sequelize.STRING,
  location: Sequelize.STRING
});

module.exports = { Team };
