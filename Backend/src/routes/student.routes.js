const express = require("express");

const {
  registerStudent,
  loginStudent,
  getStudentsBySchool,
  verifyStudent,
} = require("../controllers/student.controller");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);

router.get("/school/:school_id", getStudentsBySchool);
router.patch("/:student_id/verify", verifyStudent);

module.exports = router;