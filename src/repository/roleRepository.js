const { ObjectId } = require('mongodb');
const { getClient, dbName } = require('../services/db');

const getAllRolesDB = async () => {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('roles');
    const roles = await collection.find({}).toArray();
    if (!roles) throw new Error('No Such Role Exists!')
    return roles;
  } catch (error) {
    console.error(`Error getting all role names: ${error}`);
    throw new Error('Internal Server Error');
  }
}

async function getRoleByIdDB(id) { 
  try {
    const client = getClient();
    const db = client.db(dbName);
    const rolesCollection = db.collection("roles");
    const result = await rolesCollection.findOne({ _id: new ObjectId(id) });
    if (!result) throw new Error('No such Role exists!');
    return result;
  } catch (error) {
    console.log(`Error getting role by id from DB: ${error}`);
    throw new Error('Error interno del servidor');
  }
}
async function createRoleDB(data) { }
async function updateRoleDB(id, data) { }
async function removeRoleDB(id) {}
module.exports = {
  getAllRolesDB,
  getRoleByIdDB,
  createRoleDB,
  updateRoleDB,
  removeRoleDB
};