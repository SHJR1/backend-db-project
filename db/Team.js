const {Sequelize, sequelize} = require('./db');

const Team = sequelize.define('team', {
  name: Sequelize.STRING,
  location: Sequelize.STRING,
  wins: Sequelize.INTEGER,
  loses: Sequelize.INTEGER,
  stadium: Sequelize.STRING
});

module.exports = { Team };
