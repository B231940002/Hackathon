const express = require("express");

const {
  createSOS,
  getSOSBySchool,
  getActiveSOSBySchool,
  updateSOSStatus,
} = require("../controllers/sos.controller");

const router = express.Router();

router.post("/", createSOS);

router.get("/school/:school_id", getSOSBySchool);
router.get("/school/:school_id/active", getActiveSOSBySchool);

router.patch("/:sos_id/status", updateSOSStatus);

module.exports = router;