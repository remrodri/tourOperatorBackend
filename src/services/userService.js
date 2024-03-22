const {
  getAllUsersDB,
  getByIdDB,
  createDB,
  updateDB,
  removeDB,
  getUserByParamsDB
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

async function getUserByParams(params) {
  try {
    const user = await getUserByParamsDB(params.userName, params.password);
    // delete user.password;
    // delete user.createAt;
    //delete user._id;
    // delete user.updateAt;
    return user
  } catch (error) {
    if (error.message === "Usuario o contraseña incorrectos") {
      throw new Error("Usuario o contraseña incorrectos");
    } else {
      console.error("error al buscar usuario por parametros", error);
      throw new Error("Error interno del servidor");
    }
  }
}
module.exports = {
  getAllUsers,
  getById,
  create,
  update,
  remove,
  getUserByParams
  };