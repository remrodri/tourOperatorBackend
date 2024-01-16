const inspector = require("schema-inspector");
const tourPackageSaleSchema = {
  type: "object",
  properties: {
    idAccountant: { type: "string", maxLength: 25 },
    idClient: { type: "string", maxLength: 25 },
    packs: { type: "number" },
    idTourPackage: { type: "string", maxLength: 25 },
    idTourType: { type: "string", maxLength: 25 },
    onAccount: {
      type: "array",
      items: { type: "object" },
    },
  },
};

function validateNewTourPackageSaleData(req, res, next) {
  const { body } = req;
  const resultValidation = inspector.validate(tourPackageSaleSchema, body);
  if (resultValidation.valid) {
    next();
    return;
  }
  res.status(400).send(resultValidation.error);
}

function addDate(req, res, next) {
  const { body } = req;
  const now = Date();
  body.createAt = now;
  body.updateAt = now;
  next();
  return;
}
function validateUpdateTourPackageSaleData(req, res, next) {
  const { body } = req;
  const updateSchema = tourPackageSaleSchema;
  updateSchema.properties.idAccountant.optional = true;
  updateSchema.properties.idClient.optional = true;
  updateSchema.properties.idTourPackage.optional = true;
  updateSchema.properties.idTourType.optional = true;
  updateSchema.properties.onAccount.optional = true;
  const resultValidation = inspector.validate(updateSchema, body);
  if (resultValidation.valid) {
    next();
    return;
  }
  res.status(400).send(resultValidation.error);
}
function updateDate(req, res, next) {
  const { body } = req;
  body.updateAt = Date();
  next();
  return;
}
module.exports = {
  validateNewTourPackageSaleData,
  addDate,
  validateUpdateTourPackageSaleData,
  updateDate,
};
