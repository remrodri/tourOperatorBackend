const { ObjectId } = require('mongodb');
const { getClient, dbName } = require('../services/db');

const getAllTourPackagesDB = async () => {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('tourPackages');
    const tourPackages = await collection.find({}).toArray();
    return tourPackages;
  } catch (error) {
    console.log(`Error getting all tour packages: ${error}`);
    throw new Error('Error interno del servidor');
  }
}

async function getTourPackageByIdDB(id) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('tourPackages');
    const result = await collection.findOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.error('Error la recuperar tourPackages', error);
    throw new Error('Error interno del servidor');
  }
}

async function createTourPackageDB(data) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection("tourPackages");
    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    console.error('Error creando el paquete de viaje', error);
    throw new Error('Error interno del servidor');
  } 
}

async function updateTourPackageDB(id, data) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('tourPackages');
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return result;
  } catch (error) {
    console.error('Error en la actualizacion del paquete de viaje');
    throw new Error('Error interno del servidor');
  }
}
async function removeTourPackageDB(id) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('tourPackages');
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.log('Error en la eliminacion del paquete de viaje', error);
    throw new Error('Error interno del servidor');
  }
}
module.exports = {
  getAllTourPackagesDB,
  getTourPackageByIdDB,
  createTourPackageDB,
  updateTourPackageDB,
  removeTourPackageDB,
}