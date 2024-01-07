var express = require('express');
var router = express.Router();

const{getAllUsers}=require('../services/userService');
const { get } = require('.');

/* GET users listing. */
router.get('/',async function(req, res, next) {
  const result = await getAllUsers();
  res.send(result);
});

module.exports = router;
