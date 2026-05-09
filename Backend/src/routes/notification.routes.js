const express = require("express");
const router = express.Router();

const {
  getNotificationsByAdmin,
  markNotificationAsRead,
} = require("../controllers/notification.controller");

router.get("/admin/:admin_id", getNotificationsByAdmin);
router.patch("/:notification_id/read", markNotificationAsRead);

module.exports = router;