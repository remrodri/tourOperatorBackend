var express = require('express');
var router = express.Router();

const {
  getAllUsers,
  getById
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

module.exports = router;
