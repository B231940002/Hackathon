const { db, admin } = require("../config/Firebase");

const createSchoolService = async (data) => {
  if (!data.school_name || !data.school_code) {
    throw new Error("school_name and school_code are required");
  }

  const schoolRef = db.collection("schools").doc();

  const schoolData = {
    school_id: schoolRef.id,
    school_name: data.school_name,
    school_code: data.school_code,
    school_city: data.school_city || "",
    school_address: data.school_address || "",
    latitude: Number(data.latitude) || null,
    longitude: Number(data.longitude) || null,
    safety_radius: Number(data.safety_radius) || 500,
    nearby_radius: Number(data.nearby_radius) || 1500,
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    updated_at: admin.firestore.FieldValue.serverTimestamp(),
  };

  await schoolRef.set(schoolData);

  return schoolData;
};

const getAllSchoolsService = async () => {
  const snapshot = await db.collection("schools").get();

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const getSchoolByIdService = async (schoolId) => {
  const doc = await db.collection("schools").doc(schoolId).get();

  if (!doc.exists) {
    throw new Error("School not found");
  }

  return {
    id: doc.id,
    ...doc.data(),
  };
};

const updateSchoolService = async (schoolId, data) => {
  const schoolRef = db.collection("schools").doc(schoolId);
  const doc = await schoolRef.get();

  if (!doc.exists) {
    throw new Error("School not found");
  }

  const updateData = {
    ...data,
    updated_at: admin.firestore.FieldValue.serverTimestamp(),
  };

  await schoolRef.update(updateData);

  return {
    school_id: schoolId,
    ...updateData,
  };
};

const deleteSchoolService = async (schoolId) => {
  const schoolRef = db.collection("schools").doc(schoolId);
  const doc = await schoolRef.get();

  if (!doc.exists) {
    throw new Error("School not found");
  }

  await schoolRef.delete();

  return true;
};

module.exports = {
  createSchoolService,
  getAllSchoolsService,
  getSchoolByIdService,
  updateSchoolService,
  deleteSchoolService,
};