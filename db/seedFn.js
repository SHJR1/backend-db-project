const {sequelize} = require('./db');
const {Team} = require('./');
const {teams} = require('./seedData');

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await Team.bulkCreate(teams);
};

module.exports = seed;
