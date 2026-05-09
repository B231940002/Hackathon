const express = require("express");

const {
  loginAdmin,
  getAdminsBySchool,
} = require("../controllers/admin.controller");

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/school/:school_id", getAdminsBySchool);

module.exports = router;