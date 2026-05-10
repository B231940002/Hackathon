const { db } = require("../config/firebase");

const getNotificationsByAdmin = async (req, res) => {
  try {
    const { admin_id } = req.params;

    const snapshot = await db
      .collection("notifications")
      .where("admin_id", "==", admin_id)
      .get();

    const notifications = snapshot.docs.map((doc) => doc.data());

    res.status(200).json({
      data: notifications,
    });
  } catch (error) {
    res.status(500).json({
      message: "Notification авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

const markNotificationAsRead = async (req, res) => {
  try {
    const { notification_id } = req.params;

    await db.collection("notifications").doc(notification_id).update({
      is_read: true,
      read_at: new Date(),
    });

    res.status(200).json({
      message: "Notification уншсан төлөвт орлоо.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Notification update хийхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

module.exports = {
  getNotificationsByAdmin,
  markNotificationAsRead,
};