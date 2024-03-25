const {
  getAllRolesDB,
  getRoleByIdDB,
  createRoleDB,
  updateRoleDB,
  removeRoleDB
} = require("../repository/roleRepository");

async function getAllRoles() {
  try {
    const resultFromDB = await getAllRolesDB();
    return resultFromDB;
  } catch (error) {
    if ('No Such Role Exists!') {
      throw new Error(error.message);
    } else {
      console.log('Error in getting all roles from DB: ', error);
      throw error;
    }
  }
}

async function getRoleById(id) {
  try {
    const role = await getRoleByIdDB(id);
    return  role;
  } catch (error) {
    if (error.message === "No such Role exists!") {
      throw new Error(`${error.message}`);
    } else {
      console.error('error al buscar rol por id', error);
      throw error;
    }
  }
};
async function createRole(data) { }
async function updateRole(id, data) { }
async function removeRole(id) { }

module.exports = {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  removeRole
};
