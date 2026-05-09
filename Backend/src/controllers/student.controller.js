const { db } = require("../config/firebase");

const registerStudent = async (req, res) => {
  try {
    const {
      school_code,
      student_first_name,
      student_last_name,
      student_phone_number,
      username,
      password,
      class_info,
    } = req.body;

    if (!school_code || !student_first_name || !student_last_name || !username || !password) {
      return res.status(400).json({
        message: "Шаардлагатай талбарууд дутуу байна.",
      });
    }

    const schoolSnapshot = await db
      .collection("schools")
      .where("school_code", "==", school_code)
      .limit(1)
      .get();

    if (schoolSnapshot.empty) {
      return res.status(404).json({
        message: "Сургуулийн код буруу байна.",
      });
    }

    const schoolData = schoolSnapshot.docs[0].data();

    const studentRef = db.collection("students").doc();

    const studentData = {
      student_id: studentRef.id,
      school_id: schoolData.school_id,
      student_first_name,
      student_last_name,
      student_phone_number: student_phone_number || "",
      username,
      password_hash: password,
      class_info,
      risk_score: 0,
      is_verified: false,
      verification_status: "pending",
      created_at: new Date(),
    };

    await studentRef.set(studentData);

    res.status(201).json({
      message: "Сурагч амжилттай бүртгэгдлээ. Админ баталгаажуулсны дараа ашиглах боломжтой.",
      data: studentData,
    });
  } catch (error) {
    res.status(500).json({
      message: "Сурагч бүртгэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

const getStudentsBySchool = async (req, res) => {
  try {
    const { school_id } = req.params;

    const snapshot = await db
      .collection("students")
      .where("school_id", "==", school_id)
      .get();

    const students = snapshot.docs.map((doc) => doc.data());

    res.status(200).json({
      data: students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Сурагчдын мэдээлэл авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

const verifyStudent = async (req, res) => {
  try {
    const { student_id } = req.params;
    const { status } = req.body;

    const isVerified = status === "approved";

    await db.collection("students").doc(student_id).update({
      is_verified: isVerified,
      verification_status: status,
      updated_at: new Date(),
    });

    res.status(200).json({
      message: "Сурагчийн баталгаажуулалт шинэчлэгдлээ.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Сурагч баталгаажуулахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

module.exports = {
  registerStudent,
  getStudentsBySchool,
  verifyStudent,
};