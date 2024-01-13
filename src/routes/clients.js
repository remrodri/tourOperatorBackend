var express = require('express');
var router = express.Router();
const {
  getAllClients,
  getClientById,
  createClient,
  updateClient,
  removeClient
} = require("../services/clientService");
const {
  validateNewClientData,
  setDate,
  validateUpdateClientData,
  updateDate
} = require('../middlewares/clientMidd');

router.get('/', async function (req, res) {
  const result = await getAllClients();
  res.send(result);
})
router.get('/:id', async function (req, res) {
  const { params } = req;
  const { id } = params;
  const result = await getClientById(id);
  res.send(result);
})
router.post('/', validateNewClientData,setDate, async function (req, res) {
  const { body } = req;
  const result = await createClient(body);
  res.send(result);
});
router.patch('/:id',validateUpdateClientData,updateDate, async function (req, res) {
  const { params, body } = req;
  const { id } = params;
  const result = await updateClient(id, body);
  res.send(result);
})
router.delete('/:id', async function (req, res) {
  const { params } = req;
  const { id } = params;
  const result = await removeClient(id);
  res.send(result);
})
module.exports = router;