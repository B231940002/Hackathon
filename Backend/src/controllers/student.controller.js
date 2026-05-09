const { db, admin } = require("../config/firebase");

// REGISTER STUDENT
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

    if (!school_code || !student_first_name || !username || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Сургуулийн код, сурагчийн нэр, хэрэглэгчийн нэр, нууц үг шаардлагатай.",
      });
    }

    // 1. School code шалгах
    const schoolSnapshot = await db
      .collection("schools")
      .where("school_code", "==", school_code)
      .limit(1)
      .get();

    if (schoolSnapshot.empty) {
      return res.status(404).json({
        success: false,
        message: "Сургуулийн код буруу байна.",
      });
    }

    const schoolDoc = schoolSnapshot.docs[0];
    const schoolData = schoolDoc.data();

    // 2. Username давхцах эсэх шалгах
    const normalizedUsername = username.trim().toLowerCase();

    const usernameSnapshot = await db
      .collection("students")
      .where("username", "==", normalizedUsername)
      .limit(1)
      .get();

    if (!usernameSnapshot.empty) {
      return res.status(409).json({
        success: false,
        message: "Энэ хэрэглэгчийн нэр бүртгэлтэй байна.",
      });
    }

    // 3. Student үүсгэх
    const studentRef = db.collection("students").doc();

    const studentData = {
      student_id: studentRef.id,

      // schoolData.school_id байхгүй бол document id ашиглана
      school_id: schoolData.school_id || schoolDoc.id,

      student_first_name: student_first_name.trim(),
      student_last_name: student_last_name ? student_last_name.trim() : "",
      student_phone_number: student_phone_number || "",

      username: normalizedUsername,

      // Demo үед түр ингэж хадгалж байна. Дараа bcrypt болгоно.
      password_hash: password,

      class_info: class_info || "",

      is_verified: false,
      verification_status: "pending",

      created_at: admin.firestore.FieldValue.serverTimestamp(),
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    await studentRef.set(studentData);

    return res.status(201).json({
      success: true,
      message:
        "Сурагч амжилттай бүртгэгдлээ. Админ баталгаажуулсны дараа ашиглах боломжтой.",
      data: {
        student_id: studentData.student_id,
        school_id: studentData.school_id,
        student_first_name: studentData.student_first_name,
        student_last_name: studentData.student_last_name,
        student_phone_number: studentData.student_phone_number,
        username: studentData.username,
        class_info: studentData.class_info,
        is_verified: studentData.is_verified,
        verification_status: studentData.verification_status,
      },
    });
  } catch (error) {
    console.error("REGISTER STUDENT ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Сурагч бүртгэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

// LOGIN STUDENT
const loginStudent = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Хэрэглэгчийн нэр болон нууц үг шаардлагатай.",
      });
    }

    const normalizedUsername = username.trim().toLowerCase();

    const snapshot = await db
      .collection("students")
      .where("username", "==", normalizedUsername)
      .limit(1)
      .get();

    if (snapshot.empty) {
      return res.status(401).json({
        success: false,
        message: "Хэрэглэгчийн нэр эсвэл нууц үг буруу байна.",
      });
    }

    const studentDoc = snapshot.docs[0];
    const student = studentDoc.data();

    if (student.password_hash !== password) {
      return res.status(401).json({
        success: false,
        message: "Хэрэглэгчийн нэр эсвэл нууц үг буруу байна.",
      });
    }

    if (student.verification_status !== "approved") {
      return res.status(403).json({
        success: false,
        message: "Таны бүртгэлийг админ хараахан баталгаажуулаагүй байна.",
        data: {
          student_id: student.student_id || studentDoc.id,
          verification_status: student.verification_status,
          is_verified: student.is_verified,
        },
      });
    }

    return res.status(200).json({
      success: true,
      message: "Амжилттай нэвтэрлээ.",
      data: {
        student_id: student.student_id || studentDoc.id,
        school_id: student.school_id,
        student_first_name: student.student_first_name,
        student_last_name: student.student_last_name,
        student_phone_number: student.student_phone_number,
        username: student.username,
        class_info: student.class_info,
        is_verified: student.is_verified,
        verification_status: student.verification_status,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Нэвтрэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

// GET STUDENTS BY SCHOOL
const getStudentsBySchool = async (req, res) => {
  try {
    const { school_id } = req.params;

    if (!school_id) {
      return res.status(400).json({
        success: false,
        message: "school_id шаардлагатай.",
      });
    }

    const snapshot = await db
      .collection("students")
      .where("school_id", "==", school_id)
      .get();

    const students = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      success: true,
      count: students.length,
      data: students,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Сурагчдын мэдээлэл авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

// VERIFY / REJECT STUDENT
const verifyStudent = async (req, res) => {
  try {
    const { student_id } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["approved", "rejected", "pending"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Баталгаажуулалтын төлөв буруу байна.",
      });
    }

    const studentRef = db.collection("students").doc(student_id);
    const studentDoc = await studentRef.get();

    if (!studentDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Сурагч олдсонгүй.",
      });
    }

    const isVerified = status === "approved";

    await studentRef.update({
      is_verified: isVerified,
      verification_status: status,
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({
      success: true,
      message: "Сурагчийн баталгаажуулалт шинэчлэгдлээ.",
      data: {
        student_id,
        is_verified: isVerified,
        verification_status: status,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Сурагч баталгаажуулахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

module.exports = {
  registerStudent,
  loginStudent,
  getStudentsBySchool,
  verifyStudent,
};