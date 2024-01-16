const {
  getAllTourPackagesDB,
  getTourPackageByIdDB,
  createTourPackageDB,
  updateTourPackageDB,
  removeTourPackageDB,

} = require("../repository/tourPackageRepository");

async function getAllTourPackages() {
  const result = await getAllTourPackagesDB();
  return result;
}
async function getTourPackageById(id) {
  const result = await getTourPackageByIdDB(id);
  return result;
}
async function createTourPackage(data) {
  const result = await createTourPackageDB(data);
  return result;
}
async function updateTourPackage(id, data) {
  const result = await updateTourPackageDB(id, data);
  return result;
}
async function removeTourPackage(id) {
  const result = await removeTourPackageDB(id);
  return result;
}
module.exports = {
  getAllTourPackages,
  getTourPackageById,
  createTourPackage,
  updateTourPackage,
  removeTourPackage,
}