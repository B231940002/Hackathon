const { db, admin } = require("../config/firebase");

const createSchool = async (req, res) => {
  try {
    const {
      school_name,
      school_city,
      school_address,
      latitude,
      longitude,
    } = req.body;

    if (!school_name) {
      return res.status(400).json({
        success: false,
        message: "school_name шаардлагатай.",
      });
    }

    const result = await db.runTransaction(async (transaction) => {
      const counterRef = db.collection("counters").doc("schools");
      const counterDoc = await transaction.get(counterRef);

      let nextNumber = 1;

      if (counterDoc.exists) {
        const counterData = counterDoc.data();
        nextNumber = (counterData.last_number || 0) + 1;
      }

      const schoolCode = `SCH${String(nextNumber).padStart(3, "0")}`;

      const schoolRef = db.collection("schools").doc();

      const schoolData = {
        school_id: schoolRef.id,
        school_code: schoolCode,

        school_name: school_name.trim(),
        school_city: school_city || "",
        school_address: school_address || "",

        latitude: latitude || null,
        longitude: longitude || null,

        is_active: true,

        created_at: admin.firestore.FieldValue.serverTimestamp(),
        updated_at: admin.firestore.FieldValue.serverTimestamp(),
      };

      transaction.set(schoolRef, schoolData);

      transaction.set(
        counterRef,
        {
          last_number: nextNumber,
          updated_at: admin.firestore.FieldValue.serverTimestamp(),
        },
        { merge: true }
      );

      return schoolData;
    });

    return res.status(201).json({
      success: true,
      message: "Сургууль амжилттай бүртгэгдлээ.",
      data: result,
    });
  } catch (error) {
    console.error("CREATE SCHOOL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Сургууль бүртгэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

const getSchools = async (req, res) => {
  try {
    const snapshot = await db.collection("schools").get();

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

    const doc = await db.collection("schools").doc(school_id).get();

    if (!doc.exists) {
      return res.status(404).json({
        success: false,
        message: "Сургууль олдсонгүй.",
      });
    }

    return res.status(200).json({
      success: true,
      data: doc.data(),
    });
  } catch (error) {
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