const { db } = require("../config/firebase");

const createSchool = async (req, res) => {
  try {
    const {
      school_name,
      school_code,
      school_city,
      school_address,
      latitude,
      longitude,
    } = req.body;

    if (!school_name || !school_code) {
      return res.status(400).json({
        message: "school_name болон school_code шаардлагатай.",
      });
    }

    const schoolRef = db.collection("schools").doc();

    const schoolData = {
      school_id: schoolRef.id,
      school_name,
      school_code,
      school_city: school_city || "",
      school_address: school_address || "",
      latitude: latitude || null,
      longitude: longitude || null,
      created_at: new Date(),
      updated_at: new Date(),
    };

    await schoolRef.set(schoolData);

    res.status(201).json({
      message: "Сургууль амжилттай бүртгэгдлээ.",
      data: schoolData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Сургууль бүртгэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

const getSchools = async (req, res) => {
  try {
    const snapshot = await db.collection("schools").get();

    const schools = snapshot.docs.map((doc) => doc.data());

    res.status(200).json({
      data: schools,
    });
  } catch (error) {
    res.status(500).json({
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
        message: "Сургууль олдсонгүй.",
      });
    }

    res.status(200).json({
      data: doc.data(),
    });
  } catch (error) {
    res.status(500).json({
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