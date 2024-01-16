const {
  getAllTourPackageSalesDB,
  getTourPackageSaleByIdDB,
  createTourPackageSaleDB,
  updateTourPackageSaleDB,
  removeTourPackageSaleDB
} = require("../repository/tourPackageSaleRepository");

async function getAllTourPackageSales() {
  const resultFromDB = await getAllTourPackageSalesDB();
  return resultFromDB;
}

async function getTourPackageSaleById(id) {
  const result = await getTourPackageSaleByIdDB(id);
  return result;
}

async function createTourPackageSale(data) {
  const result = await createTourPackageSaleDB(data);
  return result;
}

async function updateTourPackageSale(id,data) {
  const result = await updateTourPackageSaleDB(id, data);
  return result;
}

async function removeTourPackageSale(id) {
  const result = await removeTourPackageSaleDB(id);
  return result;
}
module.exports = {
  getAllTourPackageSales,
  getTourPackageSaleById,
  createTourPackageSale,
  updateTourPackageSale,
  removeTourPackageSale
}