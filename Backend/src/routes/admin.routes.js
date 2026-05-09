const express = require("express");
const router = express.Router();

const {
  createAdmin,
  getAdminsBySchool,
} = require("../controllers/admin.controller");

router.post("/", createAdmin);
router.get("/school/:school_id", getAdminsBySchool);

module.exports = router;