const express = require("express");
const router = express.Router();

const {
  registerStudent,
  getStudentsBySchool,
  verifyStudent,
} = require("../controllers/student.controller");

router.post("/register", registerStudent);
router.get("/school/:school_id", getStudentsBySchool);
router.patch("/:student_id/verify", verifyStudent);

module.exports = router;