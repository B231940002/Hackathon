const { db } = require("../config/firebase");

const createAdmin = async (req, res) => {
  try {
    const {
      school_id,
      admin_name,
      admin_email,
      password,
      role,
    } = req.body;

    if (!school_id || !admin_name || !admin_email || !password) {
      return res.status(400).json({
        message: "school_id, admin_name, admin_email, password шаардлагатай.",
      });
    }

    const adminRef = db.collection("admins").doc();

    const adminData = {
      admin_id: adminRef.id,
      school_id,
      admin_name,
      admin_email,
      password_hash: password,
      role: role || "school_admin",
      created_at: new Date(),
    };

    await adminRef.set(adminData);

    res.status(201).json({
      message: "Admin амжилттай үүслээ.",
      data: adminData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Admin үүсгэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

const getAdminsBySchool = async (req, res) => {
  try {
    const { school_id } = req.params;

    const snapshot = await db
      .collection("admins")
      .where("school_id", "==", school_id)
      .get();

    const admins = snapshot.docs.map((doc) => doc.data());

    res.status(200).json({
      data: admins,
    });
  } catch (error) {
    res.status(500).json({
      message: "Admin жагсаалт авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

module.exports = {
  createAdmin,
  getAdminsBySchool,
};