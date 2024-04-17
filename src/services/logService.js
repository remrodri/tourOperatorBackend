const {
  getAllLogsDB,
  getLogByIdDB,
  createLogDB,
  updateLogDB,
  removeLogDB
} = require('../repository/logRepository');

async function getAllLogs() { }
async function getLogById() { }
//recepcion de los datos obtenidos de la bd mediante logRepository
async function createLog(data) { 
  try {
    const result = await createLogDB(data)
    return  { status: 'success', data: result };
  } catch (error) {
    console.log("Error en el controlador del metodo createLog", error);
    return { status: "error", msg: "Algo salio mal"};
  }
}
async function updateLog() { }
async function removeLog() { }

module.exports = {
  getAllLogs,
  getLogById,
  createLog,
  updateLog,
  removeLog,
};