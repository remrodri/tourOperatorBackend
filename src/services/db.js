const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'pruebas';
let client;
const connectDB = async () => {
  try {
    client = await MongoClient.connect(url);
    console.log("Base de datos conectada");
  } catch (error) {
    console.log(`Error al conectar a la base de datos ${error}`);
  }
}
const getClient = () => client;
const closeDB = () => {
  if (client) {
    client.close();
    console.log('Conexion a la bd cerrada');
  }
};

module.exports = {
  connectDB,
  getClient,
  closeDB
};
