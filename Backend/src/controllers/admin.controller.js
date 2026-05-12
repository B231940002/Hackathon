const { db } = require("../config/firebase");

// LOGIN ADMIN
const loginAdmin = async (req, res) => {
  try {
    const { username, admin_email, password } = req.body;

    const loginIdentifier = username || admin_email;

    if (!loginIdentifier || !password) {
      return res.status(400).json({
        success: false,
        message: "Admin email болон нууц үг шаардлагатай.",
      });
    }

    const normalizedIdentifier = loginIdentifier.trim().toLowerCase();

    let snapshot = await db
      .collection("admins")
      .where("username", "==", normalizedIdentifier)
      .limit(1)
      .get();

    if (snapshot.empty) {
      snapshot = await db
        .collection("admins")
        .where("admin_email", "==", normalizedIdentifier)
        .limit(1)
        .get();
    }

    if (snapshot.empty) {
      return res.status(401).json({
        success: false,
        message: "Admin email эсвэл нууц үг буруу байна.",
      });
    }

    const adminDoc = snapshot.docs[0];
    const adminData = adminDoc.data();

    if (!adminData.password_hash) {
      return res.status(400).json({
        success: false,
        message: "Энэ admin дээр password_hash field байхгүй байна.",
      });
    }

    if (adminData.password_hash !== password) {
      return res.status(401).json({
        success: false,
        message: "Admin email эсвэл нууц үг буруу байна.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Admin амжилттай нэвтэрлээ.",
      data: {
        admin_id: adminData.admin_id || adminDoc.id,

        // school холболтын мэдээлэл
        school_id: adminData.school_id || "",
        school_code: adminData.school_code || "",

        admin_name: adminData.admin_name || "",
        admin_email: adminData.admin_email || normalizedIdentifier,
        username: adminData.username || adminData.admin_email || normalizedIdentifier,
        role: adminData.role || "school_admin",
      },
    });
  } catch (error) {
    console.error("LOGIN ADMIN ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Admin нэвтрэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

// GET ADMINS BY SCHOOL
const getAdminsBySchool = async (req, res) => {
  try {
    const { school_id } = req.params;

    if (!school_id) {
      return res.status(400).json({
        success: false,
        message: "school_id шаардлагатай.",
      });
    }

    const snapshot = await db
      .collection("admins")
      .where("school_id", "==", school_id)
      .get();

    const admins = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      success: true,
      count: admins.length,
      data: admins,
    });
  } catch (error) {
    console.error("GET ADMINS BY SCHOOL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Admin жагсаалт авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

module.exports = {
  loginAdmin,
  getAdminsBySchool,
};