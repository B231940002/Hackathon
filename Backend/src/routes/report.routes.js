const express = require("express");
const router = express.Router();

const {
  createReport,
  getReportsBySchool,
  updateReportStatus,
} = require("../controllers/report.controller");

router.post("/", createReport);
router.get("/school/:school_id", getReportsBySchool);
router.patch("/:report_id/status", updateReportStatus);

module.exports = router;