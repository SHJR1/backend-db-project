const {sequelize} = require('./db');
const {Team} = require('./');
const {teams} = require('./seedData');

const seed = async () => {
  await sequelize.sync({ force: false }); // recreate db
  await Kitten.bulkCreate(teams);
};

module.exports = seed;
