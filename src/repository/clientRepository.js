const { ObjectId } = require("mongodb");
const { getClient, dbName } = require("../services/db")

const getAllClientsDB = async () => {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('clients');
    const clients = await collection.find({}).toArray();
    //console.log(clients);
    return clients;
  } catch (error) {
    console.error('Error al recuperar clientes', error);
    throw new Error('Error interno del servidor');
  }
}

async function getClientByIdDB(id) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('clients');
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.log('Error al recuperar clientes', error);
    throw new Error('Error interno del servidor');
  }
}

async function createClientDB(data) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('clients');
    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    console.error('Error al insertar usuario', error);
    throw new Error('Error interno del servidor');
  }
}

async function updateClientDB(id, data) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('clients');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return result;
  } catch (error) {
    console.error(`Error al actualizar el cliente con id ${id}:`, error);
    throw new Error('Error interno del servidor');
  }
}
async function removeClientDB(id) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('clients');
    const result = await collection.deleteOne(
      { _id: new ObjectId(id) }
    );
    return result;
  } catch (error) {
    console.log('Error en la eliminacion del cliente', error);
    throw new Error('Error interno del servidor');
  }
}
module.exports = {
  getAllClientsDB,
  getClientByIdDB,
  createClientDB,
  updateClientDB,
  removeClientDB,
}