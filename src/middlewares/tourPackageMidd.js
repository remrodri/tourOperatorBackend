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
  updateSchema.properties.idCreator.optional = true;
  updateSchema.properties.tourPackageName.optional = true;
  updateSchema.properties.tourType.optional = true;
  const resultValidation = inspector.sanitize(updateSchema, body);
  if (resultValidation.valid) {
    next();
    return;
  }
  res.status(400).send(resultValidation.error);
}
module.exports = {
  validateNewTourPackageData,
  validateUpdateTourPackagaData,
};
