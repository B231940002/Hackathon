const express = require("express");
const router = express.Router();

const {
  createSchool,
  getSchools,
  getSchoolById,
} = require("../controllers/school.controller");

router.post("/", createSchool);
router.get("/", getSchools);
router.get("/:school_id", getSchoolById);

module.exports = router;