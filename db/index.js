const {Team} = require('./Team');
const {User} = require('./User');
const {sequelize, Sequelize} = require('./db');

module.exports = {
    Team,
    User,
    sequelize,
    Sequelize
};
