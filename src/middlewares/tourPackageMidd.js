const inspector = require("schema-inspector");

const tourPackageSchema = {
  type: "object",
  properties: {
    idCreator: { type: "string", maxLength: 25 },
    tourPackageName: { type: "string", maxLength: 25 },
    tourType: {
      type: "array",
      items: {type:'object'},
    },
  },
};

function validateNewTourPackageData(req, res, next) {
  const { body } = req;
  const resultValidation = inspector.validate(tourPackageSchema, body);
  if (resultValidation.valid) {
    next();
    return;
  }
  res.status(400).send(resultValidation.error);
}

function validateUpdateTourPackagaData(req, res, next) {
  const { body } = req;
  const updateSchema = tourPackageSchema;
  updateSchema.properties.idCreator.optional = true;
  updateSchema.properties.tourPackageName.optional = true;
  updateSchema.properties.tourType.optional = true;
  const resultValidation = inspector.validate(updateSchema, body);
  if (resultValidation.valid) {
    next();
    return;
  }
  res.status(400).send(resultValidation.error);
}

function addCreateAtUpdateAtDate(req,res,next) {
  const { body } = req;
  const now = Date();
  body.createAt = now;
  body.updateAt = now;
  next();
  return;
}

function updateUpdateAtDate(req, res, next) {
  const { body } = req;
  body.updateAt = Date();
  next();
  return;
}
module.exports = {
  validateNewTourPackageData,
  validateUpdateTourPackagaData,
  addCreateAtUpdateAtDate,
  updateUpdateAtDate,
};
