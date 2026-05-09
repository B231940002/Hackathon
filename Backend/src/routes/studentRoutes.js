const express = require("express");

const {
  registerStudent,
  getAllStudents,
  getPendingStudents,
  getStudentById,
  approveStudent,
  rejectStudent,
} = require("../controller/studentController");

const router = express.Router();

router.post("/register", registerStudent);
router.get("/", getAllStudents);
router.get("/pending", getPendingStudents);
router.get("/:studentId", getStudentById);
router.patch("/:studentId/approve", approveStudent);
router.patch("/:studentId/reject", rejectStudent);

module.exports = router;