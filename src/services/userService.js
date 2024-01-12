const {
  getAllUsersDB,
  getByIdDB,
  createDB,
  updateDB,
  removeDB
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

async function update(id, data) {
  const result = await updateDB(id, data);
  return result;
}

async function remove(id) {
  const result = await removeDB(id);
  return result;
}
module.exports = {
  getAllUsers,
  getById,
  create,
  update,
  remove
  };