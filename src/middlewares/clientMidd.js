const inspector = require('schema-inspector');

const clientSchema = {
  type: 'object',
  properties: {
    firstName: { type: 'string', maxLength: 25 },
    lastName: { type: 'string', maxLength: 25 },
    phone: { type: 'string', maxLength:8}
  }
}
function validateNewClientData(req, res, next) {
  const { body } = req;
  const resultValidation = inspector.validate(clientSchema, body);
  if (resultValidation.valid) {
    next();
    return;
  }
  res.status(400).send(resultValidation.error);
}
function setDate(req, res, next) {
  const { body } = req;
  const now = Date();
  body.createAt = now;
  body.updateAt = now;
  next();
  return;
}
function updateDate(req, res, next) {
  const { body } = req;
  body.updateAt = Date();
  next();
  return;
}

function validateUpdateClientData(req, res, next) {
  const { body } = req;
  const updateSchema = clientSchema;
  updateSchema.properties.firstName.optional = true;
  updateSchema.properties.lastName.optional = true;
  updateSchema.properties.phone.optional = true;
  const resultValidation = inspector.validate(clientSchema, body);
  if (resultValidation.valid) {
    next();
    return;
  }
  res.status(400).send(resultValidation.error);
}
module.exports = {
  validateNewClientData,
  setDate,
  updateDate,
  validateUpdateClientData,
}