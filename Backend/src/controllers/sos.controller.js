const { db, admin } = require("../config/firebase");
const { SOS_STATUS } = require("../utils/status");

// CREATE SOS
const createSOS = async (req, res) => {
  try {
    const {
      student_id,
      latitude,
      longitude,
      location_text,
    } = req.body;

    if (!student_id) {
      return res.status(400).json({
        success: false,
        message: "student_id шаардлагатай.",
      });
    }

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        success: false,
        message: "latitude, longitude шаардлагатай.",
      });
    }

    const studentDoc = await db.collection("students").doc(student_id).get();

    if (!studentDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "Сурагч олдсонгүй.",
      });
    }

    const studentData = studentDoc.data();

    if (!studentData.is_verified || studentData.verification_status !== "approved") {
      return res.status(403).json({
        success: false,
        message: "Баталгаажаагүй сурагч SOS илгээх боломжгүй.",
      });
    }

    if (!studentData.school_id) {
      return res.status(400).json({
        success: false,
        message: "Сурагч school_id-гүй байна.",
      });
    }

    const sosRef = db.collection("sos_alerts").doc();

    const sosData = {
      sos_id: sosRef.id,

      school_id: studentData.school_id,
      school_code: studentData.school_code || "",

      student_id,
      student_first_name: studentData.student_first_name || "",
      student_last_name: studentData.student_last_name || "",
      student_phone_number: studentData.student_phone_number || "",
      class_info: studentData.class_info || "",

      latitude: Number(latitude),
      longitude: Number(longitude),
      location_text: location_text || "",

      status: SOS_STATUS.ACTIVE,

      created_at: admin.firestore.FieldValue.serverTimestamp(),
      acknowledged_at: null,
      resolved_at: null,
    };

    await sosRef.set(sosData);

    return res.status(201).json({
      success: true,
      message: "SOS амжилттай илгээгдлээ.",
      data: {
        ...sosData,
        created_at: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("CREATE SOS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "SOS үүсгэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

// GET SOS BY SCHOOL
const getSOSBySchool = async (req, res) => {
  try {
    const { school_id } = req.params;

    if (!school_id) {
      return res.status(400).json({
        success: false,
        message: "school_id шаардлагатай.",
      });
    }

    const snapshot = await db
      .collection("sos_alerts")
      .where("school_id", "==", school_id)
      .orderBy("created_at", "desc")
      .get();

    const sosList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      success: true,
      count: sosList.length,
      data: sosList,
    });
  } catch (error) {
    console.error("GET SOS BY SCHOOL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "SOS жагсаалт авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

// GET ACTIVE SOS BY SCHOOL
const getActiveSOSBySchool = async (req, res) => {
  try {
    const { school_id } = req.params;

    if (!school_id) {
      return res.status(400).json({
        success: false,
        message: "school_id шаардлагатай.",
      });
    }

    const snapshot = await db
      .collection("sos_alerts")
      .where("school_id", "==", school_id)
      .where("status", "==", SOS_STATUS.ACTIVE)
      .orderBy("created_at", "desc")
      .get();

    const sosList = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json({
      success: true,
      count: sosList.length,
      data: sosList,
    });
  } catch (error) {
    console.error("GET ACTIVE SOS BY SCHOOL ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Идэвхтэй SOS жагсаалт авахад алдаа гарлаа.",
      error: error.message,
    });
  }
};

// UPDATE SOS STATUS
const updateSOSStatus = async (req, res) => {
  try {
    const { sos_id } = req.params;
    const { admin_id, new_status, note } = req.body;

    if (!sos_id) {
      return res.status(400).json({
        success: false,
        message: "sos_id шаардлагатай.",
      });
    }

    if (!admin_id) {
      return res.status(400).json({
        success: false,
        message: "admin_id шаардлагатай.",
      });
    }

    const allowedStatuses = [
      SOS_STATUS.ACTIVE,
      SOS_STATUS.ACKNOWLEDGED,
      SOS_STATUS.RESOLVED,
      SOS_STATUS.CANCELLED,
    ];

    if (!allowedStatuses.includes(new_status)) {
      return res.status(400).json({
        success: false,
        message: "SOS status буруу байна.",
      });
    }

    const sosRef = db.collection("sos_alerts").doc(sos_id);
    const sosDoc = await sosRef.get();

    if (!sosDoc.exists) {
      return res.status(404).json({
        success: false,
        message: "SOS олдсонгүй.",
      });
    }

    const sosData = sosDoc.data();
    const oldStatus = sosData.status;

    const updateData = {
      status: new_status,
      updated_at: admin.firestore.FieldValue.serverTimestamp(),
    };

    if (new_status === SOS_STATUS.ACKNOWLEDGED) {
      updateData.acknowledged_at = admin.firestore.FieldValue.serverTimestamp();
      updateData.acknowledged_by = admin_id;
    }

    if (new_status === SOS_STATUS.RESOLVED) {
      updateData.resolved_at = admin.firestore.FieldValue.serverTimestamp();
      updateData.resolved_by = admin_id;
    }

    await sosRef.update(updateData);

    const actionRef = db.collection("action_logs").doc();

    await actionRef.set({
      action_id: actionRef.id,
      admin_id,
      target_type: "sos",
      target_id: sos_id,
      action_type: "status_update",
      old_status: oldStatus,
      new_status,
      note: note || "",
      created_at: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).json({
      success: true,
      message: "SOS status шинэчлэгдлээ.",
      data: {
        sos_id,
        old_status: oldStatus,
        new_status,
      },
    });
  } catch (error) {
    console.error("UPDATE SOS STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "SOS status шинэчлэхэд алдаа гарлаа.",
      error: error.message,
    });
  }
};

module.exports = {
  createSOS,
  getSOSBySchool,
  getActiveSOSBySchool,
  updateSOSStatus,
};