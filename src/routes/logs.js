var express = require("express");
var router = express.Router();
const {
  getAllLogs,
  getLogById,
  createLog,
  updateLog,
  removeLog,
} = require("../services/logService");

router.get("/", async function (req, res) {});
router.get("/:id", async function (req, res) {});
router.post("/", async function (req, res) {});
router.patch("/:id", async function (req, res) { });
router.delete("/:id", async function (req, res) { });

module.exports = router;