
const { ObjectId } = require('mongodb');
const { connectDB, getClient, closeDB,dbName } = require('../services/db');

const getAllUsersDB = async () => {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('users');
    const users = await collection.find({}).toArray();
    return users;
  } catch (error) {
    console.error('Error al recuperar usuarios', error);
    throw new Error('Error interno del servidor');
  }
}

async function getByIdDB(id) { 
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('users');
    const result = await collection.findOne({ _id: new ObjectId(id) });
    console.log(result);
    return result;
  } catch (error) {
    console.error('Error al recuperar usuarios', error);
    throw new Error('Error interno del servidor');
  }
}
module.exports = {
  getAllUsersDB,
  getByIdDB,
};