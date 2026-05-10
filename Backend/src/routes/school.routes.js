const express = require("express");

const {
  createSchool,
  getSchools,
  getSchoolById,
} = require("../controllers/school.controller");

const router = express.Router();

router.post("/", createSchool);
router.get("/", getSchools);
router.get("/:school_id", getSchoolById);

module.exports = router;