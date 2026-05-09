const express = require("express");

const {
  registerStudent,
  loginStudent,
  getStudentsBySchool,
  getPendingStudents,
  verifyStudent,
} = require("../controllers/student.controller");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login", loginStudent);

// Admin дээр pending бүртгэлийн хүсэлтүүд авах
router.get("/pending", getPendingStudents);

router.get("/school/:school_id", getStudentsBySchool);

// Admin approve / reject хийх
router.patch("/:student_id/verify", verifyStudent);

module.exports = router;