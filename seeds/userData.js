const { User } = require('../models');

const userdata = [
  {
    name: "MasterAcc",
    email: "techblog_main@yahoo.com",
    password: "password"
  }
];

const seedUsers = () => User.bulkCreate(userdata, {individualHooks: true, returning: true});

module.exports = seedUsers;