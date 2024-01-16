var express = require('express');
const {
  getAllTourPackages,
  getTourPackageById, 
  createTourPackage,
  updateTourPackage,
  removeTourPackage } = require('../services/tourPackageService');
  
const {
  validateNewTourPackageData,
  addCreateAtUpdateAtDate,
  validateUpdateTourPackagaData,
  updateUpdateAtDate
} = require('../middlewares/tourPackageMidd');
var router = express.Router();

router.get('/', async function (req, res) {
  const result = await getAllTourPackages();
  res.send(result);
});
router.get('/:id', async function (req, res) {
  const { params } = req;
  const { id } = params;
  const result = await getTourPackageById(id);
  res.send(result);
});
router.post('/', validateNewTourPackageData,addCreateAtUpdateAtDate, async function (req, res) {
  const { body } = req;
  const result = await createTourPackage(body);
  res.send(result);
});
router.patch('/:id', validateUpdateTourPackagaData,updateUpdateAtDate, async function (req, res) {
  const { params, body } = req;
  const { id } = params;
  const result = await updateTourPackage(id, body);
  res.send(result);
});
router.delete('/:id', async function (req, res) {
  const { params } = req;
  const { id } = params;
  const result = await removeTourPackage(id);
  res.send(result);
});
module.exports = router;