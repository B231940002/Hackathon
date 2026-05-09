const { db, admin } = require("../config/Firebase");

const findSchoolByCode = async (schoolCode) => {
  const snapshot = await db
    .collection("schools")
    .where("school_code", "==", schoolCode)
    .limit(1)
    .get();

  if (snapshot.empty) {
    throw new Error("Invalid school code");
  }

  const doc = snapshot.docs[0];

  return {
    id: doc.id,
    ...doc.data(),
  };
};

const registerStudentService = async (data) => {
  if (
    !data.school_code ||
    !data.student_first_name ||
    !data.username ||
    !data.password_hash
  ) {
    throw new Error(
      "school_code, student_first_name, username, password_hash are required"
    );
  }

  const school = await findSchoolByCode(data.school_code);

  const usernameSnapshot = await db
    .collection("students")
    .where("username", "==", data.username)
    .limit(1)
    .get();

  if (!usernameSnapshot.empty) {
    throw new Error("Username already exists");
  }

  const studentRef = db.collection("students").doc();

  const studentData = {
    student_id: studentRef.id,
    school_id: school.school_id || school.id,

    student_first_name: data.student_first_name,
    student_last_name: data.student_last_name || "",
    student_phone_number: data.student_phone_number || "",

    username: data.username,
    password_hash: data.password_hash,

    class_info: data.class_info || "",

    verified: false,
    verification_status: "pending",

    created_at: admin.firestore.FieldValue.serverTimestamp(),
  };

  await studentRef.set(studentData);

  return studentData;
};

const getAllStudentsService = async (schoolId) => {
  let query = db.collection("students");

  if (schoolId) {
    query = query.where("school_id", "==", schoolId);
  }

  const snapshot = await query.get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const getPendingStudentsService = async (schoolId) => {
  let query = db
    .collection("students")
    .where("verification_status", "==", "pending");

  if (schoolId) {
    query = query.where("school_id", "==", schoolId);
  }

  const snapshot = await query.get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const getStudentByIdService = async (studentId) => {
  const doc = await db.collection("students").doc(studentId).get();

  if (!doc.exists) {
    throw new Error("Student not found");
  }

  return {
    id: doc.id,
    ...doc.data(),
  };
};

const approveStudentService = async (studentId, adminId) => {
  const studentRef = db.collection("students").doc(studentId);
  const doc = await studentRef.get();

  if (!doc.exists) {
    throw new Error("Student not found");
  }

  const updateData = {
    verified: true,
    verification_status: "approved",
    approved_by: adminId || null,
    approved_at: admin.firestore.FieldValue.serverTimestamp(),
  };

  await studentRef.update(updateData);

  return {
    student_id: studentId,
    ...doc.data(),
    ...updateData,
  };
};

const rejectStudentService = async (studentId, adminId) => {
  const studentRef = db.collection("students").doc(studentId);
  const doc = await studentRef.get();

  if (!doc.exists) {
    throw new Error("Student not found");
  }

  const updateData = {
    verified: false,
    verification_status: "rejected",
    approved_by: adminId || null,
    approved_at: admin.firestore.FieldValue.serverTimestamp(),
  };

  await studentRef.update(updateData);

  return {
    student_id: studentId,
    ...doc.data(),
    ...updateData,
  };
};

module.exports = {
  registerStudentService,
  getAllStudentsService,
  getPendingStudentsService,
  getStudentByIdService,
  approveStudentService,
  rejectStudentService,
};