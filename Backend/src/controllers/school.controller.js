const { db, admin } = require("../config/firebase");

const createSchool = async (req, res) => {
  try {
    const {
      admin_id,
      school_name,
      school_city,
      school_address,
      latitude,
      longitude,
    } = req.body;

    if (!admin_id) {
      return res.status(400).json({
        success: false,
        message: "admin_id шаардлагатай.",
      });
    }

    if (!school_name) {
      return res.status(400).json({
        success: false,
        message: "school_name шаардлагатай.",
      });
    }

    const result = await db.runTransaction(async (transaction) => {
      const adminRef = db.collection("admins").doc(admin_id);
      const adminDoc = await transaction.get(adminRef);

      if (!adminDoc.exists) {
        throw new Error("ADMIN_NOT_FOUND");
      }

      const adminData = adminDoc.data();

      if (adminData.school_id && adminData.school_id.trim() !== "") {
        throw new Error("ADMIN_ALREADY_HAS_SCHOOL");
      }

      const counterRef = db.collection("counters").doc("schools");
      const counterDoc = await transaction.get(counterRef);

      let nextNumber = 1;

      if (counterDoc.exists) {
        const counterData = counterDoc.data();
        nextNumber = (counterData.last_number || 0) + 1;
      }

      const schoolCode = `SCH${String(nextNumber).padStart(3, "0")}`;
      const schoolRef = db.collection("schools").doc();

      const newSchool = {
        school_id: schoolRef.id,
        school_code: schoolCode,

        school_name: school_name.trim(),
        school_city: school_city || "",
        school_address: school_address || "",

        latitude: latitude || null,
        longitude: longitude || null,

        admin_id: admin_id,
        is_active: true,

        created_at: admin.firestore.FieldValue.serverTimestamp(),
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      };

      transaction.set(schoolRef, newSchool);

      transaction.update(adminRef, {
        school_id: schoolRef.id,
        school_code: schoolCode,
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      });

      transaction.set(
        counterRef,
        {
          last_number: nextNumber,
          updated_at: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      return newSchool;
    });

    return res.status(201).json({
      success: true,
      message: "Сургууль амжилттай бүртгэгдлээ.",
      data: result,
    });
  } catch (error) {
    console.error("CREATE SCHOOL ERROR:", error);

    if (error.message === "ADMIN_NOT_FOUND") {
      return res.status(404).json({
        success: false,
        message: "Admin олдсонгүй.",
      });
    }

    if (error.message === "ADMIN_ALREADY_HAS_SCHOOL") {
      return res.status(409).json({
        success: false,
        message: "Энэ admin аль хэдийн сургууль бүртгэсэн байна.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Сургууль бүртгэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};
const getSchools = async (req, res) => {
  try {
    const snapshot = await db
      .collection("schools")
      .orderBy("school_code", "asc")
      .get();

    const schools = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      success: true,
      count: schools.length,
      data: schools,
    });
  } catch (error) {
    console.error("GET SCHOOLS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Сургуулиуд авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

const getSchoolById = async (req, res) => {
  try {
    const { school_id } = req.params;

    if (!school_id) {
      return res.status(400).json({
        success: false,
        message: "school_id шаардлагатай.",
      });
    }

    const doc = await db.collection("schools").doc(school_id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Сургууль олдсонгүй.",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        id: doc.id,
        ...doc.data(),
      },
    });
  } catch (error) {
    console.error("GET SCHOOL BY ID ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Сургуулийн мэдээлэл авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

module.exports = {
  createSchool,
  getSchools,
  getSchoolById,
};