const {
  getAllUsersDB,
  getByIdDB,
} = require('../repository/userRepository');

async function getAllUsers() {
  const resultFromDB = await getAllUsersDB();
  return resultFromDB;
}

async function getById(id) {
  const result = await getByIdDB(id);
  return result;
}

module.exports = {
  getAllUsers,
  getById,
  };