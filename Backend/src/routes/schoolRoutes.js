const express = require("express");
const {
  createSchool,
  getAllSchools,
  getSchoolById,
  updateSchool,
  deleteSchool,
} = require("../controller/schoolController");

const router = express.Router();

router.post("/", createSchool);
router.get("/", getAllSchools);
router.get("/:schoolId", getSchoolById);
router.patch("/:schoolId", updateSchool);
router.delete("/:schoolId", deleteSchool);

module.exports = router;