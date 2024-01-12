const {
  getAllUsersDB,
  getByIdDB,
  createDB
} = require('../repository/userRepository');

async function getAllUsers() {
  const resultFromDB = await getAllUsersDB();
  return resultFromDB;
}

async function getById(id) {
  const result = await getByIdDB(id);
  return result;
}

async function create(data) {
  const result = await createDB(data);
  return result;
}

module.exports = {
  getAllUsers,
  getById,
  create
  };