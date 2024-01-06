const { MongoClient } = require('mongodb');
const { connectDB, getClient, closeDB } = require('../services/db');

const getAllUsersDB = async () => {
  try {
    const client = getClient();
    const db = client.db('pruebas');
    const collection = db.collection('user');
    const users = await collection.find({}).toArray();
    return users;
  } catch (error) {
    console.error('Error al recuperar usuarios', error);
    throw new Error('Error interno del servidor');
  }
}
module.exports = {
  getAllUsersDB
};