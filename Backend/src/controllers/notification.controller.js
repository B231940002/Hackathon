const { db } = require("../config/firebase");

const parseTime = (value) => {
  if (!value) return 0;

  if (value instanceof Date) {
    return value.getTime();
  }

  if (typeof value.toDate === "function") {
    return value.toDate().getTime();
  }

  if (typeof value === "object" && typeof value._seconds === "number") {
    return value._seconds * 1000;
  }

  const parsed = new Date(value).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
};

const serializeTime = (value) => {
  if (!value) return null;

  if (value instanceof Date) {
    return value.toISOString();
  }

  if (typeof value.toDate === "function") {
    return value.toDate().toISOString();
  }

  if (typeof value === "object" && typeof value._seconds === "number") {
    return new Date(value._seconds * 1000).toISOString();
  }

  return value;
};

const getNotificationsByAdmin = async (req, res) => {
  try {
    const { admin_id } = req.params;

    if (!admin_id) {
      return res.status(400).json({
        success: false,
        message: "admin_id шаардлагатай.",
      });
    }

    const snapshot = await db
      .collection("notifications")
      .where("admin_id", "==", admin_id)
      .get();

    const notifications = snapshot.docs
      .map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,
          ...data,
          created_at: serializeTime(data.created_at),
          read_at: serializeTime(data.read_at),
        };
      })
      .sort((a, b) => parseTime(b.created_at) - parseTime(a.created_at));

    return res.status(200).json({
      success: true,
      count: notifications.length,
      data: notifications,
    });
  } catch (error) {
    console.error("GET NOTIFICATIONS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Notification авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

const markNotificationAsRead = async (req, res) => {
  try {
    const { notification_id } = req.params;

    if (!notification_id) {
      return res.status(400).json({
        success: false,
        message: "notification_id шаардлагатай.",
      });
    }

    const notificationRef = db
      .collection("notifications")
      .doc(notification_id);

    const notificationDoc = await notificationRef.get();

    if (!notificationDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Notification олдсонгүй.",
      });
    }

    await notificationRef.update({
      is_read: true,
      read_at: new Date(),
    });

    return res.status(200).json({
      success: true,
      message: "Notification уншсан төлөвтэй боллоо.",
    });
  } catch (error) {
    console.error("MARK NOTIFICATION READ ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Notification update хийхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

module.exports = {
  getNotificationsByAdmin,
  markNotificationAsRead,
};