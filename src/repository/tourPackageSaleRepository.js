const { ObjectId } = require("mongodb");
const { getClient, dbName } = require("../services/db");

const collectionName = "tourPackageSales";

const getAllTourPackageSalesDB = async () => {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const tourPackageSales = await collection.find({}).toArray();
    return tourPackageSales;
  } catch (error) {
    console.error("Error al recuperar las ventas de paquetes turisticos");
    throw new Error("Error interno del servidor");
  }
};

async function getTourPackageSaleByIdDB(id) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error("Error al recuperar las ventas de paquetes turisticos");
    throw new Error("Error interno del servidor");
  }
}
async function createTourPackageSaleDB(data) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    console.error("Error al insertar un venta de packete turistico", error);
    throw new Error("Error interno del servidor");
  }
}

async function updateTourPackageSaleDB(id, data) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return result;
  } catch (error) {
    console.error('Error en la actualizacion de la venta de paquete turistico', error);
    throw new Error('Error interno del servidor');
  }
}
async function removeTourPackageSaleDB(id) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const result = await collection.deleteOne(
      { _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error('Error en la eliminacion de la venta del paquete turistico', error);
    throw new Error('Error interno del servidor');
  }
}

module.exports = {
  getAllTourPackageSalesDB,
  getTourPackageSaleByIdDB,
  createTourPackageSaleDB,
  updateTourPackageSaleDB,
  removeTourPackageSaleDB
};
