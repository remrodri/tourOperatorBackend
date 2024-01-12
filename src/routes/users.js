var express = require('express');
var router = express.Router();

const {
  getAllUsers,
  getById,
  create,
  update
} = require('../services/userService');
const { get } = require('.');

/* GET users listing. */
router.get('/',async function(req, res, next) {
  const result = await getAllUsers();
  res.send(result);
});

/* GETBYID users */
router.get('/:id', async function (req,res) {
  const { params } = req;
  const { id } = params;
  const result = await getById(id);
  res.send(result);
})

/* create user*/
router.post('/', async function (req, res) {
  const { body } = req;
  const result = await create(body);
  res.send(result);
});

/*update user*/
router.patch('/:id', async function (req, res) {
  const { params, body } = req;
  const { id } = params;
  const result = await update(id, body);
  res.send(result);
})
module.exports = router;
