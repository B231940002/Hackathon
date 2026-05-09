const express = require("express");
const router = express.Router();

const {
  createSOS,
  getSOSBySchool,
  updateSOSStatus,
} = require("../controllers/sos.controller");

router.post("/", createSOS);
router.get("/school/:school_id", getSOSBySchool);
router.patch("/:sos_id/status", updateSOSStatus);

module.exports = router;