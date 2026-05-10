const express = require("express");
const router = express.Router();

const {
  createReport,
  getReportsForAdmin,
  getReportsBySchool,
  updateReportStatus,
} = require("../controllers/report.controller");

router.post("/", createReport);
router.get("/admin/:admin_id", getReportsForAdmin);
router.get("/school/:school_id", getReportsBySchool);
router.patch("/:report_id/status", updateReportStatus);

module.exports = router;
