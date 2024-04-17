const { ObjectId } = require("mongodb");
const { getClient, dbName } = require("../services/db");

//obtencion de todos las actividades registradas
const getAllLogsDB = async () => {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('logs');
    const logs = await collection.find({}).toArray();
    return logs;
  } catch (error) {
    console.error('Error  getting all logs from DB', error);
    throw new Error('Server error');
  }
}
//creacion de una actividad
async function createLogDB(data) { 
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('logs');
    const result = await collection.insertOne(data);
    return result;
  } catch (error) {
    console.log('Error creating log in DB: ', error);
    throw new Error('Server error');
  }
}


async function getLogByIdDB(id) { }
async function  updateLogDB(id, data) {}
function removeLogDB(id) { }
module.exports = {
  getAllLogsDB,
  getLogByIdDB,
  createLogDB,
  updateLogDB,
  removeLogDB
};

// Log example:
/*
{
  "date": ISODate("2019-07-30T14:58:06Z"),
  "user_id": ObjectId("5d33bafcdfadf93eceaabbbb"),
  "task_id": ObjectId("5d33bafeefadf93eceaabccc"),
  "timeSpent": 30, // in minutes
  "comment": ""
}
*/ 