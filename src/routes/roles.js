var express = require('express');
var router = express.Router();
const {
  getAllRoles,
  getRoleById,
  createRole,
  updateRole,
  removeRole
} = require('../services/roleService');

// Get all Roles
router.get('/', async function (req, res, next) { 
  try {
    const result = await getAllRoles();
    res.send(result);
  } catch (error) {
    if ("No Such Role Exists!") {
      return res.status(404).json({message: error});
    } else {
      res.status(500).json({ message: 'Internal Server Error!' });
    }
  }
});

// Get a role by its ID
router.get('/:id', async function (req, res) { 
  try {
    const { params } = req;
    const { id } = params;
    const role = await getRoleById(id);
    res.send(role);
  } catch (error) {
    // res.status(400).json({ error });
    if ("No such Role exists!") {
      res.status(404).json({ message : 'No Such Role Exists!'})
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});
router.post('/', async function (req, res) { });
router.patch('/:id', async function (req, res) { });
router.delete('/:id', async function(req,res){});

module.exports = router;
