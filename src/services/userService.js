const { getAllUsersDB } = require('../repository/userRepository');

async function getAllUsers() {
  const resultFromDB = await getAllUsersDB();
  return resultFromDB;
}

module.exports = {
  getAllUsers,
  };