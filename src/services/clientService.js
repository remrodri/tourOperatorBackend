const {
  getAllClientsDB,
  getClientByIdDB,
  createClientDB,
  updateClientDB,
  removeClientDB
} = require("../repository/clientRepository");

async function getAllClients() {
  const result = await getAllClientsDB();
  //return result.rows;
  return result;
}
async function getClientById(id) {
  const result = await getClientByIdDB(id);
  return result;
}

async function createClient(data) {
  const result = await createClientDB(data);
  return result;
}
async function updateClient(id, data) {
  const result = await updateClientDB(id, data)
  return result;
}
async function removeClient(id) {
  const result = await removeClientDB(id);
  return result;
}
module.exports = {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  removeClient
}