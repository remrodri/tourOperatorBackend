const { ObjectId } = require("mongodb");
const { connectDB, getClient, closeDB, dbName } = require("../services/db");

const getAllUsersDB = async () => {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection("users");
    const users = await collection.find({}).toArray();
    const refinedUsers = users.map(user => {
      const { password, createAt, updateAt, ...newUser } = user;
      return newUser;
    })
    return refinedUsers;
  } catch (error) {
    console.error("Error al recuperar usuarios", error);
    throw new Error("Error interno del servidor");
  }
};

async function getByIdDB(id) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection("users");
    const result = await collection.findOne({ _id: new ObjectId(id) });
    //console.log(result);
    return result;
  } catch (error) {
    console.error("Error al recuperar usuarios", error);
    throw new Error("Error interno del servidor");
  }
}

async function createDB(data) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection("users");
    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    console.error("Error al insertar usuario", error);
    throw new Error("error interno del servidor");
  }
}

async function updateDB(id, data) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection("users");
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return result;
  } catch (error) {
    console.error("Error en la actualización de datos", error);
    throw new Error("Error interno del servidor");
  }
}

async function removeDB(id) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection("users");
    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    return result;
  } catch (error) {
    console.log("Error en la eliminacion del usuario", error);
    throw new Error("Error interno del servidor");
  }
}

async function getUserByParamsDB(userName, password) {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection("users");
    const result = await collection.findOne({
      userName: userName,
      password: password,
    });
    if (!result) {
      throw new Error("Usuario o contraseña incorrectos");
    }
    delete result.createAt;
    delete result.password;
    delete result.updateAt;
    return result;
  } catch (error) {
    console.log("Error al buscar el usuario por parametros", error);
    throw error;
  }
}
module.exports = {
  getAllUsersDB,
  getByIdDB,
  createDB,
  updateDB,
  removeDB,
  getUserByParamsDB,
};
