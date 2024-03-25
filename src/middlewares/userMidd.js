const inspector = require("schema-inspector");

const userSchema = {
  type: "object",
  properties: {
    firstName: { type: "string", maxLength: 25 },
    lastName: { type: "string", maxLength: 25 },
    userName: { type: "string", maxLength: 25 },
    roleId: { type: "string" },
    qrCode: { type: "string" },
    phone: { type: "string", maxLength: 8 },
    email: { type: "string", pattern: "email", maxLength: 25 },
    status: { type: "boolean" },
    ci: { type: "string", maxLength: 10 },
    password: { type: "string" },
  },
};

function validateNewUserData(req, res, next) {
  const { body } = req;
  const resultValidation = inspector.validate(userSchema, body);
  if (resultValidation.valid) {
    next();
    return;
  }
  res.status(400).send(resultValidation.error);
}

function sanitizeUserData(req, res, next) {
  const { body } = req;
  let now = Date();
  body.createAt = now;
  body.updateAt = now;
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
  updateSchema.properties.userName.optional = true;
  updateSchema.properties.roleId.optional = true;
  updateSchema.properties.qrCode.optional = true;
  updateSchema.properties.phone.optional = true;
  updateSchema.properties.email.optional = true;
  updateSchema.properties.status.optional = true;
  updateSchema.properties.ci.optional = true;
  //updateSchema.properties.createAt.optional = true;
  //updateSchema.properties.updateAt.optional = true;
  updateSchema.properties.password.optional = true;
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
