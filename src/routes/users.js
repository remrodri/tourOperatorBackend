var express = require('express');
var router = express.Router();

const {
  getAllUsers,
  getById,
  create,
  update,
  remove,
  getUserByParams
} = require('../services/userService');

const {
  validateNewUserData,
  validateUpdateUserData,
  sanitizeUserData,
  updateUpdateAt
} = require('../middlewares/userMidd');

/* GET users listing. */
router.get('/', async function (req, res, next) {
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
router.post('/',validateNewUserData,sanitizeUserData, async function (req, res) {
  const { body } = req;
  console.log('body::: ', body);
  const result = await create(body);
  res.send(result);
});

/*update user*/
router.patch('/:id',validateUpdateUserData,updateUpdateAt, async function (req, res) {
  const { params, body } = req;
  const { id } = params;
  const result = await update(id, body);
  res.send(result);
})

/*delete user*/
router.delete('/:id', async function (req, res) {
  try {
    const { params } = req;
    const { id } = params;
    const result = await remove(id); 
    res.send(result);
  } catch (error) {
    return next(error);
  }
})

router.post('/login', async function (req, res) {
  try {
    const { body } = req;
    console.log('body::: ', JSON.parse(JSON.stringify(body)));
    const result = await getUserByParams(body);
    // console.log('result::: ', JSON.parse(JSON.stringify(result)));
    res.send(result);

  } catch (error) {
    if (error.message === 'Usuario o contraseña incorrectos') {
      res.status(401).json({error:'Usuario o contraseña incorrectos'})
    } else {
      console.error('Error al procesar la solicitud de login', error);
      res.status(500). json({ error: 'Error interno del servidor' });
    }
  }
});
module.exports = router;
