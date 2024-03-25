const { ObjectId } = require("mongodb");
const { getClient, dbName } = require("../services/db");

const getAllLogsDB = async () => {
  try {
    const client = getClient();
    const db = client.db(dbName);
    const collection = db.collection('logs');
    const logs = await collection.find({}).toArray();
    return logs;
  } catch (error) {
    console.error('Error  getting all clients from DB', error);
    throw new Error('Server error');
  }
}

async function getLogByIdDB(id) { }
async function createLogDB(data) { }
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