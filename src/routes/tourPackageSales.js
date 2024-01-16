var express = require("express");
const {
  getAllTourPackageSales,
  getTourPackageSaleById,
  createTourPackageSale,
  updateTourPackageSale,
  removeTourPackageSale,
} = require("../services/tourPackageSaleService");
const {
  validateNewTourPackageSaleData,
  addDate,
  validateUpdateTourPackageSaleData,
  updateDate
} = require("../middlewares/tourPackageSaleMidd");

var router = express.Router();

router.get("/", async function (req, res, next) {
  const result = await getAllTourPackageSales();
  res.send(result);
});

router.get("/:id", async function (req, res) {
  const { params } = req;
  const { id } = params;
  const result = await getTourPackageSaleById(id);
  res.send(result);
});

router.post('/',validateNewTourPackageSaleData,addDate, async function (req, res) {
  const { body } = req;
  const result = await createTourPackageSale(body);
  res.send(result);
});
router.patch('/:id',validateUpdateTourPackageSaleData,updateDate, async function (req, res) {
  const { params, body } = req;
  const { id } = params;
  const result = await updateTourPackageSale(id, body);
  res.send(result);
});
router.delete('/:id', async function (req, res) {
  const { params } = req;
  const { id } = params;
  const result = await removeTourPackageSale(id);
  res.send(result);
})
module.exports = router;
