const inspector = require("schema-inspector");
const { createLog } = require("../services/logService");

const userSchema = {
  type: "object",
  properties: {
    firstName: { type: "string", maxLength: 25 },
    lastName: { type: "string", maxLength: 25 },
    //userName: { type: "string", maxLength: 25 },
    roleId: { type: "string" },
    //qrCode: { type: "string" },
    phone: { type: "string", maxLength: 8 },
    email: { type: "email", pattern: "email", maxLength: 30 },
    //status: { type: "boolean" },
    ci: { type: "string", maxLength: 10 },
    //password: { type: "string" },
  },
};

async function validateNewUserData(req, res, next) {
  try {
    const { body } = req;
    const resultValidation = inspector.validate(userSchema, body);
    if (resultValidation.valid) {
      // await createLog()
      
      return next();
    }  
  } catch (error) {
    console.log(`Error validating new user data: ${error}`);
    // res.status(400).send({ error });
    res.status(400).send(resultValidation.error);
  }
  
}

function sanitizeUserData(req, res, next) {
  const { body } = req;
  let now = Date();
  // body.userName = 'usuario'; 
  body.createAt = now;
  body.updateAt = now;
  body.status = true; // By default the users are active
  body.password = 'contraseña';
  //console.log(body.createAt);
  //console.log(body);
  next();
  return;
}

function updateUpdateAt(req, res, next) {
  const { body } = req;
  body.updateAt = Date();
  //console.log(body.updateAt)
  next();
  return;
}

function validateUpdateUserData(req, res, next) {
  const { body } = req;
  const updateSchema = userSchema;
  updateSchema.properties.firstName.optional = true;
  updateSchema.properties.lastName.optional = true;
  //updateSchema.properties.userName.optional = true;
  updateSchema.properties.roleId.optional = true;
  //updateSchema.properties.qrCode.optional = true;
  updateSchema.properties.phone.optional = true;
  updateSchema.properties.email.optional = true;
  //updateSchema.properties.status.optional = true;
  updateSchema.properties.ci.optional = true;
  //updateSchema.properties.createAt.optional = true;
  //updateSchema.properties.updateAt.optional = true;
  // updateSchema.properties.password.optional = true;
  const resultValidation = inspector.validate(userSchema, body);
  //console.log(body)
  if (resultValidation.valid) {
    next();
    return;
  }
  res.status(400).send(resultValidation.error);
}
module.exports = {
  validateNewUserData,
  validateUpdateUserData,
  sanitizeUserData,
  updateUpdateAt,
};
